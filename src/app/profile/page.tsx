"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/redux/store"
import { updateUser } from "@/redux/slices/authSlice"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Mail, Camera } from 'lucide-react'
import ProtectedRoute from "@/components/ProtectedRoute"
import styles from "@/styles/Profile.module.css"

export default function ProfilePage() {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    surname: user?.surname || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setMessage("")

    try {
      await dispatch(updateUser({ ...formData, id: user.id }) as any).unwrap()
      setMessage("Profil uğurla yeniləndi")
    } catch (err) {
      setMessage("Yeniləmə zamanı xəta baş verdi")
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
    <ProtectedRoute>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={styles.card}>
          <CardHeader className={styles.header}>
            <h1 className={styles.title}>👤 Profil</h1>
            <p className={styles.subtitle}>Şəxsi məlumatlarınızı idarə edin</p>
          </CardHeader>
          <CardContent>
            <div className={styles.avatarSection}>
              <div className={styles.avatarContainer}>
                {/* <Avatar className={styles.avatar}>
                  <AvatarImage src={formData.avatar} />
                  <AvatarFallback>
                    {formData.name.charAt(0)}
                    {formData.surname.charAt(0)}
                  </AvatarFallback>
                </Avatar> */}
                <div className={styles.avatarBadge}></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {message && (
                <div className={`${styles.message} ${message.includes("uğurla") ? styles.success : styles.error}`}>
                  {message.includes("uğurla") ? "✅" : "❌"} {message}
                </div>
              )}

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
                  <Camera size={16} /> Şəkil URL
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
                {loading ? "🔄 Yenilənir..." : "💾 Profili yenilə"}
              </button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </ProtectedRoute>
  )
}
