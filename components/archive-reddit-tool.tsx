"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HtmlTabDisplay } from "@/components/tabs/html-tab-display";
import { CsvTabDisplay } from "@/components/tabs/csv-tab-display";
import { JsonTabDisplay } from "@/components/tabs/json-tab-display";
import { PaidFeatureCards } from "@/components/paid-feature-card";
import { trackToolEvent } from "@/lib/analytics";

type TargetType = "subreddit" | "user" | "url";
type TabKey = "HTML" | "CSV" | "JSON";

const FIELD_LABELS: Record<string, string> = {
  parsed_archived_timestamp: "Archived (parsed)",
  archived_reddit_url: "Archived URL",
  parsed_reddit_url: "Parsed URL",
  reddit_resource_type: "Type",
  reddit_subreddit: "Subreddit",
  reddit_author: "Author",
  reddit_post_title: "Post Title",
  archived_statuscode: "Status",
};

const DISPLAY_COLUMNS = [
  "parsed_archived_timestamp",
  "archived_reddit_url",
  "reddit_resource_type",
  "reddit_subreddit",
  "reddit_author",
  "reddit_post_title",
] as const;

const TARGET_LABELS: Record<TargetType, string> = {
  subreddit: "Subreddit",
  user: "Username",
  url: "Reddit URL",
};

const TARGET_PLACEHOLDERS: Record<TargetType, string> = {
  subreddit: "programming",
  user: "spez",
  url: "https://www.reddit.com/r/programming/comments/...",
};

const TARGET_HELP_TEXT: Record<TargetType, string> = {
  subreddit: "Best for community-level discovery across subreddit pages, posts, and comments.",
  user: "Best for archived profile history and user-posted content tied to one Reddit account.",
  url: "Best when you already know the exact Reddit post, comment, or profile URL you want to verify.",
};

const EXAMPLES: Array<{ label: string; targetType: TargetType; target: string }> = [
  { label: "r/programming", targetType: "subreddit", target: "programming" },
  { label: "u/spez", targetType: "user", target: "spez" },
  {
    label: "Sample post URL",
    targetType: "url",
    target: "https://www.reddit.com/r/programming/comments/1b0zvia/",
  },
];

type ApiResponse = {
  data: Array<Record<string, string | boolean | null>>;
  meta: {
    total: number;
    target: string;
    targetType: TargetType;
    filename: string;
    showResumeKey: boolean;
    resumptionKey: string | null;
    fieldOptions: string[];
  };
  exports: {
    csv: string;
    json: string;
    html: string;
  };
};

type FormState = {
  targetType: TargetType;
  target: string;
  timestampFrom: string;
  timestampTo: string;
  limit: string;
  unique: boolean;
};

const TABS: TabKey[] = ["HTML", "CSV", "JSON"];

const getDateInputValue = (date: Date) => date.toISOString().slice(0, 10);

const sixMonthsAgo = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  return getDateInputValue(date);
};

const formatDisplayValue = (key: string, value: string | boolean | null | undefined): ReactNode => {
  if (value === null || value === undefined || value === "") {
    return <span className="text-muted-foreground">-</span>;
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "string" && /^https?:\/\//i.test(value)) {
    const label = key.includes("archived") ? "Archived" : "Open";
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline-offset-4 hover:underline"
      >
        {label}
      </a>
    );
  }

  const stringValue = String(value);
  const limit = key === "reddit_post_title" ? 90 : 120;
  const truncated = stringValue.length > limit ? `${stringValue.slice(0, limit)}...` : stringValue;
  return truncated;
};

