"use client";

import { Button } from "@/components/ui/button";

type TweetRecord = Record<string, string | boolean | null>;

type CsvTabDisplayProps = {
  displayedRows: TweetRecord[];
  previewColumns: string[];
  onDownload: () => void;
};

export function CsvTabDisplay({ displayedRows, previewColumns, onDownload }: CsvTabDisplayProps) {
  return (
    <div className="flex flex-col gap-4">
      <Button type="button" onClick={onDownload}>
        Download CSV
      </Button>
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
  );
}
