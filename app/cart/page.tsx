import type { Metadata } from 'next'
import PagePadding from '@/shared/components/PagePadding'
import CartPageContent from '@/app/(components)/cart-page-content'

export const metadata: Metadata = {
  title: 'Your Cart',
}

export default function CartPage() {
  return (
    <PagePadding>
      <CartPageContent />
    </PagePadding>
  )
}
