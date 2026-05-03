'use client'

import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import { useCart } from '@/components/cart-context'

type Product = {
  id: string
  name: string
  price: number
  image: string
  rating: number
  reviews: number
  aiScore?: number
}

export function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity: 1 } })
  }

  return (
    <div className="group cursor-pointer">
      <Link href={`/product/${product.id}`}>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border">
          <div className="aspect-square relative overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-3">
            <h3 className="font-medium line-clamp-2 mb-1">{product.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">£{product.price}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}