# Xarchive (Twitter Archive)

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

**Xarchive** is a free, open-source web application for exploring and downloading social media archive snapshots from the Internet Archive's Wayback Machine. Search, preview, and export historical Twitter and Instagram data in multiple formats.

🔗 **Live Demo**: [https://xarchive.net](https://xarchive.net)

## ✨ Features

### 🐦 Twitter Archive Explorer
- **Search by Username**: Find all archived tweets for any Twitter account
- **Date Range Filtering**: Narrow down results to specific time periods
- **Wayback Machine Integration**: Direct access to Internet Archive CDX API data
- **Multiple Export Formats**: Download results as HTML, CSV, or JSON
- **Tweet Preview**: View archived tweet text, timestamps, and status codes
- **Unique URL Filtering**: Option to collapse duplicate snapshots

### 📸 Instagram Archive Explorer
- **Profile Search**: Discover archived Instagram posts by username
- **Historical Data Access**: Browse Instagram snapshots saved on Wayback Machine
- **Flexible Export Options**: Export data in HTML, CSV, or JSON formats
- **Date Range Control**: Filter archives by specific date ranges
- **Snapshot Preview**: View archived post metadata and URLs

### 🎯 General Features
- **No Registration Required**: Start archiving immediately
- **Privacy-Focused**: No tracking, no data collection
- **Fast & Responsive**: Built with Next.js 15 and React 19
- **Modern UI**: Beautiful interface powered by shadcn/ui and Tailwind CSS
- **Export Ready**: All data downloadable with timestamped filenames

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ or higher
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/xarchive.git
cd xarchive
```

2. Install dependencies:
```bash
yarn install
```

3. Run the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
yarn build
yarn start
```

## 📖 How to Use

### Twitter Archive Tool

1. Visit [xarchive.net](https://xarchive.net) or run locally
2. Enter a Twitter username (without @)
3. Optionally set date range filters and result limits
4. Click "Go" to search the Wayback Machine
5. Preview results in the interactive table
6. Choose your export format (HTML, CSV, or JSON)
7. Download your archive data

### Instagram Archive Tool

1. Visit [xarchive.net/archive-instagram](https://xarchive.net/archive-instagram)
2. Enter an Instagram username (without @)
3. Set your desired date range
4. Click "Go" to retrieve snapshots
5. Export results in your preferred format

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [Internet Archive CDX API](https://archive.org/developers/wayback-cdx-server.html)

## 📁 Project Structure

```
xarchive/
├── app/                        # Next.js App Router pages
│   ├── api/                    # API routes
│   │   ├── archive/            # Twitter archive endpoint
│   │   ├── archive-instagram/  # Instagram archive endpoint
│   │   └── twitter-embed/      # Twitter embed endpoint
│   ├── archive-instagram/      # Instagram archive page
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page (Twitter archive)
├── components/                 # React components
│   ├── archive-tool.tsx        # Twitter archive component
│   ├── archive-instagram-tool.tsx
│   ├── site-header.tsx         # Header component
│   ├── tabs/                   # Export format tabs
│   └── ui/                     # shadcn/ui components
├── lib/                        # Utility libraries
│   ├── archive/                # Archive processing logic
│   │   ├── parser.ts           # Twitter CDX parser
│   │   ├── parser-instagram.ts # Instagram CDX parser
│   │   ├── service.ts          # Twitter service
│   │   ├── service-instagram.ts
│   │   ├── exporter.ts         # Export functionality
│   │   └── types.ts            # TypeScript types
│   └── utils.ts                # General utilities
└── public/                     # Static assets
```

## 🤝 Contributing

Contributions are welcome! Whether it's bug reports, feature requests, or code contributions, please feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing code style and conventions
- Use Yarn for dependency management
- Test your changes thoroughly before submitting
- Update documentation as needed

## 📄 License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0) - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Internet Archive](https://archive.org/) for providing the Wayback Machine CDX API
- [Vercel](https://vercel.com) for hosting infrastructure
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- All contributors and users of Xarchive

## 📧 Contact & Support

- **Website**: [xarchive.net](https://xarchive.net)
- **Issues**: [GitHub Issues](https://github.com/yourusername/xarchive/issues)

---

Made with ❤️ for archival and data preservation
