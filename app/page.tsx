"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TweetRecord = Record<string, string | boolean | null>;

type FrameSourceKey =
  | "archived_tweet_url"
  | "parsed_archived_tweet_url"
  | "original_tweet_url"
  | "parsed_tweet_url";

const FRAME_SOURCES: Array<{ key: FrameSourceKey; label: string }> = [
  { key: "archived_tweet_url", label: "Archived Tweet" },
  { key: "parsed_archived_tweet_url", label: "Parsed Archived Tweet" },
  { key: "original_tweet_url", label: "Original Tweet" },
  { key: "parsed_tweet_url", label: "Parsed Tweet" },
];

const FIELD_LABELS: Record<string, string> = {
  parsed_archived_timestamp: "Archived (parsed)",
  archived_timestamp: "Archived",
  archived_tweet_url: "Archived URL",
  parsed_tweet_url: "Parsed Tweet",
  original_tweet_url: "Original URL",
  available_tweet_text: "Available Tweet Text",
  archived_statuscode: "Status",
};

const DISPLAY_COLUMNS = [
  "parsed_archived_timestamp",
  "archived_tweet_url",
  "parsed_tweet_url",
  "available_tweet_text",
  "archived_statuscode",
] as const;

type TabKey = "HTML" | "CSV" | "JSON";

