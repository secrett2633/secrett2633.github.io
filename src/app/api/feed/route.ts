import { NextRequest, NextResponse } from 'next/server'
import { getSortedPostsData } from '@/lib/posts'

export async function GET(request: NextRequest) {
  try {
    const posts = getSortedPostsData()
    
    // 최신 20개 포스트만 RSS에 포함
    const recentPosts = posts.slice(0, 20)
    
    const siteUrl = 'https://secrett2633.github.io'
    const currentDate = new Date().toUTCString()
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>secrett2633's blog</title>
    <description>기술 블로그 - Django, Python, DevOps, AI/ML 관련 포스트</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/api/feed" rel="self" type="application/rss+xml" />
    <language>ko-KR</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <ttl>60</ttl>
    <generator>Next.js RSS Generator</generator>
    <managingEditor>secrett2633@example.com (secrett2633)</managingEditor>
    <webMaster>secrett2633@example.com (secrett2633)</webMaster>
    <category>Technology</category>
    <category>Programming</category>
    <category>Django</category>
    <category>Python</category>
    <category>DevOps</category>
    <category>AI/ML</category>
    
    ${recentPosts.map(post => {
      const postUrl = `${siteUrl}${post.permalink || `/${post.id}/`}`
      const pubDate = new Date(post.date).toUTCString()
      const description = post.excerpt || post.title
      
      // HTML 태그 제거 및 이스케이프
      const cleanDescription = description
        .replace(/<[^>]*>/g, '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
      
      const cleanTitle = post.title
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
      
      const categories = post.categories?.map(cat => 
        `<category>${cat.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')}</category>`
      ).join('') || ''
      
      const tags = post.tags?.map(tag => 
        `<category>${tag.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')}</category>`
      ).join('') || ''
      
      return `    <item>
      <title>${cleanTitle}</title>
      <description>${cleanDescription}</description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      ${categories}
      ${tags}
    </item>`
    }).join('\n')}
    
  </channel>
</rss>`

    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // 1시간 캐시
      },
    })
  } catch (error) {
    console.error('RSS feed generation error:', error)
    return new NextResponse('RSS feed generation failed', { status: 500 })
  }
}
