"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/redux/store"
import { logout } from "@/redux/slices/authSlice"
import { setThemeMode } from "@/redux/slices/themeSlice"
import { ShoppingCart, Heart, User, Sun, Moon, Monitor } from "lucide-react"
import styles from "@/styles/Navbar.module.css"

export default function Navbar() {
  const { user, isAuthenticated } = useAuth()
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items)
  const { mode, currentTheme } = useSelector((state: RootState) => state.theme)

  const handleLogout = () => {
    dispatch(logout())
  }

  const toggleTheme = () => {
    const modes: ("light" | "dark" | "system")[] = ["light", "dark", "system"]
    const currentIndex = modes.indexOf(mode)
    const nextMode = modes[(currentIndex + 1) % modes.length]
    dispatch(setThemeMode(nextMode))
  }

  const getThemeIcon = () => {
    if (mode === "system") return <Monitor className={styles.icon} />
    if (currentTheme === "dark") return <Moon className={styles.icon} />
    return <Sun className={styles.icon} />
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          TechStore
        </Link>

        <div className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Ana Səhifə
          </Link>
          <Link href="/contact" className={styles.navLink}>
            Əlaqə
          </Link>
        </div>

        <div className={styles.actions}>
          <button className={styles.themeButton} onClick={toggleTheme} title={`Tema: ${mode}`}>
            {getThemeIcon()}
          </button>

          {isAuthenticated ? (
            <>
              <Link href="/wishlist" className={styles.iconButton} title="Bəyəndiklərim">
                <Heart className={styles.icon} />
                {wishlistItems.length > 0 && <span className={styles.badge}>{wishlistItems.length}</span>}
              </Link>

              <Link href="/cart" className={styles.iconButton} title="Səbət">
                <ShoppingCart className={styles.icon} />
                {cartItems.length > 0 && <span className={styles.badge}>{cartItems.length}</span>}
              </Link>

              <Link href="/profile" className={styles.iconButton} title="Profil">
                <User className={styles.icon} />
              </Link>

              <div className={styles.userName} title="İstifadəçi">
                {user?.name} {user?.surname}
              </div>

              <button className={styles.logoutButton} onClick={handleLogout} title="Çıxış">
                Çıxış
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={`${styles.authButton} ${styles.loginButton}`}>
                Giriş
              </Link>
              <Link href="/register" className={`${styles.authButton} ${styles.registerButton}`}>
                Qeydiyyat
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
