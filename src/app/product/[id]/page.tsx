'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Star, Heart, Share2, Minus, Plus, ShoppingCart } from 'lucide-react'
import { products } from '@/data/products'
import { useCart } from '@/components/cart-context'

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { addItem, state } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState('')

  const product = products.find(p => p.id === params.id)
  if (!product) return null

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      variant: selectedVariant || product.variants?.[0]
    })
  }

  const relatedProducts = products.filter(p => 
    product.bundleWith?.includes(p.id)
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sticky top-0 bg-surface/80 backdrop-blur-sm z-30 flex items-center justify-between px-4 py-3 border-b border-border"
      >
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl hover:bg-background"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
          <button className="p-2 rounded-xl hover:bg-background">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-xl hover:bg-background">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </motion.header>

      {/* Product Images */}
      <div className="relative aspect-square bg-surface">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.aiScore && (
          <div className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
            AI Recommended {product.aiScore}%
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-2xl font-serif font-bold text-text flex-1">{product.name}</h1>
          <span className="text-2xl font-bold text-primary">£{product.price}</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-border'}`}
              />
            ))}
          </div>
          <span className="text-sm text-text/60">({product.reviews} reviews)</span>
        </div>

        <p className="text-text/80 mb-4">{product.description}</p>

        {/* Variants */}
        {product.variants && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Options</h3>
            <div className="flex gap-2">
              {product.variants.map(v => (
                <motion.button
                  key={v}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-4 py-2 rounded-xl border text-sm ${
                    selectedVariant === v || (!selectedVariant && v === product.variants?.[0])
                      ? 'bg-primary text-white border-primary'
                      : 'border-border hover:bg-background'
                  }`}
                >
                  {v}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        {product.features && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Key Features</h3>
            <ul className="space-y-1">
              {product.features.map((f, i) => (
                <li key={i} className="text-sm text-text/70 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-medium">Quantity</span>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 rounded-lg border border-border"
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 rounded-lg border border-border"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Add to Cart */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="w-full bg-primary text-white py-4 rounded-2xl font-medium text-lg flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart · £{product.price * quantity}
        </motion.button>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="p-4 border-t border-border">
          <h3 className="font-serif font-bold text-lg mb-3">Complete the Look</h3>
          <div className="grid grid-cols-2 gap-3">
            {relatedProducts.map(p => (
              <motion.div
                key={p.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(`/product/${p.id}`)}
                className="cursor-pointer"
              >
                <div className="aspect-square relative rounded-xl overflow-hidden mb-2">
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                </div>
                <h4 className="text-sm font-medium line-clamp-1">{p.name}</h4>
                <span className="text-primary font-bold">£{p.price}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}