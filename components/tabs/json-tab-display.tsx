"use client";

import { Button } from "@/components/ui/button";

type JsonTabDisplayProps = {
  jsonPreview: string;
  onDownload: () => void;
};

export function JsonTabDisplay({ jsonPreview, onDownload }: JsonTabDisplayProps) {
  return (
    <div className="flex flex-col gap-4">
      <Button type="button" onClick={onDownload}>
        Download JSON
      </Button>
      <span className="text-sm text-muted-foreground">Preview:</span>
      <pre className="max-h-[360px] overflow-auto rounded-lg border bg-background p-4 text-xs">
        {jsonPreview}
      </pre>
    </div>
  );
}
