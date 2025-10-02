import type { Metadata } from 'next'
import PagePadding from '@/shared/components/PagePadding'
import { fetchCategories, fetchProducts } from '@/shared/api'
import { ELEMENTS_PER_PAGE, QUERY_PARAMS } from '@/shared/config/config'
import ProductsPageContent from '@/app/(components)/products-page-content'
import { categoryToOption } from '@/shared/features/products/categories'
import styles from '@/shared/features/products/index.module.scss'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Products',
}

type SearchParamsInput =
  | Record<string, string | string[] | undefined>
  | Promise<Record<string, string | string[] | undefined>>

const toArray = (value: string | string[] | undefined): string[] => {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

export default async function Home({
  searchParams,
}: {
  searchParams?: SearchParamsInput
}) {
  const resolved = searchParams ? await searchParams : {}

  const queryParam = resolved[QUERY_PARAMS.query]
  const query = Array.isArray(queryParam) ? queryParam[0] ?? '' : queryParam ?? ''

  const categoryKeys = toArray(resolved[QUERY_PARAMS.selectedCategory])
  const categoryIds = categoryKeys
    .map((key) => Number.parseInt(key, 10))
    .filter((id) => Number.isFinite(id))

  const pageParam = resolved[QUERY_PARAMS.page]
  const initialPageRaw = Array.isArray(pageParam) ? pageParam[0] : pageParam
  const initialPage = Number.parseInt(initialPageRaw ?? '1', 10)
  const requestedPage = Number.isFinite(initialPage) && initialPage > 0 ? initialPage : 1

  const [categories, products] = await Promise.all([
    fetchCategories({ next: { revalidate: 3600 } }),
    fetchProducts({
      categoryIds: categoryIds.length ? categoryIds : undefined,
      search: query || undefined,
      next: { revalidate: revalidate },
    }),
  ])

  const filterOptions = categories.map(categoryToOption)

  const totalProducts = products.length
  const totalPages = Math.max(1, Math.ceil(totalProducts / ELEMENTS_PER_PAGE))
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages)
  const start = (currentPage - 1) * ELEMENTS_PER_PAGE
  const pagedProducts = products.slice(start, start + ELEMENTS_PER_PAGE)

  return (
    <PagePadding className={styles.pagePadding}>
      <ProductsPageContent
        products={pagedProducts}
        totalProducts={totalProducts}
        totalPages={totalPages}
        currentPage={currentPage}
        filterOptions={filterOptions}
      />
    </PagePadding>
  )
}
