"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProductCard from "@/components/ProductCard"
import type { Product } from "@/types"
import { Button } from "@/components/ui/button"
import styles from "@/styles/Home.module.css"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/data/products.json")
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log("Yüklənən məhsullar:", data) // Debug üçün
        
        if (data && data.products && Array.isArray(data.products)) {
          setProducts(data.products)
          setFilteredProducts(data.products)
        } else {
          throw new Error("Məhsul məlumatları düzgün formatda deyil")
        }
      } catch (err) {
        console.error("Məhsulları yükləyərkən xəta:", err)
        setError("Məhsulları yükləyərkən xəta baş verdi")
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const categories = [
    { key: "all", label: "Hamısı" },
    { key: "computers", label: "Kompüterlər" },
    { key: "accessories", label: "Aksesuarlar" },
  ]

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    if (category === "all") {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((product) => product.category === category))
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <h2>Məhsullar yüklənir...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Xəta baş verdi</h2>
          <p>{error}</p>
          <Button onClick={() => window.location.reload()}>
            Yenidən cəhd et
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.heroTitle}>Modern Texnologiya Məhsulları</h1>
        <p className={styles.heroDescription}>Ən yaxşı qiymətlərlə keyfiyyətli kompüter və aksesuarlar</p>
      </motion.section>

      <section className={styles.products}>
        <div className={styles.filters}>
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "outline"}
              onClick={() => handleCategoryFilter(category.key)}
              className={styles.filterButton}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <motion.div
          className={styles.productGrid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className={styles.noProducts}>
              <p>Bu kateqoriyada məhsul tapılmadı</p>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  )
}
