import type { Metadata } from 'next'
import PagePadding from '@/shared/components/PagePadding'
import styles from '@/shared/features/about/About.module.scss'

export const metadata: Metadata = {
  title: 'About Lalasia',
  description: 'Learn more about Lalasia and our approach to timeless design.',
}

export default function AboutPage() {
  return (
    <div className={styles.about}>
      <PagePadding className={styles.inner}>
        <h1 className={styles.title}>About Lalasia</h1>
        <p className={styles.paragraph}>
          Lalasia began as a small idea at a kitchen table: create everyday objects that feel delightful, last longer,
          and tread lighter on the planet. Today, that spark guides everything we do. From thoughtful materials to simple,
          human-centered design, we craft products meant to be used, loved, and repaired—not replaced.
        </p>
        <p className={styles.paragraph}>
          We’re a fictional company with a very real obsession for details. Our teams prototype relentlessly, test with
          real people, and iterate until it just feels right. No loud logos, no throwaway trends—just quiet quality that
          earns its place in your home.
        </p>
        <p className={styles.paragraph}>
          Lalasia is also a community. We partner with small manufacturers, celebrate transparent supply chains, and
          publish repair guides so you can extend the life of what you own. Because the most sustainable product is the
          one you keep.
        </p>
        <p className={styles.paragraph}>
          Whether you’re discovering us for the first time or have been here since those early kitchen-table days—thanks
          for being part of Lalasia. We’re glad you’re here.
        </p>
      </PagePadding>
    </div>
  )
}
