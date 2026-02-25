import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/dmca", label: "DMCA / Copyright" },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-5xl px-4 py-10">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 space-y-2 text-xs text-muted-foreground">
          <p>
            Not affiliated: Xarchive is an independent project and is not affiliated with, endorsed by, or sponsored by
            X (Twitter), Meta (Instagram), or the Internet Archive.
          </p>
          <p>© {new Date().getFullYear()} Xarchive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

