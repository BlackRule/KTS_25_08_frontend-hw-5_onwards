'use client'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { useEffect } from 'react'
import Button from '@/shared/components/Button'
import Text from '@/shared/components/Text'
import { useCartStore } from '@/shared/stores'
import styles from '@/shared/features/cart/Cart.module.scss'

const CartPageContent = observer(() => {
  const cartStore = useCartStore()
  const items = cartStore.list

  useEffect(() => {
    cartStore.fetch()
  }, [cartStore])

  return (
    <div className={styles.cart}>
      <Text tag="h1" view="title">
        Your Cart
      </Text>
      {items.length === 0 ? (
        <Text tag="p" view="p-20">
          Your cart is empty.
        </Text>
      ) : (
        <>
          <div className={styles.items}>
            {items.map(({ product, qty }) => (
              <div key={product.id} className={styles.item}>
                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={64}
                    height={64}
                    className={styles.itemImage}
                  />
                ) : (
                  <div className={styles.itemImage} style={{ width: 64, height: 64, backgroundColor: '#eee' }} />
                )}
                <div className={styles.itemDetails}>
                  <Text tag="h3" view="p-20">
                    {product.title}
                  </Text>
                  <Text tag="p" color="secondary" view="p-16">
                    ${product.price} × {qty}
                  </Text>
                </div>
                <Text tag="p" view="p-20">
                  ${((product.price ?? 0) * qty).toFixed(2)}
                </Text>
                <Button skin="secondary" onClick={() => void cartStore.remove(product.id)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <div className={styles.actions}>
            <Text tag="p" view="p-20">
              Total: ${cartStore.total.toFixed(2)}
            </Text>
            <Button onClick={() => void cartStore.clear()}>Clear cart</Button>
          </div>
        </>
      )}
    </div>
  )
})

export default CartPageContent
