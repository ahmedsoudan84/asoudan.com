'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuItem } from '@/lib/restaurant/menu';

export interface CartItem extends MenuItem { quantity: number }

interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find(i => i.id === item.id);
        if (existing) {
          get().updateQuantity(item.id, existing.quantity + 1);
        } else {
          set(state => ({ items: [...state.items, { ...item, quantity: 1 }] }));
        }
      },
      removeItem: (id) => set(state => ({ items: state.items.filter(i => i.id !== id) })),
      updateQuantity: (id, qty) => {
        if (qty <= 0) { get().removeItem(id); return; }
        set(state => ({ items: state.items.map(i => i.id === id ? { ...i, quantity: qty } : i) }));
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'elite-diner-cart' }
  )
)