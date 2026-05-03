import './globals.css'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/components/cart-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kurator Mobile - E-Commerce Template',
  description: 'Mobile e-commerce template with AI features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text antialiased`}>
        <CartProvider>
          <div className="mx-auto max-w-md bg-background min-h-screen">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  )
}