import { useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import ProfileHeader from './components/ProfileHeader.jsx'
import StatsCard from './components/StatsCard.jsx'
import RepoCard from './components/RepoCard.jsx'
import Skeleton from './components/Skeleton.jsx'
import styles from './App.module.css'

function computeTopLanguage(repos) {
  const counts = {}
  for (const repo of repos) {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1
    }
  }
  if (Object.keys(counts).length === 0) return null
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
}

function computeTotalStars(repos) {
  return repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
}

function LandingIllustration() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className={styles.landingIcon}
    >
      <circle cx="40" cy="40" r="38" stroke="#21262D" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="29" cy="36" r="4.5" fill="#21262D" />
      <circle cx="51" cy="36" r="4.5" fill="#21262D" />
      {/* Smile */}
      <path
        d="M 28 50 Q 40 60 52 50"
        stroke="#21262D"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Decorative ear-tentacles (octocat nod) */}
      <path d="M 18 30 Q 13 20 20 14" stroke="#21262D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 62 30 Q 67 20 60 14" stroke="#21262D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export default function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])

  async function handleSearch(username) {
    setLoading(true)
    setError(null)

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=30`),
      ])

      if (userRes.status === 404) {
        setError({ type: 'not_found', username })
        return
      }

      if (userRes.status === 403 || reposRes.status === 403) {
        setError({ type: 'rate_limit' })
        return
      }

      if (!userRes.ok || !reposRes.ok) {
        setError({ type: 'network' })
        return
      }

      const [userData, reposData] = await Promise.all([
        userRes.json(),
        reposRes.json(),
      ])

      setUser(userData)
      setRepos(reposData)
    } catch {
      setError({ type: 'network' })
    } finally {
      setLoading(false)
    }
  }

  const topRepos = repos.slice(0, 10)
  const topLanguage = computeTopLanguage(repos)
  const totalStars = computeTotalStars(repos)
  const showLanding = user === null && !loading && !error

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>GitPeek</h1>
        <p className={styles.subtitle}>Search any developer profile</p>
      </header>

      <main className={styles.main}>
        <SearchBar onSearch={handleSearch} loading={loading} />

        {error && (
          <div className={styles.error} role="alert">
            {error.type === 'not_found' && `No user found for '@${error.username}'`}
            {error.type === 'rate_limit' && 'GitHub API rate limit reached. Try again in a minute.'}
            {error.type === 'network' && 'Something went wrong. Check your connection.'}
          </div>
        )}

        {loading && <Skeleton />}

        {showLanding && (
          <div className={styles.landing}>
            <LandingIllustration />
            <h2 className={styles.landingTitle}>Explore any GitHub profile</h2>
            <p className={styles.landingText}>
              Enter a username above to view their repositories, stars, and language stats.
            </p>
            <div className={styles.pills}>
              <span className={styles.pill}>📦 Repos</span>
              <span className={styles.pill}>⭐ Stars</span>
              <span className={styles.pill}>💬 Top Language</span>
            </div>
          </div>
        )}

        {!loading && user && (
          <>
            <ProfileHeader user={user} />
            <div className={styles.content}>
              <div className={styles.statsColumn}>
                <StatsCard icon="📦" label="Public Repos" value={user.public_repos.toLocaleString()} />
                <StatsCard icon="⭐" label="Total Stars" value={totalStars.toLocaleString()} />
                <StatsCard icon="💬" label="Top Language" value={topLanguage || '—'} />
              </div>
              <div className={styles.reposColumn}>
                {topRepos.length === 0 ? (
                  <p className={styles.emptyRepos}>This user has no public repositories.</p>
                ) : (
                  topRepos.map(repo => <RepoCard key={repo.id} repo={repo} />)
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>
          {'© '}
          {new Date().getFullYear()}
          {' '}
          <a
            className={styles.footerLink}
            href="https://github.com/aucb21"
            target="_blank"
            rel="noreferrer noopener"
          >
            aucb21
          </a>
          {' · Licensed under the '}
          <a
            className={styles.footerLink}
            href="https://opensource.org/licenses/MIT"
            target="_blank"
            rel="noreferrer noopener"
          >
            MIT License
          </a>
        </p>
      </footer>
    </div>
  )
}
