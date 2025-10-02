'use client'

import cn from 'classnames'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { QUERY_PARAMS, VISIBLE_PAGE_NUMBERS } from '@/shared/config/config'
import styles from './PageNumbers.module.scss'

type PageNumbersProps = {
  currentPage: number
  totalPages: number
}

const PageNumbers = ({ currentPage, totalPages }: PageNumbersProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (totalPages <= 1) {
    return null
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  const primaryCount = Math.max(VISIBLE_PAGE_NUMBERS - 1, 0)
  const primaryPages = pages.slice(0, primaryCount)
  const additionalPages = pages.slice(primaryCount, totalPages - 1)
  const lastPage = totalPages > 3 ? totalPages : null

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page <= 1) {
      params.delete(QUERY_PARAMS.page)
    } else {
      params.set(QUERY_PARAMS.page, page.toString())
    }
    const queryString = params.toString()
    router.push(queryString ? `${pathname}?${queryString}` : pathname)
  }

  const prevDisabled = currentPage <= 1
  const nextDisabled = currentPage >= totalPages

  return (
    <div className={styles.pageNumbers}>
      <button
        type="button"
        onClick={() => !prevDisabled && goToPage(currentPage - 1)}
        className={cn(styles.pageNumber, styles['left-arrow'], { [styles.disabled]: prevDisabled })}
      />
      {primaryPages.map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => goToPage(page)}
          className={cn(styles.pageNumber, { [styles.selected]: page === currentPage })}
        >
          {page}
        </button>
      ))}
      {additionalPages.length > 0 ? (
        <div className={styles.additionalNumbers}>
          <input type="checkbox" id={styles.additionalNumbersToggle} />
          <label htmlFor={styles.additionalNumbersToggle} className={styles.pageNumber}>
            ...
          </label>
          <div className={styles.options}>
            {additionalPages.map((page) => (
              <button
                type="button"
                key={page}
                onClick={() => goToPage(page)}
                className={cn(styles.pageNumber, { [styles.selected]: page === currentPage })}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {lastPage ? (
        <button
          type="button"
          onClick={() => goToPage(lastPage)}
          className={cn(styles.pageNumber, { [styles.selected]: lastPage === currentPage })}
        >
          {lastPage}
        </button>
      ) : null}
      <button
        type="button"
        onClick={() => !nextDisabled && goToPage(currentPage + 1)}
        className={cn(styles.pageNumber, styles['right-arrow'], { [styles.disabled]: nextDisabled })}
      />
    </div>
  )
}

export default PageNumbers
