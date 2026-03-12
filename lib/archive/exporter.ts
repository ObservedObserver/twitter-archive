import { FIELD_OPTIONS, type FieldOption, type InstagramFieldOption, type RedditFieldOption } from "./constants";
import { buildTweetsHtml } from "./html";
import type {
  ExportBundle,
  InstagramExportBundle,
  ParsedInstagramPost,
  ParsedInstagramPostsResult,
  ParsedRedditCapture,
  ParsedRedditCapturesResult,
  ParsedTweet,
  ParsedTweetsResult,
  RedditExportBundle,
} from "./types";

// Overload for Twitter
export function buildExportBundle(
  result: ParsedTweetsResult,
  fieldOptions?: readonly FieldOption[]
): ExportBundle;

// Overload for Instagram
export function buildExportBundle(
  result: ParsedInstagramPostsResult,
  fieldOptions: readonly InstagramFieldOption[]
): InstagramExportBundle;

// Overload for Reddit
export function buildExportBundle(
  result: ParsedRedditCapturesResult,
  fieldOptions: readonly RedditFieldOption[],
  filenameLabel: string,
  htmlTitle: string
): RedditExportBundle;

// Implementation
export function buildExportBundle(
  result: ParsedTweetsResult | ParsedInstagramPostsResult | ParsedRedditCapturesResult,
  fieldOptions: readonly FieldOption[] | readonly InstagramFieldOption[] | readonly RedditFieldOption[] = FIELD_OPTIONS,
  filenameLabel = "tweets",
  htmlTitle?: string
): ExportBundle | InstagramExportBundle | RedditExportBundle {
  const columns = Array.from(new Set(fieldOptions));
  const normalizedTweets = normalizeTweets(result.tweets, columns);
  const identifier = "username" in result ? result.username : result.target;

  const csv = buildCsv(normalizedTweets, columns);
  const json = JSON.stringify(normalizedTweets, null, 2);
  const html = buildTweetsHtml(identifier, normalizedTweets, {
    title: htmlTitle,
    summaryLabel: `Total captures: ${normalizedTweets.length}`,
  });
  const filename = buildFilename(identifier, filenameLabel);

  return {
    ...result,
    tweets: normalizedTweets,
    csv,
    json,
    html,
    filename,
  };
}

function normalizeTweets(
  tweets: (ParsedTweet | ParsedInstagramPost | ParsedRedditCapture)[],
  columns: readonly (FieldOption | InstagramFieldOption | RedditFieldOption)[]
): (ParsedTweet | ParsedInstagramPost | ParsedRedditCapture)[] {
  return tweets.map((tweet) => {
    const normalized: Record<string, string | boolean | null> = {};
    columns.forEach((column) => {
      if (column in tweet) {
        normalized[column] = (tweet as Record<string, string | boolean | null>)[column];
      } else {
        normalized[column] = null;
      }
    });
    return normalized as ParsedTweet | ParsedInstagramPost;
  });
}

function buildCsv(
  tweets: (ParsedTweet | ParsedInstagramPost | ParsedRedditCapture)[],
  columns: readonly (FieldOption | InstagramFieldOption | RedditFieldOption)[]
): string {
  const header = columns.join(",");
  const rows = tweets.map((tweet) =>
    columns
      .map((column) => formatCsvCell((tweet as Record<string, string | boolean | null>)[column]))
      .join(",")
  );

  return [header, ...rows].join("\n");
}

function formatCsvCell(value: string | boolean | null | undefined): string {
  if (value === null || value === undefined) return "";
  const stringValue = String(value);
  if (stringValue.includes("\n") || stringValue.includes(",") || stringValue.includes('"')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

function buildFilename(username: string, label: string): string {
  const now = new Date();
  const parts = [
    now.getFullYear().toString().padStart(4, "0"),
    (now.getMonth() + 1).toString().padStart(2, "0"),
    now.getDate().toString().padStart(2, "0"),
    now.getHours().toString().padStart(2, "0"),
    now.getMinutes().toString().padStart(2, "0"),
    now.getSeconds().toString().padStart(2, "0"),
  ];
  const formatted = parts.join("");
  const safeIdentifier =
    username
      .trim()
      .replace(/[^a-z0-9._-]+/gi, "-")
      .replace(/^-+|-+$/g, "") || "archive";
  return `${safeIdentifier}_${label}_${formatted}`;
}
