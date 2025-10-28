"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HtmlTabDisplay } from "@/components/tabs/html-tab-display";
import { CsvTabDisplay } from "@/components/tabs/csv-tab-display";
import { JsonTabDisplay } from "@/components/tabs/json-tab-display";

const DISPLAY_COLUMNS = [
  "parsed_archived_timestamp",
  "archived_post_url",
  "parsed_post_url",
  "archived_statuscode",
] as const;

type TabKey = "HTML" | "CSV" | "JSON" | "Preview";

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


export default function ArchiveInstagramTool() {
  const t = useTranslations("instagram");

  const FIELD_LABELS: Record<string, string> = {
    parsed_archived_timestamp: t("results.fields.archivedParsed"),
    archived_timestamp: t("results.fields.archived"),
    archived_post_url: t("results.fields.archivedUrl"),
    parsed_post_url: t("results.fields.parsedPost"),
    original_post_url: t("results.fields.originalUrl"),
    archived_statuscode: t("results.fields.status"),
  };

  const formatDisplayValue = (key: string, value: string | boolean | null | undefined): ReactNode => {
    if (value === null || value === undefined || value === "") {
      return <span className="text-muted-foreground">-</span>;
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (typeof value === "string" && /^https?:\/\//i.test(value)) {
      const label = key.includes("archived") ? t("results.linkArchived") : t("results.linkOpen");
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
    const limit = 120;
    const truncated = stringValue.length > limit ? `${stringValue.slice(0, limit)}...` : stringValue;
    return truncated;
  };
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
      setError(t("form.usernameRequired"));
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/archive-instagram", {
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

  const jsonPreview = useMemo(() => {
    if (!response) return null;
    return JSON.stringify(response.data, null, 2);
  }, [response]);

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <CardHeader>
            <CardTitle>{t("form.title")}</CardTitle>
            <CardDescription>{t("form.description")}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">{t("form.username")}</Label>
              <Input
                id="username"
                placeholder={t("form.usernamePlaceholder")}
                value={form.username}
                onChange={(event) => handleChange("username", event.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="limit">{t("form.limit")}</Label>
              <Input
                id="limit"
                placeholder={t("form.limitPlaceholder")}
                value={form.limit}
                inputMode="numeric"
                onChange={(event) => handleChange("limit", event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="from">{t("form.from")}</Label>
              <Input
                id="from"
                type="date"
                value={form.timestampFrom}
                max={form.timestampTo}
                onChange={(event) => handleChange("timestampFrom", event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="to">{t("form.to")}</Label>
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
                  {t("form.uniqueLabel")}
                </Label>
                <span className="text-sm text-muted-foreground">
                  {t("form.uniqueDescription")}
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground md:col-span-2">
              {t("form.note")}
            </p>
          </CardContent>
          <div className="flex items-center justify-end gap-3 px-6 pb-6">
            <Button type="submit" disabled={loading}>
              {loading ? t("form.submitting") : t("form.submit")}
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
            <h2 className="text-2xl font-semibold">{t("results.title", { username: response.meta.username })}</h2>
            <p className="text-muted-foreground">
              {t("results.captured", { total: response.meta.total })}
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
                  {displayedRows.map((post, rowIndex) => (
                    <tr key={`post-${rowIndex}`}>
                      {DISPLAY_COLUMNS.map((column) => (
                        <td key={`${rowIndex}-${column}`} className="whitespace-pre-wrap px-4 py-3 align-top">
                          {formatDisplayValue(column, post[column])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t px-4 py-3 text-xs text-muted-foreground">
              {t("results.showing", { displayed: displayedRows.length, total: response.meta.total })}
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
                {t(`tabs.${tab.toLowerCase()}`)}
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
        </section>
      )}
    </>
  );
}

