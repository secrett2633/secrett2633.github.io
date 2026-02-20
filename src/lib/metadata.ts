import type { Metadata } from 'next'

const SITE_NAME = "secrett2633's blog"

interface PageMetadataOptions {
  title: string
  description: string
  url: string
  noIndex?: boolean
  paginationLinks?: Record<string, string>
}

export function generatePageMetadata({
  title,
  description,
  url,
  noIndex = false,
  paginationLinks,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} - ${SITE_NAME}`
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      ...paginationLinks,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: true,
      },
    }),
  }
}
