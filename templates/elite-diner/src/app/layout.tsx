import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AIChatWidget } from '@/components/ai/chat-widget';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Elite Diner | Premium Fine Dining in London',
  description: 'Experience fine dining redefined at Elite Diner. AI-powered recommendations, premium ingredients, exceptional service.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <AIChatWidget />
      </body>
    </html>
  );
}