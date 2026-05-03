'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Sparkles, ChevronRight, ShoppingCart } from 'lucide-react'
import { products } from '@/data/products'
import { ProductCard } from '@/components/product-card'

const occasions = [
  'Anniversary',
  'New Job',
  'Birthday',
  'Housewarming',
  'Valentine\'s Day',
  'Christmas',
  'Baby Shower',
  'Retirement'
]

const moods = ['Minimal', 'Luxury', 'Cozy', 'Modern', 'Classic', 'Playful']

export default function AIStylist() {
  const [step, setStep] = useState(1)
  const [occasion, setOccasion] = useState('')
  const [budget, setBudget] = useState('')
  const [mood, setMood] = useState('')
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [reasoning, setReasoning] = useState('')

  const generateRecommendations = () => {
    // AI logic - in real app would call actual AI
    const scored = products.map(p => ({
      ...p,
      score: (p.aiScore ?? 50) + (Math.random() * 20),
      reason: getReason(p, occasion, mood)
    })).sort((a, b) => b.score - a.score).slice(0, 3)
    
    setRecommendations(scored)
    setReasoning(generateReasoning(occasion, mood, budget))
    setStep(3)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block p-4 bg-primary/10 rounded-2xl mb-4"
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-serif font-bold mb-2">AI Stylist</h1>
          <p className="text-text/70">Get personalized recommendations in seconds</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="occasion"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="font-serif font-bold text-lg mb-4">What's the occasion?</h2>
              <div className="grid grid-cols-2 gap-3">
                {occasions.map(o => (
                  <motion.button
                    key={o}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setOccasion(o)
                      setStep(2)
                    }}
                    className="p-4 rounded-xl border-2 border-border text-center hover:border-primary transition-colors"
                  >
                    {o}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="preferences"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button
                onClick={() => setStep(1)}
                className="text-primary text-sm mb-4"
              >
                ← Back
              </button>

              <h2 className="font-serif font-bold text-lg mb-4">
                {occasion} - Any preferences?
              </h2>

              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Budget Range</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-3 rounded-xl border border-border"
                >
                  <option value="">Select budget</option>
                  <option value="50-100">£50-100</option>
                  <option value="100-200">£100-200</option>
                  <option value="200+">£200+</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Style Mood</label>
                <div className="flex flex-wrap gap-2">
                  {moods.map(m => (
                    <motion.button
                      key={m}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setMood(m)}
                      className={`px-4 py-2 rounded-xl border transition-all ${
                        mood === m ? 'bg-primary text-white border-primary' : 'border-border'
                      }`}
                    >
                      {m}
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={generateRecommendations}
                disabled={!budget || !mood}
                className="w-full bg-primary text-white py-4 rounded-2xl font-medium disabled:opacity-50"
              >
                Get Recommendations
              </motion.button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                onClick={() => setStep(1)}
                className="text-primary text-sm mb-4"
              >
                ← Start Over
              </button>

              <div className="bg-primary/5 rounded-2xl p-4 mb-6">
                <h3 className="font-serif font-bold mb-2">Why these picks?</h3>
                <p className="text-sm text-text/80">{reasoning}</p>
              </div>

              <h3 className="font-serif font-bold text-lg mb-3">Your Curated Picks</h3>
              <div className="space-y-4">
                {recommendations.map((p, i) => (
                  <div key={p.id} className="bg-surface rounded-2xl p-4 border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-16 h-16 bg-background rounded-xl overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{p.name}</h4>
                        <p className="text-primary font-bold">£{p.price}</p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-xl bg-primary text-white"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <p className="text-xs text-text/60">{p.reason}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function getReason(product: any, occasion: string, mood: string) {
  const reasons = {
    Anniversary: 'Perfect for celebrating love',
    Birthday: 'A thoughtful gift they\'ll use daily',
    'New Job': 'Professional upgrade for their workspace',
    Housewarming: 'Beautiful addition to any home',
    'Valentine\'s Day': 'Romantic and meaningful',
    Christmas: 'Festive and luxurious'
  }
  return reasons[occasion as keyof typeof reasons] || `Matches ${mood.toLowerCase()} aesthetic`
}

function generateReasoning(occasion: string, mood: string, budget: string) {
  return `Selected ${mood.toLowerCase()} options for ${occasion.toLowerCase()} within your £${budget.replace('-', ' - ')} range. These items share cohesive design language and will arrive together.`
}