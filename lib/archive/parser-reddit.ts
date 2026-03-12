import { REDDIT_FIELD_OPTIONS, type RedditFieldOption } from "./constants";
import type {
  ArchiveFetchResult,
  ParsedRedditCapture,
  ParsedRedditCapturesResult,
  RawCdxRow,
  RedditTargetType,
} from "./types";
import { semicolonParser, timestampParser } from "./utils";

export async function parseRedditArchiveResponse(
  payload: ArchiveFetchResult,
  target: string,
  targetType: RedditTargetType,
  fieldOptions: readonly RedditFieldOption[] = REDDIT_FIELD_OPTIONS
): Promise<ParsedRedditCapturesResult> {
  const [header, ...rows] = payload.rows;
  if (!header || rows.length === 0) {
    throw new Error("No archived Reddit captures found for this query.");
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

  const captures = validRows.map((row, idx) => {
    const parsed = parseRedditRow(row, fieldOptions);
    if (resumptionKey && idx === 0 && fieldOptions.includes("resumption_key")) {
      parsed.resumption_key = resumptionKey;
    }
    return parsed;
  }).filter((capture) => matchesTarget(capture, target, targetType));

  if (captures.length === 0) {
    throw new Error("No archived Reddit captures matched the requested target.");
  }

  return {
    tweets: captures,
    total: captures.length,
    target,
    targetType,
    showResumeKey: payload.showResumeKey,
    resumptionKey,
  };
}

function matchesTarget(
  capture: ParsedRedditCapture,
  target: string,
  targetType: RedditTargetType
): boolean {
  const normalizedTarget = target.toLowerCase();

  if (targetType === "subreddit") {
    return (capture.reddit_subreddit as string | null)?.toLowerCase() === normalizedTarget;
  }

  if (targetType === "user") {
    return (capture.reddit_author as string | null)?.toLowerCase() === normalizedTarget;
  }

  return (capture.parsed_reddit_url as string | null) === target;
}

function parseRedditRow(
  row: RawCdxRow,
  fieldOptions: readonly RedditFieldOption[]
): ParsedRedditCapture {
  const [archivedUrlKey, timestamp, originalUrl, mimetype, statusCode, digest, length] = row;

  const decodedOriginal = safeDecodeURIComponent(originalUrl);
  const cleanedUrl = cleanRedditUrl(decodedOriginal);
  const archiveUrl = `https://web.archive.org/web/${timestamp}/${decodedOriginal}`;
  const parsedArchiveUrl = `https://web.archive.org/web/${timestamp}/${cleanedUrl}`;
  const metadata = extractRedditMetadata(cleanedUrl);

  const parsed: ParsedRedditCapture = {};

  const assignIfIncluded = <K extends keyof ParsedRedditCapture>(key: K, value: ParsedRedditCapture[K]) => {
    if (fieldOptions.includes(key as RedditFieldOption)) {
      parsed[key] = value;
    }
  };

  assignIfIncluded("archived_urlkey", archivedUrlKey);
  assignIfIncluded("archived_timestamp", timestamp);
  assignIfIncluded("parsed_archived_timestamp", timestampParser(timestamp));
  assignIfIncluded("archived_reddit_url", semicolonParser(archiveUrl));
  assignIfIncluded("parsed_archived_reddit_url", semicolonParser(parsedArchiveUrl));
  assignIfIncluded("original_reddit_url", semicolonParser(originalUrl));
  assignIfIncluded("parsed_reddit_url", semicolonParser(cleanedUrl));
  assignIfIncluded("reddit_resource_type", metadata.resourceType);
  assignIfIncluded("reddit_subreddit", metadata.subreddit);
  assignIfIncluded("reddit_author", metadata.author);
  assignIfIncluded("reddit_post_id", metadata.postId);
  assignIfIncluded("reddit_comment_id", metadata.commentId);
  assignIfIncluded("reddit_post_title", metadata.postTitle);
  assignIfIncluded("archived_mimetype", mimetype);
  assignIfIncluded("archived_statuscode", statusCode);
  assignIfIncluded("archived_digest", digest);
  assignIfIncluded("archived_length", length);

  return parsed;
}

function cleanRedditUrl(url: string): string {
  try {
    const candidate = /^https?:\/\//i.test(url) ? url : `https://${url.replace(/^\/+/, "")}`;
    const parsed = new URL(candidate);
    parsed.protocol = "https:";
    parsed.hostname = "www.reddit.com";
    parsed.hash = "";
    parsed.search = "";
    parsed.pathname = parsed.pathname.replace(/\/+$/, "") || "/";
    return parsed.toString();
  } catch {
    return url;
  }
}

function extractRedditMetadata(url: string) {
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);

    if (segments[0] === "r") {
      const subreddit = segments[1] ?? null;
      if (segments[2] === "comments") {
        const postId = segments[3] ?? null;
        const postSlug = segments[4] ?? null;
        const commentId = segments[5] ?? null;

        return {
          resourceType: commentId ? "comment" : "post",
          subreddit,
          author: null,
          postId,
          commentId,
          postTitle: formatPostTitle(postSlug),
        };
      }

      return {
        resourceType: "subreddit",
        subreddit,
        author: null,
        postId: null,
        commentId: null,
        postTitle: null,
      };
    }

    if (segments[0] === "user" || segments[0] === "u") {
      return {
        resourceType: "user",
        subreddit: null,
        author: segments[1] ?? null,
        postId: null,
        commentId: null,
        postTitle: null,
      };
    }

    if (segments[0] === "comments") {
      return {
        resourceType: segments[2] ? "comment" : "post",
        subreddit: null,
        author: null,
        postId: segments[1] ?? null,
        commentId: segments[2] ?? null,
        postTitle: null,
      };
    }
  } catch {
    return {
      resourceType: null,
      subreddit: null,
      author: null,
      postId: null,
      commentId: null,
      postTitle: null,
    };
  }

  return {
    resourceType: "unknown",
    subreddit: null,
    author: null,
    postId: null,
    commentId: null,
    postTitle: null,
  };
}

function formatPostTitle(value: string | null): string | null {
  if (!value) return null;

  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function safeDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
