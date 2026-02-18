import { NextRequest, NextResponse } from 'next/server'
import { getSortedPostsData } from '../../../lib/posts'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  const postsPerSitemap = 500
  const totalSitemaps = Math.ceil(posts.length / postsPerSitemap)

  // 개별 사이트맵들을 위한 파라미터만 생성 (/sitemaps/1.xml ...)
  const params = Array.from({ length: totalSitemaps }, (_, i) => ({
    slug: [`${i + 1}.xml`]
  }))

  return params
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug?: string[] } }
) {
  try {
    const posts = getSortedPostsData()
    const postsPerSitemap = 500
    const totalSitemaps = Math.ceil(posts.length / postsPerSitemap)

    // 개별 사이트맵 처리만 허용
    if (!params.slug || params.slug.length !== 1) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const slug = params.slug[0]
    const sitemapIdStr = slug.replace(/\.xml$/, '')
    const sitemapId = parseInt(sitemapIdStr)

    if (isNaN(sitemapId) || sitemapId < 1 || sitemapId > totalSitemaps) {
      return new NextResponse('Sitemap not found', { status: 404 })
    }

    const startIndex = (sitemapId - 1) * postsPerSitemap
    const endIndex = startIndex + postsPerSitemap
    const sitemapPosts = posts.slice(startIndex, endIndex)

    const siteUrl = 'https://blog.secrett2633.cloud'
    const currentDate = new Date().toISOString()

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">  
  ${sitemapPosts.map(post => {
    const postUrl = `${siteUrl}${post.permalink || `/${post.id}`}`
    const lastmod = post.lastModifiedAt ? new Date(post.lastModifiedAt).toISOString() : new Date(post.date).toISOString()
    
    return `  <url>
    <loc>${postUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
  }).join('\n')}
</urlset>`

    return new NextResponse(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return new NextResponse('Sitemap generation failed', { status: 500 })
  }
}


