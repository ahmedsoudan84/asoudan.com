'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/components/cart-context'

export default function CartPage() {
  const { state, updateQuantity, removeItem } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="w-16 h-16 text-text/20 mx-auto mb-4" />
          <h2 className="text-xl font-serif font-bold mb-2">Your cart is empty</h2>
          <p className="text-text/60 mb-6">Add items to get started</p>
          <Link href="/shop">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-white px-6 py-3 rounded-xl font-medium"
            >
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-surface px-4 py-4 border-b border-border"
      >
        <h1 className="text-2xl font-serif font-bold">Shopping Cart</h1>
        <p className="text-text/60">{state.items.length} items</p>
      </motion.header>

      <div className="p-4 space-y-4">
        {state.items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex gap-3 bg-surface rounded-2xl p-3 border border-border"
          >
            <div className="w-20 h-20 bg-background rounded-xl overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              {item.variant && (
                <p className="text-sm text-text/60">{item.variant}</p>
              )}
              <p className="text-primary font-bold">£{item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="p-1 rounded-lg bg-background"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <span className="w-8 text-center">{item.quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-lg bg-background"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeItem(item.id)}
                  className="ml-auto p-1 text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>£{state.total}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free over £75</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
            <span>Total</span>
            <span>£{state.total}</span>
          </div>
        </div>

        <Link href="/checkout">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2"
          >
            Proceed to Checkout
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
      </div>
    </div>
  )
}