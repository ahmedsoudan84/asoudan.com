'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, CreditCard, Apple, Smartphone, Lock } from 'lucide-react'
import { useCart } from '@/components/cart-context'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    postcode: '',
    card: ''
  })

  const steps = ['Delivery', 'Payment', 'Review']

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-surface px-4 py-4 border-b border-border flex items-center gap-4"
      >
        <button onClick={() => window.history.back()}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl font-serif font-bold">Checkout</h1>
          <div className="flex gap-2">
            {steps.map((s, i) => (
              <span
                key={s}
                className={`text-xs ${i + 1 === step ? 'text-primary font-medium' : 'text-text/40'}`}
              >
                {s}{i < steps.length - 1 && ' → '}
              </span>
            ))}
          </div>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="delivery"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4 space-y-4"
          >
            <h2 className="font-serif font-bold text-lg">Delivery Information</h2>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-4 rounded-xl border border-border"
              />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-4 rounded-xl border border-border"
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-4 rounded-xl border border-border"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full p-4 rounded-xl border border-border"
                />
                <input
                  type="text"
                  placeholder="Postcode"
                  value={formData.postcode}
                  onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  className="w-full p-4 rounded-xl border border-border"
                />
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(2)}
              className="w-full bg-primary text-white py-4 rounded-2xl font-medium mt-4"
            >
              Continue to Payment
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4 space-y-4"
          >
            <h2 className="font-serif font-bold text-lg">Payment Method</h2>
            
            <div className="space-y-3">
              <button className="w-full p-4 rounded-xl border-2 border-primary bg-primary/5 flex items-center gap-3">
                <Apple className="w-6 h-6" />
                <span className="font-medium">Apple Pay</span>
              </button>
              <button className="w-full p-4 rounded-xl border border-border flex items-center gap-3">
                <CreditCard className="w-6 h-6" />
                <span>Card Payment</span>
              </button>
              <button className="w-full p-4 rounded-xl border border-border flex items-center gap-3">
                <Smartphone className="w-6 h-6" />
                <span>Google Pay</span>
              </button>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 text-sm text-text/60 mb-4">
                <Lock className="w-4 h-4" />
                <span>Secure checkout - SSL encrypted</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(3)}
                className="w-full bg-primary text-white py-4 rounded-2xl font-medium"
              >
                Review Order
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4 space-y-4"
          >
            <h2 className="font-serif font-bold text-lg">Order Review</h2>
            
            <div className="bg-surface rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Secure Order</span>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="text-text/60">Email:</span> {formData.email}</p>
                <p><span className="text-text/60">Shipping to:</span> {formData.address}, {formData.city}</p>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => alert('Order placed successfully!')}
              className="w-full bg-primary text-white py-4 rounded-2xl font-medium"
            >
              Place Order
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}