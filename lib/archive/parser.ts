import { FIELD_OPTIONS, type FieldOption } from "./constants";
import { fetchTweetEmbed } from "./embed";
import type {
  ParsedTweet,
  ParsedTweetsResult,
  RawCdxRow,
  ArchiveFetchResult,
} from "./types";
import {
  checkDoubleStatus,
  checkPatternTweet,
  checkUrlScheme,
  cleanTweetUrl,
  deleteTweetPathnames,
  ensureHttpUrl,
  isTweetUrl,
  semicolonParser,
  stripSurroundingQuotes,
  timestampParser,
} from "./utils";

const MAX_EMBED_CONCURRENCY = 5;

export async function parseArchiveResponse(
  payload: ArchiveFetchResult,
  username: string,
  fieldOptions: readonly FieldOption[] = FIELD_OPTIONS
): Promise<ParsedTweetsResult> {
  const [header, ...rows] = payload.rows;
  if (!header || rows.length === 0) {
    throw new Error("No archived tweets found for this query.");
  }

  let resumptionKey: string | null = null;
  let dataRows = rows;

  if (payload.showResumeKey && rows.length > 0) {
    const lastRow = rows.at(-1);
    if (lastRow && lastRow.length < 7 && typeof lastRow[0] === "string") {
      resumptionKey = lastRow[0];
      dataRows = rows.slice(0, -1);
    }
  }

  const validRows = dataRows.filter((row): row is RawCdxRow => row.length >= 7);

  const tweets = await mapWithConcurrency(validRows, MAX_EMBED_CONCURRENCY, async (row, idx) => {
    const parsed = await parseRow(row, username, fieldOptions);
    if (resumptionKey && idx === 0 && fieldOptions.includes("resumption_key")) {
      parsed.resumption_key = resumptionKey;
    }
    return parsed;
  });

  return {
    tweets,
    total: tweets.length,
    username,
    showResumeKey: payload.showResumeKey,
    resumptionKey,
  };
}

async function parseRow(
  row: RawCdxRow,
  username: string,
  fieldOptions: readonly FieldOption[]
): Promise<ParsedTweet> {
  const [archivedUrlKey, timestamp, originalUrl, mimetype, statusCode, digest, length] = row;

  const decodedOriginal = safeDecodeURIComponent(originalUrl).replace(/\u2019/g, "");
  const cleanedTweet = stripSurroundingQuotes(checkPatternTweet(decodedOriginal));

  const archiveUrl = `https://web.archive.org/web/${timestamp}/${decodedOriginal}`;
  const cleanedOriginal = deleteTweetPathnames(
    cleanTweetUrl(cleanedTweet, username)
  );

  const adjustedOriginal = (() => {
    if (checkDoubleStatus(archiveUrl, cleanedOriginal)) {
      return deleteTweetPathnames(`https://twitter.com${cleanedOriginal}`);
    }
    if (!cleanedOriginal.includes("://")) {
      return deleteTweetPathnames(ensureHttpUrl(cleanedOriginal));
    }
    return cleanedOriginal;
  })();

  const parsedArchiveUrl = `https://web.archive.org/web/${timestamp}/${adjustedOriginal}`;

  const archivedTweetUrl = checkUrlScheme(semicolonParser(archiveUrl));
  const parsedArchivedTweetUrl = checkUrlScheme(semicolonParser(parsedArchiveUrl));
  const originalTweetUrl = checkUrlScheme(semicolonParser(originalUrl));
  const parsedTweetUrl = checkUrlScheme(semicolonParser(adjustedOriginal));

  let availableText: string | null = null;
  let availableIsRT: boolean | null = null;
  let availableInfo: string | null = null;

  if (isTweetUrl(parsedTweetUrl)) {
    const embed = await fetchTweetEmbed(parsedTweetUrl);
    if (embed) {
      availableText = embed.text ? semicolonParser(embed.text) : null;
      availableIsRT = embed.isRetweet;
      availableInfo = embed.info ? semicolonParser(embed.info) : null;
    }
  }

  const parsed: ParsedTweet = {};

  const assignIfIncluded = <K extends keyof ParsedTweet>(key: K, value: ParsedTweet[K]) => {
    if (fieldOptions.includes(key as FieldOption)) {
      parsed[key] = value;
    }
  };

  assignIfIncluded("available_tweet_text", availableText);
  assignIfIncluded("available_tweet_is_RT", availableIsRT);
  assignIfIncluded("available_tweet_info", availableInfo);
  assignIfIncluded("archived_urlkey", archivedUrlKey);
  assignIfIncluded("archived_timestamp", timestamp);
  assignIfIncluded("parsed_archived_timestamp", timestampParser(timestamp));
  assignIfIncluded("archived_tweet_url", archivedTweetUrl);
  assignIfIncluded("parsed_archived_tweet_url", parsedArchivedTweetUrl);
  assignIfIncluded("original_tweet_url", originalTweetUrl);
  assignIfIncluded("parsed_tweet_url", parsedTweetUrl);
  assignIfIncluded("archived_mimetype", mimetype);
  assignIfIncluded("archived_statuscode", statusCode);
  assignIfIncluded("archived_digest", digest);
  assignIfIncluded("archived_length", length);

  return parsed;
}

function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

type Mapper<T, R> = (value: T, index: number) => Promise<R>;

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  mapper: Mapper<T, R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index++;
      results[current] = await mapper(items[current], current);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, worker);
  await Promise.all(workers);
  return results;
}

