import './globals.css'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/components/cart-context'
import { MotionConfig } from 'motion/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kurator Mobile - Premium E-Commerce Template',
  description: 'AI-powered mobile e-commerce template with smart features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-background text-text antialiased`}>
        <MotionConfig reducedMotion="user">
          <CartProvider>
            <div className="mx-auto max-w-md bg-background min-h-screen relative lg:max-w-3xl">
              {children}
            </div>
          </CartProvider>
        </MotionConfig>
      </body>
    </html>
  )
}