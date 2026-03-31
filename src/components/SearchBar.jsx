import { useState } from 'react'
import styles from './SearchBar.module.css'

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Enter a GitHub username..."
        disabled={loading}
        aria-label="GitHub username"
      />
      <button
        className={styles.button}
        type="submit"
        disabled={loading || !value.trim()}
      >
        {loading ? 'Searching…' : 'Search'}
      </button>
    </form>
  )
}
