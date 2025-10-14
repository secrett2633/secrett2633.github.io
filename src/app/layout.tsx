import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Masthead from '@/components/Masthead'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "secrett2633's blog",
  description: '기술 블로그',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="no-js">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.className} layout--default`}>
        <div className="min-h-screen bg-gray-50">
          <Masthead />
          <main className="initial-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}