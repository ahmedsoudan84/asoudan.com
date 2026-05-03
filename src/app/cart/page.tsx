'use client'

import { useCart } from '@/components/cart-context'
import Link from 'next/link'

export default function CartPage() {
  const { state, dispatch } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-serif font-bold mb-2">Your cart is empty</h2>
          <Link href="/shop">
            <button className="bg-primary text-white px-6 py-3 rounded-xl">Continue Shopping</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white px-4 py-4 border-b">
        <h1 className="text-2xl font-serif font-bold">Cart ({state.items.length})</h1>
      </header>
      <div className="p-4 space-y-4">
        {state.items.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-4 border flex items-center gap-3">
            <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-primary font-bold">£{item.price}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t bg-white">
        <p className="text-xl font-bold mb-4">Total: £{state.total}</p>
        <Link href="/checkout">
          <button className="w-full bg-primary text-white py-4 rounded-2xl font-medium">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  )
}