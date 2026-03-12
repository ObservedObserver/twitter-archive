import { DEFAULT_USER_AGENT } from "./constants";
import type { ArchiveFetchResult, RedditTargetType } from "./types";
import { normalizeArchiveDate } from "./utils";

const ARCHIVE_CDX_ENDPOINT = "https://web.archive.org/cdx/search/cdx";

type RedditArchiveQueryOptions = {
  target: string;
  targetType: RedditTargetType;
  collapse?: string | null;
  timestampFrom?: string | null;
  timestampTo?: string | null;
  limit?: number | null;
  resumptionKey?: string | null;
};

type ArchiveApiError = {
  error: string;
};

export async function fetchRedditArchiveCdx(
  options: RedditArchiveQueryOptions
): Promise<ArchiveFetchResult & { normalizedTarget: string }> {
  const {
    target,
    targetType,
    collapse,
    timestampFrom,
    timestampTo,
    limit,
    resumptionKey,
  } = options;

  const normalizedTarget = normalizeRedditTarget(target, targetType);
  const url = buildRedditUrl(normalizedTarget, targetType);

  const params = new URLSearchParams();
  params.set("url", url);
  params.set("output", "json");
  params.set("filter", "statuscode:200");

  const normalizedFrom = normalizeArchiveDate(timestampFrom ?? undefined, false);
  const normalizedTo = normalizeArchiveDate(timestampTo ?? undefined, true);
  const effectiveLimit =
    limit && limit > 0 && targetType !== "url" ? Math.min(limit * 10, 2000) : limit;

  if (collapse) params.set("collapse", collapse);
  if (normalizedFrom) params.set("from", normalizedFrom);
  if (normalizedTo) params.set("to", normalizedTo);
  if (effectiveLimit && effectiveLimit > 0) params.set("limit", String(effectiveLimit));
  if (resumptionKey) params.set("resumptionKey", resumptionKey);
  if (targetType !== "url") params.set("matchType", "prefix");

  const showResumeKey = Boolean(limit && limit > 0);
  if (showResumeKey) params.set("showResumeKey", "true");

  const response = await fetch(`${ARCHIVE_CDX_ENDPOINT}?${params.toString()}`, {
    headers: {
      "User-Agent": DEFAULT_USER_AGENT,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Archive service responded with ${response.status}`);
  }

  const json = (await response.json()) as ArchiveApiError | unknown[];

  if (!Array.isArray(json) || json.length === 0) {
    throw new Error(`No archived Reddit captures found for ${formatTargetLabel(normalizedTarget, targetType)}.`);
  }

  return {
    rows: json as ArchiveFetchResult["rows"],
    showResumeKey,
    normalizedTarget,
  };
}

function buildRedditUrl(target: string, targetType: RedditTargetType): string {
  switch (targetType) {
    case "subreddit":
      return `https://www.reddit.com/r/${target}`;
    case "user":
      return `https://www.reddit.com/user/${target}`;
    case "url":
      return target;
  }
}

function normalizeRedditTarget(target: string, targetType: RedditTargetType): string {
  const trimmed = target.trim();
  if (!trimmed) {
    throw new Error("Target is required.");
  }

  if (targetType === "url") {
    return normalizeRedditUrl(trimmed);
  }

  const pathSource = trimmed
    .replace(/^https?:\/\/(www\.|old\.|new\.|np\.)?reddit\.com\//i, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");

  const pieces = pathSource.split("/").filter(Boolean);
  if (targetType === "subreddit") {
    const subreddit = pieces[0]?.toLowerCase() === "r" ? pieces[1] : pieces[0];
    if (!subreddit) {
      throw new Error("Subreddit name is required.");
    }
    return subreddit;
  }

  const username = pieces[0]?.toLowerCase() === "user" || pieces[0]?.toLowerCase() === "u"
    ? pieces[1]
    : pieces[0];
  if (!username) {
    throw new Error("Username is required.");
  }
  return username.replace(/^@/, "");
}

function normalizeRedditUrl(value: string): string {
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value.replace(/^\/+/, "")}`;
  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    throw new Error("Provide a valid Reddit URL.");
  }

  if (!/(^|\.)reddit\.com$/i.test(url.hostname)) {
    throw new Error("Only reddit.com URLs are supported.");
  }

  url.protocol = "https:";
  url.hostname = "www.reddit.com";
  url.hash = "";
  url.search = "";

  const normalizedPath = url.pathname.replace(/\/+$/, "") || "/";
  url.pathname = normalizedPath;

  return url.toString();
}

function formatTargetLabel(target: string, targetType: RedditTargetType): string {
  if (targetType === "subreddit") return `r/${target}`;
  if (targetType === "user") return `u/${target}`;
  return target;
}
