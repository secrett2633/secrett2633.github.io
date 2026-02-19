const SITE_URL = 'https://blog.secrett2633.cloud'
const SITE_NAME = "secrett2633's blog"

export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: '기술 블로그 - Django, Python, DevOps, AI/ML 관련 포스트',
    inLanguage: 'ko',
    publisher: {
      '@type': 'Person',
      name: 'secrett2633',
      url: SITE_URL,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function PersonJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'secrett2633',
    url: SITE_URL,
    sameAs: ['https://github.com/secrett2633'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface BlogPostingJsonLdProps {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  categories?: string[]
  tags?: string[]
  wordCount?: number
}

export function BlogPostingJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  categories,
  tags,
  wordCount,
}: BlogPostingJsonLdProps) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: `${SITE_URL}${url}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: 'secrett2633',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'secrett2633',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${url}`,
    },
    image: `${SITE_URL}/og-default.png`,
    isAccessibleForFree: true,
    inLanguage: 'ko',
  }

  if (wordCount) {
    jsonLd.wordCount = wordCount
  }

  if (categories && categories.length > 0) {
    jsonLd.articleSection = categories[0]
  }

  if (tags && tags.length > 0) {
    jsonLd.keywords = tags.join(', ')
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbListJsonLdProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbListJsonLd({ items }: BreadcrumbListJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface CollectionPageJsonLdProps {
  name: string
  description: string
  url: string
}

export function CollectionPageJsonLd({ name, description, url }: CollectionPageJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${SITE_URL}${url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: 'ko',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
