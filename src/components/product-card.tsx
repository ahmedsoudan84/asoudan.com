'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
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
  const { addItem } = useCart()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      variant: 'Default'
    })
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative bg-surface rounded-2xl overflow-hidden shadow-sm border border-border/50">
          {/* AI Score Badge */}
          {product.aiScore && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 left-2 z-10 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full"
            >
              AI {product.aiScore}%
            </motion.div>
          )}

          {/* Product Image */}
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickAdd}
              className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ShoppingCart className="w-4 h-4 text-primary" />
            </motion.button>
          </div>

          {/* Product Info */}
          <div className="p-3">
            <h3 className="font-medium text-text line-clamp-2 mb-1">{product.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">£{product.price}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-sm text-text/70">{product.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}