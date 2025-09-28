import type { Metadata } from 'next'
import PagePadding from '@/shared/components/PagePadding'
import { fetchCategories } from '@/shared/api'
import CategoriesPageContent from '@/app/(components)/categories-page-content'
import styles from '@/shared/features/products/index.module.scss'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Categories',
}

export default async function CategoriesPage() {
  const categories = await fetchCategories({ next: { revalidate } })
  return (
    <PagePadding className={styles.pagePadding}>
      <CategoriesPageContent categories={categories} />
    </PagePadding>
  )
}
