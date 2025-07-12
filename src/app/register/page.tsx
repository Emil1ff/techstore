"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { registerUser } from "@/redux/slices/authSlice"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { User, Mail, Lock, Camera } from "lucide-react"
import Link from "next/link"
import styles from "@/styles/Auth.module.css"

export default function RegisterPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    avatar: "",
    wishlist: [],
    cart: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await dispatch(registerUser(formData) as any).unwrap()
      router.push("/")
    } catch (err) {
      setError("Qeydiyyat zamanı xəta baş verdi")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={styles.card}>
        <CardHeader className={styles.header}>
          <h1 className={styles.title}>📝 Qeydiyyat</h1>
          <p className={styles.subtitle}>Yeni hesab yaradın</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.error}>❌ {error}</div>}

            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <label>
                  <User size={16} /> Ad
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Adınızı daxil edin"
                  required
                />
              </div>

              <div className={styles.field}>
                <label>
                  <User size={16} /> Soyad
                </label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Soyadınızı daxil edin"
                  required
                />
              </div>
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label>
                <Mail size={16} /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email ünvanınızı daxil edin"
                required
              />
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label>
                <Lock size={16} /> Şifrə
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Şifrənizi daxil edin"
                required
              />
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label>
                <Camera size={16} /> Şəkil URL (ixtiyari)
              </label>
              <input
                type="url"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="Profil şəklinizin linkini daxil edin"
              />
            </div>

            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? "🔄 Qeydiyyat edilir..." : "🎉 Qeydiyyatdan keç"}
            </button>
          </form>
        </CardContent>

        <div className={styles.link}>
          Artıq hesabınız var? <Link href="/login">Giriş edin</Link>
        </div>
      </Card>
    </motion.div>
  )
}
