"use client"

// import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/redux/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/redux/slices/wishlistSlice"
import type { RootState } from "@/redux/store"
import type { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart, ShoppingCart } from 'lucide-react'
import styles from "@/styles/ProductCart.module.css"
import { Image } from "@radix-ui/react-avatar"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const isInWishlist = wishlistItems.includes(product.id)

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id }))
  }

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product.id))
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className={styles.card}>
        <CardContent className={styles.content}>
          <div className={styles.imageContainer}>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className={styles.image}
            />
            <Button
              variant="ghost"
              size="sm"
              className={`${styles.wishlistButton} ${isInWishlist ? styles.active : ""}`}
              onClick={handleWishlistToggle}
            >
              <Heart className={styles.heartIcon} />
            </Button>
          </div>

          <div className={styles.info}>
            <Link href={`/product/${product.id}`} className={styles.title}>
              {product.name}
            </Link>
            <p className={styles.description}>{product.description}</p>
            <div className={styles.price}>${product.price}</div>
          </div>
        </CardContent>

        <CardFooter className={styles.footer}>
          <Button onClick={handleAddToCart} className={styles.addToCartButton}>
            <ShoppingCart className={styles.cartIcon} />
            Səbətə əlavə et
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
