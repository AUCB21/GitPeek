import styles from './RepoFilters.module.css'

const STAR_OPTIONS = [
  { label: 'All',    value: 0   },
  { label: '≥1 ★',  value: 1   },
  { label: '≥10 ★', value: 10  },
  { label: '≥100 ★',value: 100 },
]

export default function RepoFilters({ languageOptions, activeFilters, onFilterChange }) {
  const hasActive =
    activeFilters.languages.length > 0 ||
    activeFilters.stars > 0 ||
    activeFilters.hasWebsite

  function toggleLanguage(lang) {
    const next = activeFilters.languages.includes(lang)
      ? activeFilters.languages.filter(l => l !== lang)
      : [...activeFilters.languages, lang]
    onFilterChange({ ...activeFilters, languages: next })
  }

  function clearAll() {
    onFilterChange({ languages: [], stars: 0, hasWebsite: false })
  }

  return (
    <div className={styles.filters}>
      {/* Language multi-select pills */}
      {languageOptions.length > 0 && (
        <div className={styles.langGroup}>
          {languageOptions.map(lang => (
            <button
              key={lang}
              className={`${styles.langPill} ${activeFilters.languages.includes(lang) ? styles.langPillActive : ''}`}
              onClick={() => toggleLanguage(lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      )}

      {/* Stars threshold + website toggle + clear — in one row */}
      <div className={styles.row}>
        {/* Stars joined button group */}
        <div className={styles.btnGroup} role="group" aria-label="Minimum stars">
          {STAR_OPTIONS.map(({ label, value }, i) => {
            const posClass =
              i === 0 ? styles.btnFirst
              : i === STAR_OPTIONS.length - 1 ? styles.btnLast
              : styles.btnMiddle
            return (
              <button
                key={value}
                className={`${styles.starBtn} ${posClass} ${activeFilters.stars === value ? styles.starBtnActive : ''}`}
                onClick={() => onFilterChange({ ...activeFilters, stars: value })}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Has website toggle */}
        <button
          className={`${styles.toggleBtn} ${activeFilters.hasWebsite ? styles.toggleBtnActive : ''}`}
          onClick={() => onFilterChange({ ...activeFilters, hasWebsite: !activeFilters.hasWebsite })}
        >
          🌐 Has website
        </button>

        {/* Clear all — only when something is active */}
        {hasActive && (
          <button className={styles.clearBtn} onClick={clearAll}>
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
