import Link from 'next/link'
import PagePadding from '@/shared/components/PagePadding'

export default function NotFound() {
  return (
    <PagePadding>
      <h1>Page not found</h1>
      <p>The page you are looking for could not be found.</p>
      <Link href="/">Go back home</Link>
    </PagePadding>
  )
}
