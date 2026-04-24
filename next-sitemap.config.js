const defaultLastmod = "2026-04-06T00:00:00.000Z";

const pageLastmod = {
  "/": "2026-04-24T00:00:00.000Z",
  "/archive-instagram": "2026-04-24T00:00:00.000Z",
  "/archive-reddit": "2026-04-24T00:00:00.000Z",
  "/guides": "2026-04-06T00:00:00.000Z",
  "/guides/deleted-tweets": "2026-04-06T00:00:00.000Z",
  "/guides/instagram-archives": "2026-04-06T00:00:00.000Z",
  "/guides/reddit-archives": "2026-04-06T00:00:00.000Z",
  "/guides/wayback-twitter": "2026-04-06T00:00:00.000Z",
};

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL ?? "https://xarchive.net",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/early-access"],
  autoLastmod: false,
  sitemapSize: 7000,
  outDir: "public",
  transform: async (_, path) => ({
    loc: path,
    lastmod: pageLastmod[path] ?? defaultLastmod,
    changefreq: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.6,
  }),
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};

module.exports = config;
