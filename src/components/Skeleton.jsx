import styles from './Skeleton.module.css'

function Block({ className }) {
  return <div className={`${styles.shimmer} ${className}`} aria-hidden="true" />
}

export default function Skeleton() {
  return (
    <div className={styles.wrapper} aria-label="Loading profile..." aria-busy="true">
      {/* Profile header skeleton */}
      <div className={styles.profileCard}>
        <Block className={styles.avatar} />
        <div className={styles.profileLines}>
          <Block className={styles.nameLine} />
          <Block className={styles.usernameLine} />
          <Block className={styles.bioLine} />
          <Block className={styles.bioLineShort} />
        </div>
      </div>

      {/* Content area skeleton */}
      <div className={styles.content}>
        {/* Stats column */}
        <div className={styles.statsCol}>
          <Block className={styles.statCard} />
          <Block className={styles.statCard} />
          <Block className={styles.statCard} />
        </div>

        {/* Repos column */}
        <div className={styles.reposCol}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Block key={i} className={styles.repoCard} />
          ))}
        </div>
      </div>
    </div>
  )
}
