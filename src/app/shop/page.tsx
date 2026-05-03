'use client'

import { useState, useMemo } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { CategoryFilter } from '@/components/category-filter'
import { CartButton } from '@/components/cart-context'
import { products, categories } from '@/data/products'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')

  const filteredProducts = useMemo(() => {
    let result = products
    if (selectedCategory !== 'all') result = result.filter(p => p.category === selectedCategory)
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    switch (sortBy) {
      case 'price-low': return [...result].sort((a, b) => a.price - b.price)
      case 'price-high': return [...result].sort((a, b) => b.price - a.price)
      default: return result
    }
  }, [selectedCategory, searchQuery, sortBy])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-white z-30 px-4 py-3 border-b">
        <h1 className="text-2xl font-serif font-bold mb-3">Curated Collection</h1>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl"
          />
        </div>
        <CategoryFilter categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
      </header>
      <div className="p-4 grid grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <CartButton />
    </div>
  )
}