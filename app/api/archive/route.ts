import { NextResponse } from "next/server";

import { FIELD_OPTIONS } from "@/lib/archive/constants";
import { buildExportBundle } from "@/lib/archive/exporter";
import { parseArchiveResponse } from "@/lib/archive/parser";
import { fetchArchiveCdx } from "@/lib/archive/service";

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
      return NextResponse.json({ error: "Username is required." }, { status: 400 });
    }

    const limit = body.limit ? Number(body.limit) : undefined;
    if (Number.isNaN(limit as number)) {
      return NextResponse.json({ error: "Limit must be a number." }, { status: 400 });
    }

    const collapse = body.unique ? "urlkey" : null;
    const matchType = body.unique ? "prefix" : null;

    const archiveResponse = await fetchArchiveCdx({
      username,
      collapse,
      matchType,
      timestampFrom: body.timestampFrom ?? null,
      timestampTo: body.timestampTo ?? null,
      limit: limit && limit > 0 ? limit : null,
    });

    const parsed = await parseArchiveResponse(archiveResponse, username, FIELD_OPTIONS);
    const bundle = buildExportBundle(parsed, FIELD_OPTIONS);

    return NextResponse.json({
      data: bundle.tweets,
      meta: {
        total: bundle.total,
        username: bundle.username,
        filename: bundle.filename,
        showResumeKey: bundle.showResumeKey,
        resumptionKey: bundle.resumptionKey ?? null,
        fieldOptions: FIELD_OPTIONS,
      },
      exports: {
        csv: bundle.csv,
        json: bundle.json,
        html: bundle.html,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error retrieving archived tweets.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
