export interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  description: string
  features: string[]
  inStock: boolean
}

export interface User {
  id: string
  name: string
  surname: string
  email: string
  password: string
  avatar?: string
  wishlist: number[]
  cart: CartItem[]
}

export interface CartItem {
  productId: number
  quantity: number
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

export interface CartState {
  items: CartItem[]
  total: number
}

export interface WishlistState {
  items: number[]
}

export interface ThemeState {
  mode: "light" | "dark" | "system"
  currentTheme: "light" | "dark"
}
