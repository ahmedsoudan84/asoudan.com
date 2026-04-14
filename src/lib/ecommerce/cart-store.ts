"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/ecommerce/products";

export interface CartLine {
  slug: string;
  name: string;
  price: number;
  image: string;
  colour: string;
  quantity: number;
}

interface CartState {
  items: CartLine[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.slug === product.slug);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.slug === product.slug
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [
              ...state.items,
              {
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
                colour: product.colour,
                quantity,
              },
            ],
            isOpen: true,
          };
        }),

      removeItem: (slug) =>
        set((state) => ({
          items: state.items.filter((i) => i.slug !== slug),
        })),

      updateQuantity: (slug, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.slug !== slug) };
          }
          return {
            items: state.items.map((i) =>
              i.slug === slug ? { ...i, quantity } : i
            ),
          };
        }),

      clear: () => set({ items: [] }),

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "ecommerce-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
