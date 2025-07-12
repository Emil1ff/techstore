"use client"

import type React from "react"

import { motion } from "framer-motion"
import Navbar from "./Navbar"
import Footer from "./Footer"
import styles from "@/styles/Layout.module.css"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <motion.main
        className={styles.main}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}
