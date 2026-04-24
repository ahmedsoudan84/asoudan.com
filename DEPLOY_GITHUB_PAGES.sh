#!/bin/bash
# Manual GitHub Pages Deployment Script
# Run this to deploy to GitHub Pages

set -e

echo "Building production..."
npm run build

echo "Preparing public folder..."
rm -rf gh-pages-temp
mkdir -p gh-pages-temp

# Copy .next/server (static HTML) to gh-pages-temp
cp -r .next/server/* gh-pages-temp/

# Copy .next/static to gh-pages-temp/_next
cp -r .next/static gh-pages-temp/_next

# Copy public assets (CNAME, .nojekyll)
cp -r public/* gh-pages-temp/ 2>/dev/null || true

# Ensure .nojekyll exists
touch gh-pages-temp/.nojekyll

# Deploy using git
cd gh-pages-temp
git init
git add -A
git commit -m "Deploy $(date +%Y-%m-%d)"
git push --force git@github.com:ahmedsoudan84/asoudan.com.git master:gh-pages

cd ..
rm -rf gh-pages-temp

echo "Deployment complete!"
