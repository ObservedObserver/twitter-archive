const buildTimestamp = new Date().toISOString();

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL ?? "https://xarchive.net",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  autoLastmod: false,
  sitemapSize: 7000,
  outDir: "public",
  transform: async (_, path) => ({
    loc: path,
    lastmod: buildTimestamp,
    changefreq: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.6,
  }),
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};

module.exports = config;
