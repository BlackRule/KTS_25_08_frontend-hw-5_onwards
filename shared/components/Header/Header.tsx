'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { observer } from 'mobx-react-lite'
import { useAuthStore } from '@/shared/stores'
import logo from './img/logo.svg'
import styles from './Header.module.scss'

const navLinks = [
  { href: '/', label: 'Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About Us' },
]

const Header = observer(() => {
  const { user } = useAuthStore()
  const pathname = usePathname()

  const accountHref = user ? '/user' : '/login'

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <input type="checkbox" id={styles.menu__checkbox} />
        <div className={styles.logoAndBurger}>
          <Link href="/" className={styles.logo}>
            <Image src={logo} alt="Lalasia logo" width={32} height={32} priority />
            <span>Lalasia</span>
          </Link>
          <label htmlFor={styles.menu__checkbox} className={styles.burger}>
            <div />
          </label>
        </div>
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? styles.current : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.right}>
          <Link href="/cart" className={styles.bag} aria-label="Cart" />
          <Link href={accountHref} className={styles.user} aria-label="Account" prefetch={false} data-account-href={accountHref} />
        </div>
      </div>
    </header>
  )
})

export default Header
