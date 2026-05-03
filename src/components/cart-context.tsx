"use client"

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  variant?: string
}

type CartState = {
  items: CartItem[]
  total: number
}

type CartContextType = {
  state: CartState
  dispatch: React.Dispatch<any>
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const cartReducer = (state: CartState, action: any): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existing = state.items.find(item => item.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          total: state.total + action.payload.price * action.payload.quantity
        }
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price * action.payload.quantity
      }
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload)
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0)
      }
    case 'UPDATE_QUANTITY':
      const item = state.items.find(item => item.id === action.payload.id)
      if (!item) return state
      const diff = action.payload.quantity - item.quantity
      return {
        ...state,
        items: state.items.map(i => i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i),
        total: state.total + item.price * diff
      }
    case 'CLEAR_CART':
      return { items: [], total: 0 }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item })
  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const updateQuantity = (id: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return (
    <CartContext.Provider value={{ state, dispatch, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

export function CartButton() {
  const { state } = useCart()
  const router = useRouter()
  if (state.items.length === 0) return null
  return (
    <button
      onClick={() => router.push('/cart')}
      className="fixed bottom-6 right-6 z-40 bg-primary text-white rounded-full p-4 shadow-lg"
    >
      <ShoppingCart className="w-6 h-6" />
      <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
        {state.items.length}
      </span>
    </button>
  )
}