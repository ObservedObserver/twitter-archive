import { NextResponse } from "next/server";

import { INSTAGRAM_FIELD_OPTIONS } from "@/lib/archive/constants";
import { ArchiveRouteError, getArchiveErrorDetails } from "@/lib/archive/errors";
import { buildExportBundle } from "@/lib/archive/exporter";
import { parseInstagramArchiveResponse } from "@/lib/archive/parser-instagram";
import { fetchInstagramArchiveCdx } from "@/lib/archive/service-instagram";
import { trackServerEvent } from "@/lib/server-analytics";

interface ArchiveRequestBody {
  username?: string;
  timestampFrom?: string | null;
  timestampTo?: string | null;
  limit?: number | string | null;
  unique?: boolean;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ArchiveRequestBody;

    const username = (body.username ?? "").trim();
    if (!username) {
      throw new ArchiveRouteError("Username is required.", "invalid_request", 400);
    }

    const limit = body.limit ? Number(body.limit) : undefined;
    if (Number.isNaN(limit as number)) {
      throw new ArchiveRouteError("Limit must be a number.", "invalid_request", 400);
    }

    const collapse = body.unique ? "urlkey" : null;
    const matchType = body.unique ? "prefix" : null;

    const archiveResponse = await fetchInstagramArchiveCdx({
      username,
      collapse,
      matchType,
      timestampFrom: body.timestampFrom ?? null,
      timestampTo: body.timestampTo ?? null,
      limit: limit && limit > 0 ? limit : null,
    });

    const parsed = await parseInstagramArchiveResponse(archiveResponse, username, INSTAGRAM_FIELD_OPTIONS);
    const bundle = buildExportBundle(parsed, INSTAGRAM_FIELD_OPTIONS);
    await trackServerEvent(request, bundle.total > 0 ? "tool_search_success_server" : "tool_search_empty_server", {
      surface: "instagram_tool",
      total: bundle.total,
      unique: Boolean(body.unique),
    });

    return NextResponse.json({
      data: bundle.tweets,
      meta: {
        total: bundle.total,
        username: bundle.username,
        filename: bundle.filename,
        showResumeKey: bundle.showResumeKey,
        resumptionKey: bundle.resumptionKey ?? null,
        fieldOptions: INSTAGRAM_FIELD_OPTIONS,
      },
      exports: {
        csv: bundle.csv,
        json: bundle.json,
        html: bundle.html,
      },
    });
  } catch (error) {
    const details = getArchiveErrorDetails(error);
    const eventName =
      details.category === "invalid_request"
        ? "tool_search_invalid_request_server"
        : "tool_search_error_server";
    await trackServerEvent(request, eventName, {
      surface: "instagram_tool",
      error_category: details.category,
      status_code: details.statusCode,
    });
    return NextResponse.json(
      {
        error: details.message,
        errorCategory: details.category,
      },
      { status: details.statusCode }
    );
  }
}
