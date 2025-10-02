'use client'

import Link from 'next/link'
import Button from '@/shared/components/Button'
import Card from '@/shared/components/Card'
import type { Product } from '@/shared/api'
import { productToCardProps } from '@/shared/features/product/product-to-card'
import { useCartStore } from '@/shared/stores'

type ProductsGridProps = {
  products: Product[]
  gridClassName: string
  productClassName?: string
}

const ProductsGrid = ({ products, gridClassName, productClassName }: ProductsGridProps) => {
  const cartStore = useCartStore()

  return (
    <div className={gridClassName}>
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
            className={productClassName}
          />
        </Link>
      ))}
    </div>
  )
}

export default ProductsGrid
