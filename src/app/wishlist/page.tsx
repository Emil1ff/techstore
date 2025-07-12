"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/redux/store"
import { clearWishlist } from "@/redux/slices/wishlistSlice"
import type { Product } from "@/types"
import ProductCard from "@/components/ProductCard"
import { Heart } from 'lucide-react'
import Link from "next/link"
import ProtectedRoute from "@/components/ProtectedRoute"
import styles from "@/styles/Wishlist.module.css"

export default function WishlistPage() {
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Məhsulları yükləyərkən xəta:", err))
  }, [])

  const wishlistProducts = products.filter((product) => wishlistItems.includes(product.id))
  const totalValue = wishlistProducts.reduce((sum, product) => sum + product.price, 0)

  const handleClearAll = () => {
    dispatch(clearWishlist())
  }

  return (
    <ProtectedRoute>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>Bəyəndiklərim</h1>

        {wishlistProducts.length === 0 ? (
          <div className={styles.empty}>
            <Heart className={styles.emptyIcon} />
            <p>Bəyəndikləriniz siyahısı boşdur</p>
            <Link href="/" className={styles.exploreButton}>
              Məhsullara bax
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.statsBar}>
              <div className={styles.statsItem}>
                <span className={styles.statsNumber}>{wishlistProducts.length}</span>
                <span className={styles.statsLabel}>Məhsul</span>
              </div>
              <div className={styles.statsItem}>
                <span className={styles.statsNumber}>${totalValue.toFixed(0)}</span>
                <span className={styles.statsLabel}>Ümumi dəyər</span>
              </div>
              <button className={styles.clearAllButton} onClick={handleClearAll}>
                Hamısını sil
              </button>
            </div>

            <div className={styles.productGrid}>
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </motion.div>
    </ProtectedRoute>
  )
}
