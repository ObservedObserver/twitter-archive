import { FIELD_OPTIONS, type FieldOption, type InstagramFieldOption } from "./constants";
import { buildTweetsHtml } from "./html";
import type { ExportBundle, InstagramExportBundle, ParsedInstagramPost, ParsedInstagramPostsResult, ParsedTweet, ParsedTweetsResult } from "./types";

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

// Implementation
export function buildExportBundle(
  result: ParsedTweetsResult | ParsedInstagramPostsResult,
  fieldOptions: readonly FieldOption[] | readonly InstagramFieldOption[] = FIELD_OPTIONS
): ExportBundle | InstagramExportBundle {
  const columns = Array.from(new Set(fieldOptions));
  const normalizedTweets = normalizeTweets(result.tweets, columns);

  const csv = buildCsv(normalizedTweets, columns);
  const json = JSON.stringify(normalizedTweets, null, 2);
  const html = buildTweetsHtml(result.username, normalizedTweets);
  const filename = buildFilename(result.username);

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
  tweets: (ParsedTweet | ParsedInstagramPost)[],
  columns: readonly (FieldOption | InstagramFieldOption)[]
): (ParsedTweet | ParsedInstagramPost)[] {
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
  tweets: (ParsedTweet | ParsedInstagramPost)[],
  columns: readonly (FieldOption | InstagramFieldOption)[]
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

function buildFilename(username: string): string {
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
  return `${username}_tweets_${formatted}`;
}
