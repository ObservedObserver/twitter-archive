import { buildEmptyCdxRows, fetchArchiveCdxJson } from "./cdx";
import { ArchiveRouteError } from "./errors";
import type { ArchiveFetchResult, RedditTargetType } from "./types";
import { normalizeArchiveDate } from "./utils";

type RedditArchiveQueryOptions = {
  target: string;
  targetType: RedditTargetType;
  collapse?: string | null;
  timestampFrom?: string | null;
  timestampTo?: string | null;
  limit?: number | null;
  resumptionKey?: string | null;
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

  const json = await fetchArchiveCdxJson(params);

  if (json.length === 0) {
    return {
      rows: buildEmptyCdxRows(),
      showResumeKey,
      normalizedTarget,
    };
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
    throw new ArchiveRouteError("Target is required.", "invalid_request", 400);
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
      throw new ArchiveRouteError("Subreddit name is required.", "invalid_request", 400);
    }
    return subreddit;
  }

  const username = pieces[0]?.toLowerCase() === "user" || pieces[0]?.toLowerCase() === "u"
    ? pieces[1]
    : pieces[0];
  if (!username) {
    throw new ArchiveRouteError("Username is required.", "invalid_request", 400);
  }
  return username.replace(/^@/, "");
}

function normalizeRedditUrl(value: string): string {
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value.replace(/^\/+/, "")}`;
  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    throw new ArchiveRouteError("Provide a valid Reddit URL.", "invalid_request", 400);
  }

  if (!/(^|\.)reddit\.com$/i.test(url.hostname)) {
    throw new ArchiveRouteError("Only reddit.com URLs are supported.", "invalid_request", 400);
  }

  url.protocol = "https:";
  url.hostname = "www.reddit.com";
  url.hash = "";
  url.search = "";

  const normalizedPath = url.pathname.replace(/\/+$/, "") || "/";
  url.pathname = normalizedPath;

  return url.toString();
}
