export type ArchiveErrorCategory =
  | "invalid_request"
  | "archive_service"
  | "archive_response"
  | "unexpected";

export class ArchiveRouteError extends Error {
  readonly category: ArchiveErrorCategory;
  readonly statusCode: number;

  constructor(
    message: string,
    category: ArchiveErrorCategory,
    statusCode: number
  ) {
    super(message);
    this.name = "ArchiveRouteError";
    this.category = category;
    this.statusCode = statusCode;
  }
}

export function getArchiveErrorDetails(error: unknown): {
  category: ArchiveErrorCategory;
  message: string;
  statusCode: number;
} {
  if (error instanceof ArchiveRouteError) {
    return {
      category: error.category,
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  return {
    category: "unexpected",
    message:
      error instanceof Error
        ? error.message
        : "Unexpected error retrieving archived captures.",
    statusCode: 500,
  };
}
