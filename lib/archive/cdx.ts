import { ARCHIVE_FETCH_TIMEOUT_MS, CDX_FIELD_HEADER, DEFAULT_USER_AGENT } from "./constants";
import { ArchiveRouteError } from "./errors";
import type { ArchiveFetchResult } from "./types";

const ARCHIVE_CDX_ENDPOINT = "https://web.archive.org/cdx/search/cdx";

type ArchiveApiError = {
  error?: string;
};

export async function fetchArchiveCdxJson(params: URLSearchParams): Promise<unknown[]> {
  let response: Response;
  try {
    response = await fetch(`${ARCHIVE_CDX_ENDPOINT}?${params.toString()}`, {
      headers: {
        "User-Agent": DEFAULT_USER_AGENT,
        Accept: "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(ARCHIVE_FETCH_TIMEOUT_MS),
    });
  } catch {
    throw new ArchiveRouteError(
      "Archive service is unavailable. Try again in a moment.",
      "archive_service",
      502
    );
  }

  if (!response.ok) {
    throw new ArchiveRouteError(
      `Archive service responded with ${response.status}.`,
      "archive_service",
      502
    );
  }

  let json: ArchiveApiError | unknown[];
  try {
    json = (await response.json()) as ArchiveApiError | unknown[];
  } catch {
    throw new ArchiveRouteError(
      "Archive service returned an invalid response.",
      "archive_response",
      502
    );
  }

  if (!Array.isArray(json)) {
    throw new ArchiveRouteError(
      json.error || "Archive service returned an invalid response.",
      "archive_response",
      502
    );
  }

  return json;
}

export function buildEmptyCdxRows(): ArchiveFetchResult["rows"] {
  return [Array.from(CDX_FIELD_HEADER)];
}
