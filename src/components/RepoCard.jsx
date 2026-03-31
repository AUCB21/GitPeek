import styles from './RepoCard.module.css'

const LANG_COLORS = {
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  Python:     '#3572A5',
  CSS:        '#563D7C',
  HTML:       '#E34C26',
  Java:       '#B07219',
  Go:         '#00ADD8',
  Rust:       '#DEA584',
  Ruby:       '#701516',
  'C++':      '#F34B7D',
}

function formatRelativeDate(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Updated today'
  if (diffDays === 1) return 'Updated yesterday'
  if (diffDays < 30) return `Updated ${diffDays} days ago`

  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths < 12) return `Updated ${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`

  const diffYears = Math.floor(diffDays / 365)
  return `Updated ${diffYears} year${diffYears > 1 ? 's' : ''} ago`
}

function normalizeUrl(url) {
  if (!url) return null
  return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`
}

function getHomepageLabel(url) {
  try {
    const normalized = url.startsWith('http') ? url : `https://${url}`
    return new URL(normalized).hostname.replace(/^www\./, '')
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, '')
  }
}

export default function RepoCard({ repo }) {
  const dotColor = LANG_COLORS[repo.language] || '#8B949E'
  const homepageUrl = normalizeUrl(repo.homepage)

  return (
    // Card is a div so the homepage <a> inside doesn't create invalid nested <a> tags.
    // The name link uses a CSS stretched ::after to make the whole card feel clickable.
    <div className={styles.card}>
      <a
        className={styles.name}
        href={repo.html_url}
        target="_blank"
        rel="noreferrer noopener"
        title={repo.name}
      >
        {repo.name}
      </a>

      {repo.description && (
        <p className={styles.description}>{repo.description}</p>
      )}

      <div className={styles.footer}>
        {repo.language && (
          <span className={styles.language}>
            <span
              className={styles.langDot}
              style={{ background: dotColor }}
              aria-hidden="true"
            />
            {repo.language}
          </span>
        )}
        <span className={styles.stars} aria-label={`${repo.stargazers_count} stars`}>
          ★ {repo.stargazers_count.toLocaleString()}
        </span>
        <span className={styles.updated}>
          {formatRelativeDate(repo.updated_at)}
        </span>
        {homepageUrl && (
          <a
            className={styles.homepage}
            href={homepageUrl}
            target="_blank"
            rel="noreferrer noopener"
            title={homepageUrl}
          >
            🌐 {getHomepageLabel(repo.homepage)}
          </a>
        )}
      </div>
    </div>
  )
}
