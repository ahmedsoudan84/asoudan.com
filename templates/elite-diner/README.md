# Elite Diner - Premium Restaurant Template

A high-end, AI-powered restaurant website template built with Next.js 15.

## Features

- **AI Menu Recommender** - Natural language dish suggestions
- **Smart Dietary Search** - Semantic search understanding
- **AI Chatbot** - Floating assistant for menu questions
- **Online Ordering** - Full cart system with localStorage
- **Table Booking** - Reservation system with Calendly integration
- **100% Client-Side AI** - No API keys required

## Getting Started

```bash
cd templates/elite-diner
npm install
npm run dev
```

Then visit http://localhost:3000

## Pages

- `/` - Home with hero, AI recommender, featured dishes
- `/menu` - Filterable menu with AI search
- `/order` - Cart and checkout
- `/book` - Table reservations
- `/ai-tools` - AI features demo
- `/about` - Restaurant story
- `/contact` - Contact form

## Customize

1. Edit `src/lib/data/menu.json` or `src/lib/data/menu.ts` for menu items
2. Update colours in `tailwind.config.js`
3. Change branding in `src/app/layout.tsx`

## Deployment

```bash
npm run build
# Deploy .next folder to Vercel
```

## Structure

```
elite-diner/
├── src/
│   ├── app/          # Pages (App Router)
│   ├── components/   # UI, layout, AI components
│   └── lib/         # Utilities, cart store, menu data
├── data/            # Static data (optional)
├── public/          # Static assets
├── package.json
└── README.md
```

## License

One-time purchase template for asoudan.com clients.