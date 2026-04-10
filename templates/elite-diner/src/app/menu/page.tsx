'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { menuItems, categories } from '@/lib/data/menu';
import { useCart } from '@/lib/store/cart-store';

export default function MenuPage() {
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const { addItem } = useCart();
  const filtered = menuItems.filter(item => {
    if (category && item.category !== category) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!item.name.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="container py-8">
      <div className="text-center mb-8"><h1 className="text-4xl font-bold mb-4">Our Menu</h1><p className="text-muted-foreground">Curated dishes with the finest ingredients</p></div>
      
      <div className="bg-muted/30 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-4"><Sparkles className="h-5 w-5 text-primary" /><h2 className="font-semibold">AI Search</h2></div>
        <div className="flex gap-2"><Input placeholder="Describe what you're craving..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1" /><Button><Sparkles className="mr-2 h-4 w-4" />Search</Button></div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Button variant={category === null ? 'default' : 'outline'} onClick={() => setCategory(null)}>All</Button>
        {categories.map(cat => <Button key={cat} variant={category === cat ? 'default' : 'outline'} onClick={() => setCategory(cat)}>{cat}</Button>)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <Card key={item.id} className="overflow-hidden group hover:shadow-lg">
            <div className="relative h-48 overflow-hidden"><Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform" /></div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2"><h3 className="font-semibold text-lg">{item.name}</h3><span className="font-bold text-lg text-primary">£{item.price}</span></div>
              <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
              <div className="flex flex-wrap gap-1 mb-4">{item.dietaryTags.map(tag => <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-muted">{tag}</span>)}</div>
              <Button onClick={() => addItem(item)} className="w-full">Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}