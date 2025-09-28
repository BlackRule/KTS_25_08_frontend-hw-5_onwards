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

  const images = product.images.length > 0 ? product.images : [null]

  return (
    <section className={styles.product}>
      <Carousel showArrows swipeable useKeyboardArrows emulateTouch>
        {images.map((img, index) => (
          <div key={img ?? index} className={styles.imageWrapper}>
            {img ? (
              <Image src={img} alt={product.title} width={560} height={560} />
            ) : (
              <div style={{ width: '100%', height: 560, backgroundColor: '#e0e0e0' }} />
            )}
          </div>
        ))}
      </Carousel>
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