type ApiResponse = {
  data: Array<Record<string, string | boolean | null>>;
  meta: {
    total: number;
    username: string;
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
  username: string;
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

function TweetPreviewList({ tweets, maxItems = 10 }: { tweets: TweetRecord[]; maxItems?: number }) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const limitedTweets = useMemo(() => tweets.slice(0, maxItems), [tweets, maxItems]);

  const handleToggle = (id: string, isOpen: boolean) => {
    setOpenSections((prev) => ({ ...prev, [id]: isOpen }));
  };

  if (limitedTweets.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No preview available for this query.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {limitedTweets.map((tweet, index) => {
        const availableText = typeof tweet.available_tweet_text === "string" ? tweet.available_tweet_text : null;
        const availableInfo = typeof tweet.available_tweet_info === "string" ? tweet.available_tweet_info : null;
        const timestamp =
          typeof tweet.parsed_archived_timestamp === "string"
            ? tweet.parsed_archived_timestamp
            : typeof tweet.archived_timestamp === "string"
              ? tweet.archived_timestamp
              : null;
        const cardKey = String(tweet.archived_urlkey ?? `${index}`);

        return (
          <article
            key={cardKey}
            className="rounded-xl border bg-background p-4 shadow-sm"
          >
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex flex-col gap-1">
                <p className="text-base font-medium">Capture #{index + 1}</p>
                {timestamp ? (
                  <p className="text-xs text-muted-foreground">Archived: {timestamp}</p>
                ) : null}
              </div>

              {availableText ? (
                <div className="rounded-lg border bg-muted/40 p-3">
                  <p className="text-sm font-medium">Available Tweet Content</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm">{availableText}</p>
                  {availableInfo ? (
                    <p className="mt-2 text-xs text-muted-foreground">{availableInfo}</p>
                  ) : null}
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2 text-xs">
                {FRAME_SOURCES.map((source) => {
                  const url = tweet[source.key];
                  const parsedUrl = typeof url === "string" ? url : null;
                  if (!parsedUrl) {
                    return null;
                  }
                  const sectionId = `${index}-${source.key}`;
                  const isOpen = openSections[sectionId] ?? false;

                  return (
                    <details
                      key={sectionId}
                      className="w-full overflow-hidden rounded-lg border bg-background"
                      onToggle={(event) => handleToggle(sectionId, event.currentTarget.open)}
                    >
                      <summary className="cursor-pointer px-3 py-2 text-sm font-medium">
                        Click to load the iframe from {source.label}
                      </summary>
                      <div className="px-3 pb-3">
                        {isOpen ? (
                          <iframe
                            key={`${sectionId}-iframe`}
                            src={parsedUrl}
                            title={`${source.label} - ${sectionId}`}
                            className="mt-2 h-[480px] w-full rounded-md border bg-white"
                            sandbox="allow-scripts allow-same-origin allow-popups"
                          />
                        ) : (
                          <p className="mt-2 text-xs text-muted-foreground">
                            Open this section to load the archived iframe.
                          </p>
                        )}
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}


export default function Home() {
  const [form, setForm] = useState<FormState>({
    username: "",
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
    if (!form.username.trim()) {
      setError("Username is required.");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/archive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username.trim(),
          timestampFrom: form.timestampFrom || null,
          timestampTo: form.timestampTo || null,
          limit: form.limit.trim() || null,
          unique: form.unique,
        }),
      });

      if (!res.ok) {
        const payload = (await res.json()) as { error?: string };
        throw new Error(payload.error ?? "An unexpected error occurred.");
      }

      const payload = (await res.json()) as ApiResponse;
      setResponse(payload);
      setActiveTab("HTML");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (type: "html" | "csv" | "json") => {
    if (!response) return;

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
    const limit = key === "available_tweet_text" ? 160 : 120;
    const truncated = stringValue.length > limit ? `${stringValue.slice(0, limit)}...` : stringValue;
    return truncated;
  };

  const jsonPreview = useMemo(() => {
    if (!response) return null;
    return JSON.stringify(response.data, null, 2);
  }, [response]);

  return (
    <main className="font-sans mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-4 py-10">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-semibold">Snapshot Explorer</h1>
        <p className="text-muted-foreground">
          Retrieve archived tweets CDX data in HTML, CSV, and JSON formats.
        </p>
        <p className="text-sm text-muted-foreground">
          Prototype inspired by the original Streamlit app. Some features may differ.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
            <CardDescription>
              Provide a Twitter username and optional filters to query the Internet Archive CDX API.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Without @"
                value={form.username}
                onChange={(event) => handleChange("username", event.target.value)}
                required
              />
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
              <Label htmlFor="from">Tweets saved from</Label>
              <Input
                id="from"
                type="date"
                value={form.timestampFrom}
                max={form.timestampTo}
                onChange={(event) => handleChange("timestampFrom", event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="to">Tweets saved until</Label>
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
                  Applies the collapse option on the URL key and uses the prefix match scope.
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground md:col-span-2">
              Note: Large date ranges may take longer to process and could exceed available resources. Consider
              smaller ranges for faster results.
            </p>
          </CardContent>
          <div className="flex items-center justify-end gap-3 px-6 pb-6">
            <Button type="submit" disabled={loading}>
              {loading ? "Retrieving..." : "Go"}
            </Button>
          </div>
        </form>
      </Card>

      {error ? (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {response ? (
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Results for @{response.meta.username}</h2>
            <p className="text-muted-foreground">
              {response.meta.total} URLs captured.
            </p>
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
                  {displayedRows.map((tweet, rowIndex) => (
                    <tr key={`tweet-${rowIndex}`}>
                      {DISPLAY_COLUMNS.map((column) => (
                        <td key={`${rowIndex}-${column}`} className="whitespace-pre-wrap px-4 py-3 align-top">
                          {formatDisplayValue(column, tweet[column])}
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
            {activeTab === "HTML" ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Button type="button" onClick={() => handleDownload("html")}>Download HTML</Button>
                  <span className="text-sm text-muted-foreground">Note: The iframes are best viewed in Firefox.</span>
                </div>
                <iframe
                  title="HTML preview"
                  srcDoc={response.exports.html}
                  className="h-[480px] w-full rounded-lg border"
                />
                <TweetPreviewList tweets={response.data} />
              </div>
            ) : null}

            {activeTab === "CSV" ? (
              <div className="flex flex-col gap-4">
                <Button type="button" onClick={() => handleDownload("csv")}>Download CSV</Button>
                <span className="text-sm text-muted-foreground">Preview:</span>
                <div className="max-h-[360px] overflow-auto rounded-lg border">
                  <table className="min-w-full divide-y divide-border text-sm">
                    <thead className="bg-muted/40">
                      <tr>
                        {previewColumns.map((column) => (
                          <th key={column} className="px-3 py-2 text-left font-semibold text-muted-foreground">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-background">
                      {displayedRows.map((row, rowIndex) => (
                        <tr key={`preview-row-${rowIndex}`}>
                          {previewColumns.map((column) => (
                            <td key={`${rowIndex}-${column}`} className="whitespace-pre-wrap px-3 py-2 align-top text-xs">
                              {row[column] ?? ""}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

            {activeTab === "JSON" ? (
              <div className="flex flex-col gap-4">
                <Button type="button" onClick={() => handleDownload("json")}>Download JSON</Button>
                <span className="text-sm text-muted-foreground">Preview:</span>
                <pre className="max-h-[360px] overflow-auto rounded-lg border bg-background p-4 text-xs">
                  {jsonPreview}
                </pre>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </main>
  );
}
