import { NextRequest, NextResponse } from 'next/server'
import { getSortedPostsData } from '../../../lib/posts'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  const postsPerSitemap = 500
  const totalSitemaps = Math.ceil(posts.length / postsPerSitemap)
  
  return Array.from({ length: totalSitemaps }, (_, i) => ({
    id: (i + 1).toString()
  }))
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sitemapId = parseInt(params.id)
    
    if (isNaN(sitemapId) || sitemapId < 1) {
      return new NextResponse('Invalid sitemap ID', { status: 400 })
    }

    const posts = getSortedPostsData()
    const postsPerSitemap = 500
    const totalSitemaps = Math.ceil(posts.length / postsPerSitemap)
    
    // 유효하지 않은 사이트맵 ID 체크
    if (sitemapId > totalSitemaps) {
      return new NextResponse('Sitemap not found', { status: 404 })
    }

    const startIndex = (sitemapId - 1) * postsPerSitemap
    const endIndex = startIndex + postsPerSitemap
    const sitemapPosts = posts.slice(startIndex, endIndex)
    
    const siteUrl = 'https://secrett2633.github.io'
    const currentDate = new Date().toISOString()
    
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>${siteUrl}/categories</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  ${sitemapPosts.map(post => {
    const postUrl = `${siteUrl}${post.permalink || `/${post.id}/`}`
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
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // 1시간 캐시
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return new NextResponse('Sitemap generation failed', { status: 500 })
  }
}
