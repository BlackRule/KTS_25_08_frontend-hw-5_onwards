'use client'

import Link from 'next/link'
import Button from '@/shared/components/Button'
import Card from '@/shared/components/Card'
import Text from '@/shared/components/Text'
import type { Product } from '@/shared/api'
import { productToCardProps } from '@/shared/features/product/product-to-card'
import { useCartStore } from '@/shared/stores'
import styles from './RelatedItems.module.scss'

type RelatedItemsProps = {
  products: Product[]
}

const RelatedItems = ({ products }: RelatedItemsProps) => {
  const cartStore = useCartStore()

  if (products.length === 0) {
    return null
  }

  return (
    <section className={styles.relatedItems}>
      <Text className={styles.txt} tag="h2" view="p-20">
        Related Items
      </Text>
      <div className={styles.grid}>
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
              <Card
                {...productToCardProps(product)}
                actionSlot={
                  <Button
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      void cartStore.add(product)
                    }}
                  >
                    Add to Cart
                  </Button>
                }
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RelatedItems
