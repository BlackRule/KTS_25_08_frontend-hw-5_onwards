import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PagePadding from '@/shared/components/PagePadding'
import { fetchProduct, fetchProducts } from '@/shared/api'
import ProductPageContent from '@/app/(components)/product-page-content'

export const revalidate = 300

type PageParams = {
  id: string
}

type PageProps = {
  params: Promise<PageParams>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const product = await fetchProduct(id, { next: { revalidate } })
    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: product.images.slice(0, 1).map((url) => ({ url })),
      },
    }
  } catch (error) {
    return {
      title: 'Product not found',
    }
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const product = await fetchProduct(id, { next: { revalidate } }).catch(() => null)
  if (!product) {
    notFound()
  }

  const relatedCandidates = await fetchProducts({
    categoryIds: [product.category.id],
    limit: 4,
    next: { revalidate },
  })
  const related = relatedCandidates.filter((candidate) => candidate.id !== product.id).slice(0, 3)

  return (
    <PagePadding>
      <ProductPageContent product={product} related={related} />
    </PagePadding>
  )
}
