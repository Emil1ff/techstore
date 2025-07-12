import styles from "@/styles/Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>TechStore</h3>
            <p>Modern texnologiya məhsulları</p>
          </div>

          <div className={styles.section}>
            <h4>Kateqoriyalar</h4>
            <ul>
              <li>Kompüterlər</li>
              <li>Aksesuarlar</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Əlaqə</h4>
            <p>info@techstore.az</p>
            <p>+994 12 345 67 89</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2024 TechStore. Bütün hüquqlar qorunur.</p>
        </div>
      </div>
    </footer>
  )
}
