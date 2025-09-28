'use client'

import Image from 'next/image'
import Link from 'next/link'
import Product from '@/shared/features/product/components/Product/Product'
import RelatedItems from '@/shared/features/product/components/RelatedItems/RelatedItems'
import type { Product as ProductModel } from '@/shared/api'
import styles from '@/shared/features/product/ProductPage.module.scss'
import backIcon from '@/shared/features/product/left_black.svg'

type ProductPageContentProps = {
  product: ProductModel
  related: ProductModel[]
}

const ProductPageContent = ({ product, related }: ProductPageContentProps) => {
  return (
    <div>
      <Link href="/" className={styles.back}>
        <Image src={backIcon} alt="Back" width={24} height={24} />
        Back
      </Link>
      <Product product={product} />
      <RelatedItems products={related} />
    </div>
  )
}

export default ProductPageContent
