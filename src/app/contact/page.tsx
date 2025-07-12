"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import styles from "@/styles/Contact.module.css"

// Since shadcn/ui components were provided in the original code,
// we'll create simple mock components to match the plain CSS styling.
// In a real project, you would import these from "@/components/ui".

const Button = ({ children, className, ...props }: React.ComponentPropsWithoutRef<"button">) => (
  <button className={`${styles.button} ${className}`} {...props}>
    {children}
  </button>
)

const Input = ({ className, ...props }: React.ComponentPropsWithoutRef<"input">) => (
  <input className={`${styles.input} ${className}`} {...props} />
)

const Textarea = ({ className, ...props }: React.ComponentPropsWithoutRef<"textarea">) => (
  <textarea className={`${styles.textarea} ${className}`} {...props} />
)

const Card = ({ children, className, ...props }: React.ComponentPropsWithoutRef<"div">) => (
  <div className={`${styles.card} ${className}`} {...props}>
    {children}
  </div>
)

const CardHeader = ({ children, className, ...props }: React.ComponentPropsWithoutRef<"div">) => (
  <div className={`${styles.cardHeader} ${className}`} {...props}>
    {children}
  </div>
)

const CardTitle = ({ children, className, ...props }: React.ComponentPropsWithoutRef<"h2">) => (
  <h2 className={`${styles.cardTitle} ${className}`} {...props}>
    {children}
  </h2>
)

const CardContent = ({ children, className, ...props }: React.ComponentPropsWithoutRef<"div">) => (
  <div className={`${styles.cardContent} ${className}`} {...props}>
    {children}
  </div>
)

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 1500) // Increased timeout for better animation visibility
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Bizimlə Əlaqə
      </motion.h1>
      <motion.div
        className={styles.content}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.div className={styles.info} variants={itemVariants}>
          <Card className={styles.infoCard}>
            <CardHeader>
              <CardTitle>Əlaqə Məlumatları</CardTitle>
            </CardHeader>
            <CardContent className={styles.contactInfo}>
              <motion.div className={styles.contactItem} variants={itemVariants}>
                <Mail className={styles.icon} />
                <div>
                  <h4>Email</h4>
                  <p>info@techstore.az</p>
                </div>
              </motion.div>
              <motion.div className={styles.contactItem} variants={itemVariants}>
                <Phone className={styles.icon} />
                <div>
                  <h4>Telefon</h4>
                  <p>+994 12 345 67 89</p>
                </div>
              </motion.div>
              <motion.div className={styles.contactItem} variants={itemVariants}>
                <MapPin className={styles.icon} />
                <div>
                  <h4>Ünvan</h4>
                  <p>Bakı, Azərbaycan</p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div className={styles.formCard} variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Mesaj Göndərin</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <motion.div
                  className={styles.success}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3>Təşəkkür edirik!</h3>
                  <p>Mesajınız uğurla göndərildi. Tezliklə sizinlə əlaqə saxlayacağıq.</p>
                  <Button onClick={() => setSubmitted(false)}>Yeni mesaj göndər</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <motion.div className={styles.field} variants={itemVariants}>
                    <label htmlFor="name">Ad Soyad</label>
                    <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </motion.div>
                  <motion.div className={styles.field} variants={itemVariants}>
                    <label htmlFor="email">Email</label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{border: "1px solid var(--border-color) !important"}}
                    />
                  </motion.div>
                  <motion.div className={styles.field} variants={itemVariants}>
                    <label htmlFor="subject">Mövzu</label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>
                  <motion.div className={styles.field} variants={itemVariants}>
                    <label htmlFor="message">Mesaj</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Button type="submit" disabled={loading} className={styles.submitButton}>
                      {loading ? "Göndərilir..." : "Mesaj Göndər"}
                    </Button>
                  </motion.div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
