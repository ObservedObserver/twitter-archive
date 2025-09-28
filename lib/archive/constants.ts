export const FIELD_OPTIONS = [
  "archived_urlkey",
  "archived_timestamp",
  "parsed_archived_timestamp",
  "archived_tweet_url",
  "parsed_archived_tweet_url",
  "original_tweet_url",
  "parsed_tweet_url",
  "available_tweet_text",
  "available_tweet_is_RT",
  "available_tweet_info",
  "archived_mimetype",
  "archived_statuscode",
  "archived_digest",
  "archived_length",
  "resumption_key",
] as const;

export type FieldOption = (typeof FIELD_OPTIONS)[number];

export const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

