'use client'

import { motion } from 'framer-motion'
import { Sparkles, ShoppingBag, Heart } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-4 pt-12 pb-8 text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="inline-block p-4 bg-primary/10 rounded-2xl mb-6"
        >
          <Sparkles className="w-8 h-8 text-primary" />
        </motion.div>
        <h1 className="text-3xl font-serif font-bold mb-4">Curated. Considered. Yours.</h1>
        <p className="text-text/70 mb-8 px-4">
          A shop that knows you before you ask. Every product chosen by hand, 
          every recommendation made by on-device AI.
        </p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <Link href="/shop">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white py-4 rounded-2xl font-medium text-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Enter the Shop
            </motion.button>
          </Link>
          <Link href="/ai-stylist">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-surface border border-border text-text py-4 rounded-2xl font-medium text-lg flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Try AI Stylist
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Features */}
      <section className="px-4 py-8">
        <div className="space-y-4">
          {[
            { title: 'AI Recommendations', desc: 'Smart picks based on your preferences' },
            { title: 'Curated Bundles', desc: 'Complete looks designed by AI' },
            { title: 'No Tracking', desc: '100% client-side, your privacy first' }
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface rounded-2xl p-4 border border-border"
            >
              <h3 className="font-serif font-bold">{f.title}</h3>
              <p className="text-sm text-text/60">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}