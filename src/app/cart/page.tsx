"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/redux/store"
import { removeFromCart, updateQuantity, clearCart } from "@/redux/slices/cartSlice"
import type { Product } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react'
// import Image from "next/image"
import Link from "next/link"
import ProtectedRoute from "@/components/ProtectedRoute"
import styles from "@/styles/Cart.module.css"
import Image from "next/image"
// import { Image } from "@radix-ui/react-avatar"

export default function CartPage() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Məhsulları yükləyərkən xəta:", err))
  }, [])

  const cartProducts = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.productId)
      return product ? { ...product, quantity: item.quantity } : null
    })
    .filter(Boolean)

  const total = cartProducts.reduce((sum, item) => {
    return sum + item!.price * item!.quantity
  }, 0)

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <ProtectedRoute>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>🛒 Səbət</h1>

        {cartProducts.length === 0 ? (
          <div className={styles.empty}>
            <ShoppingCart className={styles.emptyIcon} />
            <p>Səbətiniz boşdur</p>
            <Link href="/" className={styles.exploreButton}>
              Məhsullara bax
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {cartProducts.map((item) => (
                <Card key={item!.id} className={styles.cartItem}>
                  <CardContent className={styles.itemContent}>
                    <img
                      src={item!.image || "/placeholder.svg"}
                      alt={item!.name}
                      width={100}
                      height={100}
                      className={styles.itemImage}
                    />

                    <div className={styles.itemInfo}>
                      <h3>{item!.name}</h3>
                      <p className={styles.itemPrice}>${item!.price}</p>
                    </div>

                    <div className={styles.quantityControls}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => handleQuantityChange(item!.id, item!.quantity - 1)}
                        disabled={item!.quantity <= 1}
                      >
                        <Minus className={styles.icon} />
                      </button>
                      <span className={styles.quantity}>{item!.quantity}</span>
                      <button
                        className={styles.quantityButton}
                        onClick={() => handleQuantityChange(item!.id, item!.quantity + 1)}
                      >
                        <Plus className={styles.icon} />
                      </button>
                    </div>

                    <div className={styles.itemTotal}>${(item!.price * item!.quantity).toFixed(2)}</div>

                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveItem(item!.id)}
                      title="Məhsulu sil"
                    >
                      <Trash2 className={styles.icon} />
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className={styles.summary}>
              <CardContent className={styles.summaryContent}>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Cəmi:</span>
                  <span className={styles.totalAmount}>${total.toFixed(2)}</span>
                </div>

                <div className={styles.summaryActions}>
                  <button className={styles.clearButton} onClick={handleClearCart}>
                    Səbəti təmizlə
                  </button>
                  <button className={styles.checkoutButton}>Sifarişi tamamla</button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </motion.div>
    </ProtectedRoute>
  )
}
