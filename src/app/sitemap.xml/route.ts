import { NextRequest, NextResponse } from 'next/server'
import { getSortedPostsData } from '../../lib/posts'

export async function GET(request: NextRequest) {
  try {
    const posts = getSortedPostsData()
    const postsPerSitemap = 500
    const totalSitemaps = Math.ceil(posts.length / postsPerSitemap)
    
    const siteUrl = 'https://secrett2633.github.io'
    const currentDate = new Date().toISOString()
    
    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${Array.from({ length: totalSitemaps }, (_, index) => {
    const sitemapId = index + 1
    return `  <sitemap>
    <loc>${siteUrl}/sitemap/${sitemapId}.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`
  }).join('\n')}
</sitemapindex>`

    return new NextResponse(sitemapIndexXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // 1시간 캐시
      },
    })
  } catch (error) {
    console.error('Sitemap index generation error:', error)
    return new NextResponse('Sitemap index generation failed', { status: 500 })
  }
}
