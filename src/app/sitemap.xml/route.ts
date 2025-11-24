import { NextRequest, NextResponse } from 'next/server'
import { getSortedPostsData } from '../../lib/posts'

export async function GET(request: NextRequest) {
  try {
    const posts = getSortedPostsData()
    const postsPerSitemap = 500
    const totalSitemaps = Math.ceil(posts.length / postsPerSitemap)
    
    const siteUrl = 'https://blog.secrett2633.site'
    const currentDate = new Date().toISOString()
    
    // 개별 사이트맵은 /sitemaps/{id}.xml 로 제공
    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${Array.from({ length: totalSitemaps }, (_, index) => {
    const sitemapId = index + 1
    return `  <sitemap>
    <loc>${siteUrl}/sitemaps/${sitemapId}.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`
  }).join('\n')}
</sitemapindex>`

    return new NextResponse(sitemapIndexXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Sitemap index generation error:', error)
    return new NextResponse('Sitemap index generation failed', { status: 500 })
  }
}


