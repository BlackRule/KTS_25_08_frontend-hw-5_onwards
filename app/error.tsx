'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{ padding: '80px 24px' }}>
      <h1>Something went wrong</h1>
      <p>Please try again or return to the homepage.</p>
      <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
        <button type="button" onClick={reset}>
          Try again
        </button>
        <Link href="/">Home</Link>
      </div>
    </div>
  )
}
