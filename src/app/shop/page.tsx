'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ChevronDown } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { CategoryFilter } from '@/components/category-filter'
import { CartButton } from '@/components/cart-context'
import { products, categories } from '@/data/products'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [showSort, setShowSort] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = products

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    switch (sortBy) {
      case 'price-low':
        return [...result].sort((a, b) => a.price - b.price)
      case 'price-high':
        return [...result].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...result].sort((a, b) => b.rating - a.rating)
      case 'ai-score':
        return [...result].sort((a, b) => (b.aiScore ?? 0) - (a.aiScore ?? 0))
      default:
        return result
    }
  }, [selectedCategory, searchQuery, sortBy])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 bg-surface/80 backdrop-blur-sm z-30 px-4 py-3 border-b border-border"
      >
        <h1 className="text-2xl font-serif font-bold text-text mb-3">Curated Collection</h1>
        
        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </motion.header>

      {/* Sort Options */}
      <div className="px-4 py-2 border-b border-border">
        <button
          onClick={() => setShowSort(!showSort)}
          className="flex items-center gap-2 text-sm text-text/70"
        >
          Sort by: {sortBy === 'featured' ? 'Featured' : sortBy === 'price-low' ? 'Price: Low-High' : sortBy === 'price-high' ? 'Price: High-Low' : sortBy === 'rating' ? 'Top Rated' : 'AI Score'}
          <ChevronDown className={`w-4 h-4 transition-transform ${showSort ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showSort && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 space-y-1"
            >
              {['featured', 'ai-score', 'rating', 'price-low', 'price-high'].map(option => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option)
                    setShowSort(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-background rounded-lg"
                >
                  {option === 'featured' ? 'Featured' : option === 'ai-score' ? 'AI Recommended' : option === 'rating' ? 'Top Rated' : option === 'price-low' ? 'Price: Low-High' : 'Price: High-Low'}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Products Grid */}
      <motion.div
        layout
        className="p-4 grid grid-cols-2 gap-4"
      >
        <AnimatePresence>
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.05 }}
              layout
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <CartButton />
    </div>
  )
}