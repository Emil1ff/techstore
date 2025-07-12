"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { loginUser } from "@/redux/slices/authSlice"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Mail, Lock } from 'lucide-react'
import Link from "next/link"
import styles from "@/styles/Auth.module.css"

export default function LoginPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await dispatch(loginUser(formData) as any).unwrap()
      router.push("/")
    } catch (err) {
      setError("Giriş məlumatları yanlışdır")
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
          <h1 className={styles.title}>🔐 Giriş</h1>
          <p className={styles.subtitle}>Hesabınıza daxil olun</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <div className={styles.error}>
                ❌ {error}
              </div>
            )}

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

            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? "🔄 Giriş edilir..." : "🚀 Giriş et"}
            </button>
          </form>
        </CardContent>

        <div className={styles.link}>
          Hesabınız yoxdur?{" "}
          <Link href="/register">
            Qeydiyyatdan keçin
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}
