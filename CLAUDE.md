# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Personal blog/portfolio built with Astro, React, and TailwindCSS. Features blog posts, logs, diary entries, and resume sections.

## Build & Development Commands
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Check for linting/formatting
npx prettier --check .

# Format code
npx prettier --write .
```

## Architecture & Key Concepts

### Layout System
- **Base Layout** (`src/layouts/Layout.astro`): Meta tags, site-wide HTML structure, Korean language defaults
- **Blog Layout** (`src/layouts/BlogLayout.astro`): Header/Footer wrapper with main content area
- **Page Layout** (`src/components/Layout/PageLayout.tsx`): Reusable page template with title/description

### Content Collections System
Content is managed through Astro's content collections (`src/content.config.ts`):
- **posts**: Blog posts in `src/content/posts/YYYY/MM/slug/`
- **logs**: Development logs in `src/content/logs/YYYY/MM/slug/`
- **diary**: Personal diary entries in `src/content/diary/`

All collections use identical schema: `title`, `pubDate`, `updatedDate` (optional)

### Component Architecture
- **Atomic Design**: Components organized by complexity level
- **Container System**: Nested container components (`Container` > `ContainerOuter` > `ContainerInner`)
- **Utility Functions**: `cn()` utility in `src/lib/cn.ts` for conditional className merging

### Styling System
- **TailwindCSS 4.x**: Uses new CSS-first approach with `@import "tailwindcss"`
- **Custom Theme**: Korean font (`Spoqa Han Sans Neo`) defined in `src/styles/global.css`
- **Typography Plugin**: `@tailwindcss/typography` for markdown content

### Custom Markdown Features
- **Wiki-style Image Syntax**: Custom image insertion using `![[path|caption|size]]` format
  - `![[path]]` - Basic image
  - `![[path|caption]]` - Image with caption (creates figure/figcaption)
  - `![[path|size]]` - Image with width sizing (e.g., `400` sets width=400px, height auto-adjusts)
  - `![[path|caption|size]]` - Image with both caption and sizing
  - All images are automatically centered via CSS
  - Implemented via remark (`src/plugins/remark-wiki-images.js`) and rehype (`src/plugins/rehype-image-caption.js`) plugins

### Page Routing
- **Dynamic Routes**: Collection-based routing using `[...id].astro` and `[...page].astro` patterns
- **Pagination**: Built-in pagination for posts, logs, and diary sections
- **Client Transitions**: Astro's `ClientRouter` for SPA-like navigation

## Technology Stack
- **Framework**: Astro 5.7.12 with React integration
- **UI Library**: React 19.1.0 with TypeScript
- **Styling**: TailwindCSS 4.1.4 (CSS-first approach)
- **Content**: MDX with frontmatter and content collections
- **Components**: Headless UI, Heroicons
- **Code Highlighting**: Expressive Code with Dracula theme

## Development Patterns
- Path alias `@` points to `src/` directory
- Korean language site (`lang="ko"`) with internationalization support
- Client-side hydration using `client:load` directive for interactive components
- Consistent date handling through `z.date()` schema validation

## Quality Assurance
- **Formatting**: Prettier with Astro and TailwindCSS plugins
- **Build Validation**: `npm run build` for production readiness
- **Preview Testing**: `npm run preview` for deployment simulation

## Deployment
Static site deployment to GitHub Pages. Site URL: `https://whitepaek.com`