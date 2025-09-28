'use client'

import Text from '@/shared/components/Text'
import type { Option } from '@/shared/components/MultiDropdown'
import ProductsGrid from '@/shared/features/products/products-grid'
import Filter from '@/shared/features/products/components/Filter'
import PageNumbers from '@/shared/features/products/components/PageNumbers'
import SearchBar from '@/shared/features/products/components/SearchBar'
import type { Product } from '@/shared/api'
import styles from '@/shared/features/products/index.module.scss'

type ProductsPageContentProps = {
  products: Product[]
  totalProducts: number
  totalPages: number
  currentPage: number
  filterOptions: Option[]
}

const ProductsPageContent = ({
  products,
  totalProducts,
  totalPages,
  currentPage,
  filterOptions,
}: ProductsPageContentProps) => {
  const hasProducts = products.length > 0

  return (
    <div className={styles.products}>
      <Text className={styles.products} tag="h1" view="title">
        Products
      </Text>
      <Text className={styles.p1} tag="p" color="secondary" view="p-20">
        We display products based on the latest products we have, if you want to see our old products please enter the
        name of the item
      </Text>
      <SearchBar />
      <Filter className={styles.filter} options={filterOptions} />
      <div className={styles.totalProducts}>
        <span className={styles.totalProducts__txt}>Total Products</span>
        <span className={styles.totalProducts__count}>{totalProducts}</span>
      </div>
      {hasProducts ? (
        <ProductsGrid products={products} gridClassName={styles.productsGrid} productClassName={styles.product} />
      ) : (
        <Text tag="p" view="p-18" color="secondary">
          No products matched your filters.
        </Text>
      )}
      <PageNumbers currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

export default ProductsPageContent
