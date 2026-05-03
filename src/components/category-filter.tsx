'use client'

import { motion } from 'motion/react'
import { categories } from '@/data/products'

export function CategoryFilter({ 
  selected, 
  onSelect 
}: { 
  categories: typeof categories
  selected: string 
  onSelect: (id: string) => void 
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            selected === category.id
              ? 'bg-primary text-white'
              : 'bg-background border border-border text-text/70 hover:bg-background/80'
          }`}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  )
}