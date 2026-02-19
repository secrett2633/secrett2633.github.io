import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Masthead from '@/components/Masthead'
import Footer from '@/components/Footer'
import { WebSiteJsonLd, PersonJsonLd } from '@/components/JsonLd'

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
  metadataBase: new URL('https://blog.secrett2633.cloud'),
  openGraph: {
    title: "secrett2633's blog",
    description: '기술 블로그 - Django, Python, DevOps, AI/ML 관련 포스트',
    url: 'https://blog.secrett2633.cloud',
    siteName: "secrett2633's blog",
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: "secrett2633's blog",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "secrett2633's blog",
    description: '기술 블로그 - Django, Python, DevOps, AI/ML 관련 포스트',
    creator: '@secrett2633',
    images: ['/og-default.png'],
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
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
    languages: {
      'ko': 'https://blog.secrett2633.cloud',
    },
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="no-js">
      <head>
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://giscus.app" />
        <link rel="preconnect" href="https://giscus.app" crossOrigin="anonymous" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        {/* <meta name="naver-site-verification" content="YOUR_NAVER_VERIFICATION_CODE" /> */}
        {/* <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" /> */}
        <WebSiteJsonLd />
        <PersonJsonLd />
      </head>
      <body className={`${inter.className} layout--default`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-blue-600">본문으로 건너뛰기</a>
        <div className="min-h-screen bg-gray-50">
          <Masthead />
          <main id="main-content" className="initial-content">
            {children}
          </main>
          <Footer />
        </div>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NE2W3CFPNY"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NE2W3CFPNY');`}
        </Script>
      </body>
    </html>
  )
}
