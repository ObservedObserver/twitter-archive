import { NextResponse } from "next/server";

import { REDDIT_FIELD_OPTIONS } from "@/lib/archive/constants";
import { buildExportBundle } from "@/lib/archive/exporter";
import { parseRedditArchiveResponse } from "@/lib/archive/parser-reddit";
import { fetchRedditArchiveCdx } from "@/lib/archive/service-reddit";
import type { RedditTargetType } from "@/lib/archive/types";
import { trackServerEvent } from "@/lib/server-analytics";

interface ArchiveRedditRequestBody {
  target?: string;
  targetType?: RedditTargetType;
  timestampFrom?: string | null;
  timestampTo?: string | null;
  limit?: number | string | null;
  unique?: boolean;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ArchiveRedditRequestBody;

    const target = (body.target ?? "").trim();
    const targetType = body.targetType ?? "subreddit";

    if (!target) {
      return NextResponse.json({ error: "Target is required." }, { status: 400 });
    }

    if (!["subreddit", "user", "url"].includes(targetType)) {
      return NextResponse.json({ error: "Target type is invalid." }, { status: 400 });
    }

    const limit = body.limit ? Number(body.limit) : undefined;
    if (Number.isNaN(limit as number)) {
      return NextResponse.json({ error: "Limit must be a number." }, { status: 400 });
    }

    const archiveResponse = await fetchRedditArchiveCdx({
      target,
      targetType,
      collapse: body.unique ? "urlkey" : null,
      timestampFrom: body.timestampFrom ?? null,
      timestampTo: body.timestampTo ?? null,
      limit: limit && limit > 0 ? limit : null,
    });

    const parsed = await parseRedditArchiveResponse(
      archiveResponse,
      archiveResponse.normalizedTarget,
      targetType,
      REDDIT_FIELD_OPTIONS
    );
    const limitedTweets = limit && limit > 0 ? parsed.tweets.slice(0, limit) : parsed.tweets;
    const limitedParsed = {
      ...parsed,
      tweets: limitedTweets,
      total: limitedTweets.length,
    };

    const displayTarget =
      targetType === "subreddit"
        ? `r/${archiveResponse.normalizedTarget}`
        : targetType === "user"
          ? `u/${archiveResponse.normalizedTarget}`
          : archiveResponse.normalizedTarget;

    const bundle = buildExportBundle(
      limitedParsed,
      REDDIT_FIELD_OPTIONS,
      "reddit",
      `Archived Reddit captures for ${displayTarget}`
    );
    await trackServerEvent(request, bundle.total > 0 ? "tool_search_success_server" : "tool_search_empty_server", {
      surface: "reddit_tool",
      target_type: targetType,
      total: bundle.total,
      unique: Boolean(body.unique),
    });

    return NextResponse.json({
      data: bundle.tweets,
      meta: {
        total: bundle.total,
        target: bundle.target,
        targetType: bundle.targetType,
        filename: bundle.filename,
        showResumeKey: bundle.showResumeKey,
        resumptionKey: bundle.resumptionKey ?? null,
        fieldOptions: REDDIT_FIELD_OPTIONS,
      },
      exports: {
        csv: bundle.csv,
        json: bundle.json,
        html: bundle.html,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error retrieving archived Reddit captures.";
    await trackServerEvent(request, "tool_search_error_server", {
      surface: "reddit_tool",
      message,
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
