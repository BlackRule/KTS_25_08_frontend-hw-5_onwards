'use client'

import Link from 'next/link'
import Text from '@/shared/components/Text'
import type { Category } from '@/shared/api'
import { QUERY_PARAMS } from '@/shared/config/config'
import styles from '@/shared/features/products/index.module.scss'

type CategoriesPageContentProps = {
  categories: Category[]
}

const CategoriesPageContent = ({ categories }: CategoriesPageContentProps) => {
  return (
    <div className={styles.products}>
      <Text tag="h1" view="title">
        Categories
      </Text>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {categories.map((category) => {
          const params = new URLSearchParams()
          params.append(QUERY_PARAMS.selectedCategory, String(category.id))
          return (
            <li key={category.id} style={{ marginBottom: 8 }}>
              <Link href={`/?${params.toString()}`}>{category.name}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoriesPageContent
