# Kurator Mobile E-Commerce Template

A premium mobile-first e-commerce template with AI-powered features, built with Next.js 15 and Motion animations.

## Features

### Mobile App (Mobile Frame on Desktop)
- **Shop**: Product grid with AI scoring, category filters, smart sorting
- **Product Detail**: Image gallery, variants, quantity selector, related products
- **AI Stylist**: Personalized recommendations based on occasion, budget, style
- **Cart**: Persistent cart with quantity controls
- **Checkout**: 3-step flow with Apple/Google Pay support

### Admin Portal (Desktop View)
- **Dashboard**: Order stats, revenue tracking, quick actions
- **Products**: Manage inventory and bundles
- **Orders**: Track and update order status

### AI-Powered Features
- **AI Score**: Each product has an AI recommendation score
- **Smart Bundles**: AI suggests complementary products
- **AI Stylist**: Personalized gift recommendations
- **Search**: Semantic product discovery

### Design System
- **Style**: Liquid Glass with morphing effects
- **Colors**: Premium dark + gold accents (#2563EB, #F97316)
- **Typography**: Cormorant serif + Montserrat sans
- **Animations**: Micro-interactions via Motion

## Tech Stack
- Next.js 15 (App Router)
- React 19
- Motion (Framer Motion)
- Tailwind CSS 3
- TypeScript

## Project Structure
```
src/
├── app/
│   ├── shop/          # Product listing
│   ├── product/[id]/  # Product detail
│   ├── cart/          # Shopping cart
│   ├── checkout/      # 3-step checkout
│   ├── admin/         # Admin dashboard
│   └── ai-stylist/    # AI recommendations
├── components/
│   ├── cart-context.tsx
│   ├── product-card.tsx
│   └── category-filter.tsx
├── data/
│   └── products.ts
```

## Getting Started
```bash
npm install
npm run dev
```

## Local Development Note
Changes apply locally only - this template runs entirely client-side without API keys.