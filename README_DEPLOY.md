# Deployment Guide

## GitHub Pages Deployment

This project is configured for automatic GitHub Pages deployment.

### Automatic Deployment (Recommended)

1. Push to the `main` branch
2. GitHub Actions workflow automatically builds and deploys
3. Site is available at: `https://ahmedsoudan84.github.io/asoudan.com/`

### Manual Deployment

```bash
# Install dependencies
npm ci

# Build for production
npm run build

# The .next folder contains the production build
# GitHub Pages will serve from .next/static
```

### Custom Domain Setup

1. Add `CNAME` file in `public/` with: `asoudan.com`
2. Configure DNS:
   - A record: `185.199.108.153`
   - A record: `185.199.109.153`
   - A record: `185.199.110.153`
   - A record: `185.199.111.153`
   - CNAME record: `www` → `ahmedsoudan84.github.io`
3. Enable GitHub Pages in repository settings
4. Select "Deploy from branch" → main → / (root)

## Features

- WebGL Food Reveal (hover effects)
- 360° Property Panorama Viewer
- London Skyline Scroll Parallax
- Aurora Background Effects
- Responsive design
- TypeScript strict mode
- Next.js 16 with Turbopack
