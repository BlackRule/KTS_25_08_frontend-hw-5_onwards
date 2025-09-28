'use client'

import cn from 'classnames'
import { useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Button from '@/shared/components/Button'
import Input from '@/shared/components/Input'
import useWindowSize from '@/shared/hooks/useWindowSize'
import { QUERY_PARAMS } from '@/shared/config/config'
import styles from './SearchBar.module.scss'

type SearchBarProps = {
  className?: string
}

const SearchBar = ({ className }: SearchBarProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { width } = useWindowSize()

  const currentQuery = searchParams.get(QUERY_PARAMS.query) ?? ''
  const [value, setValue] = useState('')

  const placeholder = useMemo(() => {
    return currentQuery.length > 0 ? currentQuery : 'Search product'
  }, [currentQuery])

  const applySearch = (nextValue: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (nextValue.trim().length === 0) {
      params.delete(QUERY_PARAMS.query)
    } else {
      params.set(QUERY_PARAMS.query, nextValue.trim())
    }
    params.delete(QUERY_PARAMS.page)
    const queryString = params.toString()
    router.push(queryString ? `${pathname}?${queryString}` : pathname)
  }

  return (
    <div className={cn(styles.searchBar, className)}>
      <Input
        value={value}
        placeholder={placeholder}
        className={styles.searchBar__input}
        onChange={setValue}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            applySearch(value)
          }
        }}
      />
      <Button onClick={() => applySearch(value)}>
        {width > 1023 ? 'Find Now' : '🔍'}
      </Button>
    </div>
  )
}

export default SearchBar
