import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '@/shared/styles/global.scss'
import Header from '@/shared/components/Header'
import { RootStoreProvider } from '@/shared/stores'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Lalasia',
    template: '%s · Lalasia',
  },
  description: 'Lalasia — curated furniture and decor for everyday living.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <RootStoreProvider>
          <Header />
          <main>{children}</main>
        </RootStoreProvider>
      </body>
    </html>
  )
}
