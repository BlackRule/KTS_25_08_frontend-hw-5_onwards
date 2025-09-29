'use client'

import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import Button from '@/shared/components/Button'
import Text from '@/shared/components/Text'
import type { Product as ProductModel } from '@/shared/api'
import { useCartStore } from '@/shared/stores'
import styles from './Product.module.scss'

type ProductProps = {
  product: ProductModel
}

const Product = ({ product }: ProductProps) => {
  const cartStore = useCartStore()

  const hasImages = product.images.length > 0

  return (
    <section className={styles.product}>
      {hasImages ? (
        <Carousel
          showArrows
          swipeable
          useKeyboardArrows
          emulateTouch
          showThumbs={product.images.length > 1}
          renderThumbs={() =>
            product.images.length > 1
              ? product.images.map((img) => (
                  <img
                    key={img}
                    src={img}
                    alt={`${product.title} thumbnail`}
                    loading="lazy"
                    style={{ width: '100%', height: 'auto' }}
                  />
                ))
              : []
          }
        >
          {product.images.map((img) => (
            <div key={img} className={styles.imageWrapper}>
              <Image
                src={img}
                alt={product.title}
                width={560}
                height={560}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <div className={styles.imageWrapper}>
          <div className={styles.placeholder} role="img" aria-label="Product image not available" />
        </div>
      )}
      <div className={styles.details}>
        <Text view="title" className={styles.title} tag="h2">
          {product.title}
        </Text>
        <Text view="p-20" color="secondary" className={styles.description}>
          {product.description}
        </Text>
        <Text className={styles.price} weight="bold" view="title">
          ${product.price}
        </Text>
        <div className={styles.buttons}>
          <Button>Buy Now</Button>
          <Button
            skin="secondary"
            onClick={() => {
              void cartStore.add(product)
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Product
