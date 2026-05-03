'use client'

import Link from 'next/link'
import { ShoppingBag, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center p-4">
        <div className="inline-block p-4 bg-primary/10 rounded-2xl mb-6">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-serif font-bold mb-4">Kurator Mobile</h1>
        <p className="text-gray-600 mb-8">AI-powered e-commerce template</p>
        <Link href="/shop">
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-medium">
            Enter Shop
          </button>
        </Link>
      </div>
    </div>
  )
}