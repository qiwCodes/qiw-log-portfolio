# qiw.log Portfolio

This repository is the codebase for my personal portfolio website, not a single project landing page.

Live site: [portfolio-beige-three-71.vercel.app](https://portfolio-beige-three-71.vercel.app)

## Overview

`qiw.log` is a design-forward portfolio built with Next.js 16 and React 19. The site presents my profile, selected work, and supporting project pages in a cinematic, motion-heavy visual system while keeping the production setup simple enough to maintain.

## What the Site Includes

- Immersive homepage with animated sections and project highlights
- Individual case-study pages for selected projects
- Portfolio-focused metadata, sitemap, and robots configuration
- Production deployment on Vercel
- GitHub Actions workflow that deploys automatically on push to `main`

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- GSAP

## Project Structure

- `src/app` - App Router pages, metadata routes, and route handlers
- `src/components` - UI components and motion-driven sections
- `src/data` - Site-level content and project data
- `.github/workflows` - GitHub Actions deployment workflow

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production Checks

```bash
npm run lint
npm run build
npm run start
```

## Deployment

- Production hosting: Vercel
- Auto deploy: GitHub Actions on push to `main`

## Notes

- `/ai-workspace` exists as an internal/experimental page and is excluded from indexing.
- Project content is managed from `src/data/projects.ts`.
