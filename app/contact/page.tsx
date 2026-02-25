import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { CONTACT_EMAIL, DMCA_EMAIL, GITHUB_REPO_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to contact the Xarchive team for support, feedback, or copyright requests.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <PageShell title="Contact" subtitle="Questions, feedback, or requests? Reach us using the options below.">
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">General inquiries</h2>
        <p className="text-muted-foreground">
          Email:{" "}
          <a className="text-primary hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="text-sm text-muted-foreground">
          You can also report bugs or request features via GitHub Issues:{" "}
          <a className="text-primary hover:underline" href={`${GITHUB_REPO_URL}/issues`} target="_blank" rel="noreferrer">
            {GITHUB_REPO_URL}/issues
          </a>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">DMCA / copyright</h2>
        <p className="text-muted-foreground">
          For copyright complaints or takedown requests, use:{" "}
          <a className="text-primary hover:underline" href={`mailto:${DMCA_EMAIL}`}>
            {DMCA_EMAIL}
          </a>
        </p>
        <p className="text-sm text-muted-foreground">
          Please include the URLs you want reviewed and enough information for us to identify the material. Details are
          listed on the{" "}
          <Link href="/dmca" className="text-primary hover:underline">
            DMCA / Copyright page
          </Link>
          .
        </p>
      </section>

      <p className="text-xs text-muted-foreground">Last updated: February 25, 2026</p>
    </PageShell>
  );
}
