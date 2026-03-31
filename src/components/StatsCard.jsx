import styles from './StatsCard.module.css'

export default function StatsCard({ icon, label, value }) {
  return (
    <div className={styles.card}>
      {icon && (
        <div className={styles.iconBox} aria-hidden="true">
          {icon}
        </div>
      )}
      <div className={styles.text}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  )
}
