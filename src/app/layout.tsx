import { ReactNode } from 'react'
import { Roboto } from 'next/font/google'
import '../styles/globals.css'

import { Header } from '@/components/Header'
import { Provider } from '@/components/Provider'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  subsets: ['latin'],
})

export const metadata = {
  title: 'To-Do-Next',
  description: 'Define your next task',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  )
}
