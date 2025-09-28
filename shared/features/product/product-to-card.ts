import type { Product } from '@/shared/api'
import type { CardProps } from '@/shared/components/Card'

export function productToCardProps(product: Product): CardProps {
  return {
    captionSlot: product.category.name,
    contentSlot: `$${product.price}`,
    description: product.description,
    image: product.images[0] ?? '',
    imageAlt: product.title,
    title: product.title,
  }
}