export default function ArchiveRedditTool() {
  const [form, setForm] = useState<FormState>({
    targetType: "subreddit",
    target: "",
    timestampFrom: sixMonthsAgo(),
    timestampTo: getDateInputValue(new Date()),
    limit: "",
    unique: false,
  });
  const [activeTab, setActiveTab] = useState<TabKey>("HTML");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const handleChange = (key: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.target.trim()) {
      setError(`${TARGET_LABELS[form.targetType]} is required.`);
      return;
    }

    trackToolEvent("tool_search_submit", "reddit_tool", {
      target_type: form.targetType,
      unique: form.unique,
      has_limit: Boolean(form.limit.trim()),
    });
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/archive-reddit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          target: form.target.trim(),
          targetType: form.targetType,
          timestampFrom: form.timestampFrom || null,
          timestampTo: form.timestampTo || null,
          limit: form.limit.trim() || null,
          unique: form.unique,
        }),
      });

      if (!res.ok) {
        const payload = (await res.json()) as { error?: string; errorCategory?: string };
        throw new ToolSearchError(
          payload.error ?? "An unexpected error occurred.",
          payload.errorCategory ?? "unknown"
        );
      }

      const payload = (await res.json()) as ApiResponse;
      setResponse(payload);
      setActiveTab("HTML");
      trackToolEvent(payload.meta.total > 0 ? "tool_search_success" : "tool_search_empty", "reddit_tool", {
        target_type: payload.meta.targetType,
        total: payload.meta.total,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error.";
      setError(message);
      trackToolEvent("tool_search_error", "reddit_tool", {
        target_type: form.targetType,
        error_category: err instanceof ToolSearchError ? err.category : "unknown",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (type: "html" | "csv" | "json") => {
    if (!response) return;
    trackToolEvent("export_click", "reddit_tool", {
      format: type,
      target_type: response.meta.targetType,
      total: response.meta.total,
    });

    const extensionMap: Record<typeof type, string> = {
      html: "html",
      csv: "csv",
      json: "json",
    };
    const mimeMap: Record<typeof type, string> = {
      html: "text/html",
      csv: "text/csv",
      json: "application/json",
    };

    const blob = new Blob([response.exports[type]], { type: mimeMap[type] });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${response.meta.filename}.${extensionMap[type]}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const displayedRows = useMemo(() => {
    if (!response) return [];
    return response.data.slice(0, 20);
  }, [response]);

  const previewColumns = useMemo(() => {
    if (!response) return [] as string[];
    return response.meta.fieldOptions.filter((column) => column !== "resumption_key");
  }, [response]);

  const jsonPreview = useMemo(() => {
    if (!response) return null;
    return JSON.stringify(response.data, null, 2);
  }, [response]);

  const resultsLabel = response
    ? response.meta.targetType === "subreddit"
      ? `r/${response.meta.target}`
      : response.meta.targetType === "user"
        ? `u/${response.meta.target}`
        : response.meta.target
    : null;

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
            <CardDescription>
              Search Reddit archive captures by subreddit, user profile, or direct Reddit URL via the Internet Archive CDX API.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="targetType">Target Type</Label>
              <Select
                value={form.targetType}
                onValueChange={(value) => handleChange("targetType", value as TargetType)}
              >
                <SelectTrigger id="targetType" className="w-full">
                  <SelectValue placeholder="Choose a target type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="subreddit">Subreddit</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="url">Direct URL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="target">{TARGET_LABELS[form.targetType]}</Label>
              <Input
                id="target"
                placeholder={TARGET_PLACEHOLDERS[form.targetType]}
                value={form.target}
                onChange={(event) => handleChange("target", event.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">{TARGET_HELP_TEXT[form.targetType]}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="limit">Limit</Label>
              <Input
                id="limit"
                placeholder="Optional"
                value={form.limit}
                inputMode="numeric"
                onChange={(event) => handleChange("limit", event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="from">Captures saved from</Label>
              <Input
                id="from"
                type="date"
                value={form.timestampFrom}
                max={form.timestampTo}
                onChange={(event) => handleChange("timestampFrom", event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="to">Captures saved until</Label>
              <Input
                id="to"
                type="date"
                value={form.timestampTo}
                min={form.timestampFrom}
                onChange={(event) => handleChange("timestampTo", event.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
              <input
                id="unique"
                type="checkbox"
                checked={form.unique}
                onChange={(event) => handleChange("unique", event.target.checked)}
                className="size-4"
              />
              <div className="flex flex-col">
                <Label htmlFor="unique" className="text-base">
                  Only unique archive URLs
                </Label>
                <span className="text-sm text-muted-foreground">
                  Collapses duplicate URL keys so repeated snapshots do not overwhelm the result set.
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground md:col-span-2">
              Subreddit and user searches use prefix matching to surface nested post and comment captures under the selected target.
            </p>

            <div className="flex flex-col gap-3 md:col-span-2">
              <span className="text-sm font-medium">Quick examples</span>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((example) => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        targetType: example.targetType,
                        target: example.target,
                      }))
                    }
                    className="rounded-full border px-3 py-1 text-sm hover:bg-muted"
                  >
                    {example.label}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
          <div className="flex items-center justify-end gap-3 px-6 pb-6">
            <Button type="submit" disabled={loading}>
              {loading ? "Retrieving..." : "Go"}
            </Button>
          </div>
        </form>
      </Card>

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {response && (
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Results for {resultsLabel}</h2>
            <p className="text-muted-foreground">{response.meta.total} URLs captured.</p>
          </div>

          <div className="rounded-xl border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border text-left text-sm">
                <thead className="bg-muted/40">
                  <tr>
                    {DISPLAY_COLUMNS.map((column) => (
                      <th key={column} className="px-4 py-3 font-semibold text-muted-foreground">
                        {FIELD_LABELS[column] ?? column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {displayedRows.map((capture, rowIndex) => (
                    <tr key={`capture-${rowIndex}`}>
                      {DISPLAY_COLUMNS.map((column) => (
                        <td key={`${rowIndex}-${column}`} className="whitespace-pre-wrap px-4 py-3 align-top">
                          {formatDisplayValue(column, capture[column])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t px-4 py-3 text-xs text-muted-foreground">
              Showing {displayedRows.length} of {response.meta.total} captures.
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-4 py-1 text-sm transition-colors ${
                  activeTab === tab ? "border-primary bg-primary text-primary-foreground" : "border-input"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="rounded-xl border bg-card p-4 shadow-sm">
            {activeTab === "HTML" && (
              <HtmlTabDisplay
                htmlContent={response.exports.html}
                tweets={response.data}
                onDownload={() => handleDownload("html")}
              />
            )}

            {activeTab === "CSV" && (
              <CsvTabDisplay
                displayedRows={displayedRows}
                previewColumns={previewColumns}
                onDownload={() => handleDownload("csv")}
              />
            )}

            {activeTab === "JSON" && jsonPreview && (
              <JsonTabDisplay
                jsonPreview={jsonPreview}
                onDownload={() => handleDownload("json")}
              />
            )}
          </div>

          <PaidFeatureCards surface="reddit_tool" />
        </section>
      )}
    </>
  );
}

class ToolSearchError extends Error {
  constructor(
    message: string,
    readonly category: string
  ) {
    super(message);
    this.name = "ToolSearchError";
  }
}
