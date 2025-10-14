import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Masthead from '@/components/Masthead'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "secrett2633's blog",
  description: '기술 블로그 - Django, Python, DevOps, AI/ML 관련 포스트',
  keywords: 'Django, Python, DevOps, AI, ML, 블로그, 기술',
  authors: [{ name: 'secrett2633' }],
  creator: 'secrett2633',
  publisher: 'secrett2633',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://secrett2633.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "secrett2633's blog",
    description: '기술 블로그 - Django, Python, DevOps, AI/ML 관련 포스트',
    url: 'https://secrett2633.github.io',
    siteName: "secrett2633's blog",
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "secrett2633's blog",
    description: '기술 블로그 - Django, Python, DevOps, AI/ML 관련 포스트',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NE2W3CFPNY"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NE2W3CFPNY');
            `,
          }}
        />
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