import type { FieldOption, InstagramFieldOption } from "./constants";

export interface ArchiveQueryOptions {
  username: string;
  collapse?: string | null;
  timestampFrom?: string | null;
  timestampTo?: string | null;
  limit?: number | null;
  resumptionKey?: string | null;
  matchType?: "prefix" | "host" | "domain" | null;
}

export type RawCdxHeader = string[];
export type RawCdxRow = [
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

export type RawCdxResponse = [RawCdxHeader, ...RawCdxRow[]];

export interface ArchiveFetchResult {
  rows: RawCdxResponse;
  showResumeKey: boolean;
}

export type ParsedTweet = Partial<Record<FieldOption, string | boolean | null>>;

export interface ParsedTweetsResult {
  tweets: ParsedTweet[];
  total: number;
  username: string;
  showResumeKey: boolean;
  resumptionKey?: string | null;
}

export type ParsedInstagramPost = Partial<Record<InstagramFieldOption, string | boolean | null>>;

export interface ParsedInstagramPostsResult {
  tweets: ParsedInstagramPost[];
  total: number;
  username: string;
  showResumeKey: boolean;
  resumptionKey?: string | null;
}

export interface ExportBundle extends ParsedTweetsResult {
  csv: string;
  json: string;
  html: string;
  filename: string;
}

export interface InstagramExportBundle extends ParsedInstagramPostsResult {
  csv: string;
  json: string;
  html: string;
  filename: string;
}

export interface EmbedResult {
  text: string | null;
  isRetweet: boolean | null;
  info: string | null;
}
