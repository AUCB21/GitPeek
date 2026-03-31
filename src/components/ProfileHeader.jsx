import styles from './ProfileHeader.module.css'

function formatJoinYear(dateStr) {
  return new Date(dateStr).getFullYear()
}

function normalizeBlogUrl(url) {
  if (!url) return null
  return url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `https://${url}`
}

export default function ProfileHeader({ user }) {
  const blogUrl = normalizeBlogUrl(user.blog)

  return (
    <div className={styles.header}>
      <a
        className={styles.avatarLink}
        href={user.html_url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`View ${user.login}'s GitHub profile`}
      >
        <img
          className={styles.avatar}
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          width="96"
          height="96"
        />
      </a>

      <div className={styles.info}>
        <h2 className={styles.name}>
          <a
            className={styles.nameLink}
            href={user.html_url}
            target="_blank"
            rel="noreferrer noopener"
          >
            {user.name || user.login}
          </a>
        </h2>
        <p className={styles.username}>@{user.login}</p>
        {user.bio && <p className={styles.bio}>{user.bio}</p>}
        <div className={styles.meta}>
          {user.location && (
            <span className={styles.metaItem}>
              <span aria-hidden="true">📍</span> {user.location}
            </span>
          )}
          {blogUrl && (
            <a
              className={styles.metaLink}
              href={blogUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span aria-hidden="true">🔗</span> {user.blog}
            </a>
          )}
          <span className={styles.metaItem}>
            {user.followers.toLocaleString()} followers
            {' · '}
            {user.following.toLocaleString()} following
          </span>
          <span className={styles.metaItem}>
            Joined {formatJoinYear(user.created_at)}
          </span>
          <a
            className={styles.githubLink}
            href={user.html_url}
            target="_blank"
            rel="noreferrer noopener"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </div>
  )
}
