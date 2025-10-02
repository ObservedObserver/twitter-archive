import { INSTAGRAM_FIELD_OPTIONS, type InstagramFieldOption } from "./constants";
import type {
  ParsedInstagramPost,
  ParsedInstagramPostsResult,
  RawCdxRow,
  ArchiveFetchResult,
} from "./types";
import {
  semicolonParser,
  timestampParser,
} from "./utils";

export async function parseInstagramArchiveResponse(
  payload: ArchiveFetchResult,
  username: string,
  fieldOptions: readonly InstagramFieldOption[] = INSTAGRAM_FIELD_OPTIONS
): Promise<ParsedInstagramPostsResult> {
  const [header, ...rows] = payload.rows;
  if (!header || rows.length === 0) {
    throw new Error("No archived Instagram posts found for this query.");
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

  const posts = validRows.map((row, idx) => {
    const parsed = parseInstagramRow(row, username, fieldOptions);
    if (resumptionKey && idx === 0 && fieldOptions.includes("resumption_key")) {
      parsed.resumption_key = resumptionKey;
    }
    return parsed;
  });

  return {
    tweets: posts,
    total: posts.length,
    username,
    showResumeKey: payload.showResumeKey,
    resumptionKey,
  };
}

function parseInstagramRow(
  row: RawCdxRow,
  username: string,
  fieldOptions: readonly InstagramFieldOption[]
): ParsedInstagramPost {
  const [archivedUrlKey, timestamp, originalUrl, mimetype, statusCode, digest, length] = row;

  const decodedOriginal = safeDecodeURIComponent(originalUrl);
  const archiveUrl = `https://web.archive.org/web/${timestamp}/${decodedOriginal}`;

  // Clean the Instagram URL
  const cleanedUrl = cleanInstagramUrl(decodedOriginal);
  const parsedArchiveUrl = `https://web.archive.org/web/${timestamp}/${cleanedUrl}`;

  const parsed: ParsedInstagramPost = {};

  const assignIfIncluded = <K extends keyof ParsedInstagramPost>(key: K, value: ParsedInstagramPost[K]) => {
    if (fieldOptions.includes(key as InstagramFieldOption)) {
      parsed[key] = value;
    }
  };

  assignIfIncluded("archived_urlkey", archivedUrlKey);
  assignIfIncluded("archived_timestamp", timestamp);
  assignIfIncluded("parsed_archived_timestamp", timestampParser(timestamp));
  assignIfIncluded("archived_post_url", semicolonParser(archiveUrl));
  assignIfIncluded("parsed_archived_post_url", semicolonParser(parsedArchiveUrl));
  assignIfIncluded("original_post_url", semicolonParser(originalUrl));
  assignIfIncluded("parsed_post_url", semicolonParser(cleanedUrl));
  assignIfIncluded("archived_mimetype", mimetype);
  assignIfIncluded("archived_statuscode", statusCode);
  assignIfIncluded("archived_digest", digest);
  assignIfIncluded("archived_length", length);

  return parsed;
}

function cleanInstagramUrl(url: string): string {
  try {
    // Remove query parameters and fragments
    const cleanUrl = url.split('?')[0].split('#')[0];
    // Ensure https protocol
    if (cleanUrl.startsWith('http://')) {
      return cleanUrl.replace('http://', 'https://');
    }
    if (!cleanUrl.startsWith('http')) {
      return `https://${cleanUrl}`;
    }
    return cleanUrl;
  } catch {
    return url;
  }
}

function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

