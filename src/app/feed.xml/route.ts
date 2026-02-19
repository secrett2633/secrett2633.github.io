import { NextRequest, NextResponse } from 'next/server'
import { getSortedPostsData, getPostData } from '@/lib/posts'

const KST_OFFSET_MS = 9 * 60 * 60 * 1000

const formatKoreanTime = (date: Date) => {
  return new Date(date.getTime() + KST_OFFSET_MS).toUTCString()
}

export async function GET(request: NextRequest) {
  try {
    const posts = getSortedPostsData()
    
    // 최신 30개 포스트만 RSS에 포함
    const recentPosts = posts.slice(0, 30)
    
    const siteUrl = 'https://blog.secrett2633.cloud'
    const currentDate = formatKoreanTime(new Date())
    
    // 각 포스트의 전체 콘텐츠를 가져옴 (content:encoded 용)
    const postsWithContent = await Promise.all(
      recentPosts.map(async (post) => {
        try {
          const fullPost = await getPostData(post.id)
          return { ...post, contentHtml: fullPost.contentHtml }
        } catch {
          return { ...post, contentHtml: '' }
        }
      })
    )

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>secrett2633's blog</title>
    <description>기술 블로그 - Django, Python, DevOps, AI/ML 관련 포스트</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>ko-KR</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <ttl>60</ttl>
    <generator>Next.js RSS Generator</generator>
    <category>Technology</category>
    <category>Programming</category>
    <category>Django</category>
    <category>Python</category>
    <category>DevOps</category>
    <category>AI/ML</category>
    
    ${postsWithContent.map(post => {
      const postUrl = `${siteUrl}${post.permalink || `/${post.id}`}`
      const pubDate = formatKoreanTime(new Date(post.date))
      const description = post.excerpt || post.title

      const escapeXml = (str: string) => str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')

      const cleanDescription = escapeXml(description.replace(/<[^>]*>/g, ''))
      const cleanTitle = escapeXml(post.title)

      const categories = post.categories?.map(cat =>
        `<category>${escapeXml(cat)}</category>`
      ).join('') || ''

      const tags = post.tags?.map(tag =>
        `<category>${escapeXml(tag)}</category>`
      ).join('') || ''

      const contentEncoded = post.contentHtml
        ? `<content:encoded><![CDATA[${post.contentHtml}]]></content:encoded>`
        : ''

      return `    <item>
      <title>${cleanTitle}</title>
      <description>${cleanDescription}</description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      ${categories}
      ${tags}
      ${contentEncoded}
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
