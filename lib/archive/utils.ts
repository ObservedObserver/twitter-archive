import { DEFAULT_USER_AGENT } from "./constants";

const STATUS_REGEX = /\/status\/(\d+)/i;
const TWITTER_STATUS_USERNAME_REGEX =
  /^https:\/\/twitter\.com\/([^/]+)\/status\/(\d+)/i;

export function buildFetchHeaders(): HeadersInit {
  return {
    "User-Agent": DEFAULT_USER_AGENT,
  };
}

export function cleanTweetUrl(tweetUrl: string, username: string): string {
  const lowerCaseUrl = tweetUrl.toLowerCase();
  const matchLower = lowerCaseUrl.match(STATUS_REGEX);
  const matchOriginal = tweetUrl.match(STATUS_REGEX);

  if (matchLower && lowerCaseUrl.includes(username.toLowerCase()) && matchOriginal) {
    return `https://twitter.com/${username}/status/${matchOriginal[1]}`;
  }

  return tweetUrl;
}

export function deleteTweetPathnames(tweetUrl: string): string {
  const usernameMatch = tweetUrl.match(TWITTER_STATUS_USERNAME_REGEX);
  if (!usernameMatch) return tweetUrl;

  const [, username, id] = usernameMatch;
  return `https://twitter.com/${username}/status/${id}`;
}

export function checkDoubleStatus(
  archiveUrl: string,
  originalTweetUrl: string
): boolean {
  return (
    (archiveUrl.match(/\/status\//g) || []).length === 2 &&
    !originalTweetUrl.includes("twitter.com")
  );
}

export function semicolonParser(value: string): string {
  return value.replace(/;/g, "%3B");
}

export function isTweetUrl(value: string): boolean {
  return (value.match(/\/status\//g) || []).length === 1;
}

export function timestampParser(timestamp?: string | null): string | null {
  if (!timestamp) return null;

  const formats = [
    { regex: /^\d{4}$/u, format: "yyyy" },
    { regex: /^\d{6}$/u, format: "yyyyMM" },
    { regex: /^\d{8}$/u, format: "yyyyMMdd" },
    { regex: /^\d{10}$/u, format: "yyyyMMddHH" },
    { regex: /^\d{12}$/u, format: "yyyyMMddHHmm" },
    { regex: /^\d{14}$/u, format: "yyyyMMddHHmmss" },
  ];

  const target = formats.find(({ regex }) => regex.test(timestamp));
  if (!target) return null;

  const year = Number(timestamp.slice(0, 4));
  const month = target.format.length >= 6 ? Number(timestamp.slice(4, 6)) - 1 : 0;
  const day = target.format.length >= 8 ? Number(timestamp.slice(6, 8)) : 1;
  const hour = target.format.length >= 10 ? Number(timestamp.slice(8, 10)) : 0;
  const minute = target.format.length >= 12 ? Number(timestamp.slice(10, 12)) : 0;
  const second = target.format.length === 14 ? Number(timestamp.slice(12, 14)) : 0;

  const date = new Date(Date.UTC(year, month, day, hour, minute, second));
  if (Number.isNaN(date.getTime())) return null;

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  };

  return new Intl.DateTimeFormat("en-CA", options)
    .format(date)
    .replace(/-/g, "/");
}

export function checkUrlScheme(url: string): string {
  return url.replace(/(https?:)(\/{2,})/g, (_, scheme: string) => `${scheme}//`);
}

export function checkPatternTweet(tweetUrl: string): string {
  const pattern =
    /\/status\/((?:"(.*?)"|&quot;(.*?)(?=&|$)|&quot%3B(.*?)(?=&|$)))/;
  const match = tweetUrl.match(pattern);

  if (!match) return tweetUrl;

  const candidate = match[2] || match[3] || match[4] || "";
  return decodeHTMLEntities(candidate);
}

function decodeHTMLEntities(value: string): string {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function ensureHttpUrl(value: string): string {
  if (!value.startsWith("http://") && !value.startsWith("https://")) {
    return `https://${value.replace(/^\/+/, "")}`;
  }
  return value;
}

export function normalizeArchiveDate(value?: string | null, endOfDay = false): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  if (endOfDay) {
    date.setUTCHours(23, 59, 59, 0);
  } else {
    date.setUTCHours(0, 0, 0, 0);
  }

  const year = date.getUTCFullYear().toString().padStart(4, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hour = date.getUTCHours().toString().padStart(2, "0");
  const minute = date.getUTCMinutes().toString().padStart(2, "0");
  const second = date.getUTCSeconds().toString().padStart(2, "0");

  return `${year}${month}${day}${hour}${minute}${second}`;
}

export function stripSurroundingQuotes(value: string): string {
  return value.replace(/^"+|"+$/g, "");
}
