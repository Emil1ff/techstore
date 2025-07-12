"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
// import Image from "next/image"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/redux/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/redux/slices/wishlistSlice"
import type { RootState } from "@/redux/store"
import type { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, Check } from "lucide-react"
import styles from "@/styles/ProductDetail.module.css"
import { Image } from "@radix-ui/react-avatar"

export default function ProductDetailPage() {
  const params = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const isInWishlist = product ? wishlistItems.includes(product.id) : false

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch("/data/products.json")
        const data = await response.json()
        const foundProduct = data.products.find((p: Product) => p.id === Number.parseInt(params.id as string))
        setProduct(foundProduct || null)
      } catch (err) {
        console.error("Məhsul yükləyərkən xəta:", err)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  if (loading) {
    return <div className={styles.loading}>Məhsul yüklənir...</div>
  }

  if (!product) {
    return (
      <div className={styles.loading}>
        <h2>Məhsul tapılmadı</h2>
        <p>Axtardığınız məhsul mövcud deyil</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, quantity }))
  }

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product.id))
    }
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.productDetail}>
        <div className={styles.imageSection}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={500}
            height={500}
            className={styles.image}
          />
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.price}>${product.price}</div>

          <Card className={styles.featuresCard}>
            <CardContent className={styles.features}>
              <h3>Xüsusiyyətlər:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <Check className={styles.checkIcon} />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className={styles.actions}>
            <div className={styles.quantitySelector}>
              <label>Miqdar:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                className={styles.quantitySelect}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.buttons}>
              <Button onClick={handleAddToCart} className={styles.addToCartButton}>
                <ShoppingCart className={styles.icon} />
                Səbətə əlavə et
              </Button>

              <Button
                variant="outline"
                onClick={handleWishlistToggle}
                className={`${styles.wishlistButton} ${isInWishlist ? styles.active : ""}`}
              >
                <Heart className={styles.icon} />
                {isInWishlist ? "Bəyəndiklərimdən sil" : "Bəyəndiklərimə əlavə et"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
