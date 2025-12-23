# VitePress Documentation Site

This documentation website is built using [VitePress](https://vitepress.dev/), a modern static site generator built with Vue and Vite.

## Prerequisites

- Node.js 18.0.0 or higher
- pnpm 9.0.0 or higher

## Installation

```bash
# Install dependencies
pnpm i
```

or

```bash
pnpm i --frozen-lockfile
```

## Local Development

```bash
# Start the development server
pnpm run dev
```

This command starts a local development server at `http://localhost:5173`. Most changes are reflected live without having to restart the server.

## Build

```bash
# Build for production
pnpm run build
```

This command generates static content into the `.vitepress/dist` directory, which can be served using any static site hosting service.

## Preview Production Build

```bash
# Preview the production build locally
pnpm run preview
```

## Deployment

### GitHub Pages

1. Update the `base` and other necessary configurations in `.vitepress/config.js`
2. Build the site:
   ```bash
   pnpm run build
   ```
3. Deploy to GitHub Pages using the `gh-pages` branch:
   ```bash
   npx gh-pages -d .vitepress/dist
   ```

### Netlify/Vercel

Both Netlify and Vercel support VitePress out of the box. You can connect your repository and configure the build command as `pnpm run build` with the publish directory set to `.vitepress/dist`.
