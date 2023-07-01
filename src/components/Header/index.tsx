'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import styles from './styles.module.css'
import Link from 'next/link'

export function Header() {
  const { data: session, status } = useSession()
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href="/">
            <h1 className={styles.logo}>
              To-Do <span>Next</span>
            </h1>
          </Link>
          {session && (
            <Link href="/dashboard" className={styles.dashLink}>
              My dashboard
            </Link>
          )}
        </nav>
        {status === 'loading' ? (
          <></>
        ) : session ? (
          <button className={styles.loginButton} onClick={() => signOut()}>
            Hello, {session.user?.name}
          </button>
        ) : (
          <button
            className={styles.loginButton}
            onClick={() => signIn('google')}
          >
            Login
          </button>
        )}
      </section>
    </header>
  )
}
