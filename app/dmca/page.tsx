import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { DMCA_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "DMCA / Copyright",
  description: "How to submit copyright complaints or DMCA notices for content surfaced by Xarchive.",
  alternates: {
    canonical: "/dmca",
  },
};

export default function DmcaPage() {
  return (
    <PageShell title="DMCA / Copyright Complaints" subtitle="Effective date: February 25, 2026">
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Important note</h2>
        <p className="text-muted-foreground">
          Xarchive is a search/export tool. Archive snapshots are provided by third parties (for example, the Internet
          Archive&apos;s Wayback Machine). If you want content removed from the Wayback Machine itself, you should also
          contact the Internet Archive directly.
        </p>
        <p className="text-sm text-muted-foreground">
          Not affiliated: Xarchive is not affiliated with the Internet Archive, X / Twitter, Meta, or Instagram.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How to submit a notice</h2>
        <p className="text-muted-foreground">
          Send your request to{" "}
          <a className="text-primary hover:underline" href={`mailto:${DMCA_EMAIL}`}>
            {DMCA_EMAIL}
          </a>
          .
        </p>
        <p className="text-muted-foreground">To help us process your request quickly, include:</p>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Your name and contact information (email address, and optionally phone number).</li>
          <li>A description of the copyrighted work you believe is infringed.</li>
          <li>
            The specific Xarchive page(s) and/or exported URL(s) you want reviewed (please include exact URLs).
          </li>
          <li>A statement that you have a good faith belief the use is not authorized by the rights holder.</li>
          <li>A statement that the information in the notice is accurate, under penalty of perjury.</li>
          <li>Your physical or electronic signature (typing your full legal name is acceptable).</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What we&apos;ll do</h2>
        <p className="text-muted-foreground">
          If your request is complete and valid, we may remove or disable access to the specific material within
          Xarchive (for example, by suppressing certain derived fields or links). We may also request additional
          information if needed.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Counter-notices</h2>
        <p className="text-muted-foreground">
          If you believe material was removed by mistake, you may contact us at the same email address with a
          counter-notice explaining why. We will review and respond as appropriate.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="text-muted-foreground">
          For general questions, see{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Contact
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}

