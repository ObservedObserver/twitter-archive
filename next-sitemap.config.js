const buildTimestamp = new Date().toISOString();

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL ?? "https://xarchive.net",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  autoLastmod: false,
  sitemapSize: 7000,
  outDir: "public",
  // Exclude API routes and other non-page paths
  exclude: ["/api/*", "/en", "/ja", "/es"],
  // Transform paths to include i18n alternates
  transform: async (config, path) => {
    // Skip API routes
    if (path.startsWith("/api")) {
      return null;
    }

    // Remove locale prefixes to get base path
    let basePath = path;
    let locale = "en";

    if (path.startsWith("/ja")) {
      basePath = path.replace("/ja", "") || "/";
      locale = "ja";
    } else if (path.startsWith("/es")) {
      basePath = path.replace("/es", "") || "/";
      locale = "es";
    }

    // Determine priority based on path
    const isHome = basePath === "/";
    const priority = isHome ? 1 : 0.6;
    const changefreq = isHome ? "daily" : "weekly";

    return {
      loc: path,
      lastmod: buildTimestamp,
      changefreq,
      priority,
      // Add alternate language links
      alternateRefs: [
        {
          href: `${config.siteUrl}${basePath === "/" ? "" : basePath}`,
          hreflang: "en",
        },
        {
          href: `${config.siteUrl}/ja${basePath}`,
          hreflang: "ja",
        },
        {
          href: `${config.siteUrl}/es${basePath}`,
          hreflang: "es",
        },
        {
          href: `${config.siteUrl}${basePath === "/" ? "" : basePath}`,
          hreflang: "x-default",
        },
      ],
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*"],
      }
    ],
  },
};

module.exports = config;
