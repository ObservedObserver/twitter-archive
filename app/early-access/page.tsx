import type { Metadata } from "next";
import { Suspense } from "react";

import { EarlyAccessForm } from "@/components/early-access-form";
import { PageShell } from "@/components/page-shell";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Xarchive Early Access",
  description: "Request early access to advanced Xarchive archive search and export features.",
  alternates: {
    canonical: `${SITE_URL}/early-access`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function EarlyAccessPage() {
  return (
    <PageShell
      title="Xarchive Early Access"
      subtitle="Tell us which advanced archive workflow you want first."
    >
      <Suspense fallback={<div className="rounded-lg border p-5 text-sm text-muted-foreground">Loading...</div>}>
        <EarlyAccessForm />
      </Suspense>
    </PageShell>
  );
}
