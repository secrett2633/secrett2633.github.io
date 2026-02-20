import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Comments from '@/components/Comments'
import { getAllPostIds, getPostData, getPaginatedPostsByCategory, getPostsByCategory, POSTS_PER_PAGE } from '@/lib/posts'
import { categoryMapping, categoryPathMapping } from '@/lib/categories'
import { generatePageMetadata } from '@/lib/metadata'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Pagination from '@/components/Pagination'
import CommentCountProvider from '@/components/CommentCountProvider'
import { BlogPostingJsonLd, BreadcrumbListJsonLd, CollectionPageJsonLd } from '@/components/JsonLd'
import Breadcrumb from '@/components/Breadcrumb'
import PageLayout from '@/components/PageLayout'
import PostArchiveList from '@/components/PostArchiveList'

// 정적 생성에서 동적 렌더링 허용하지 않음 (export 모드용)

interface PostPageProps {
  params: {
    slug: string[]
  }
}

function resolvePostId(slug: string): string | null {
  const decodedSlug = decodeURIComponent(slug)
  const cacheFile = path.join(process.cwd(), '.next-cache', 'permalink-cache.json')

  if (fs.existsSync(cacheFile)) {
    const cacheContent = fs.readFileSync(cacheFile, 'utf8')
    const permalinkMap: Record<string, { slug: string[]; permalink: string }> = JSON.parse(cacheContent)

    for (const [id, data] of Object.entries(permalinkMap)) {
      const normalizedPermalink = data.permalink.replace(/^\//, '').replace(/\/$/, '')
      if (normalizedPermalink === slug || normalizedPermalink === decodedSlug) {
        return id
      }
    }
  } else {
    const postIds = getAllPostIds()
    for (const id of postIds) {
      const fullPath = path.join(process.cwd(), 'src', 'data', `${id}.md`)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      const permalink = (matterResult.data.permalink || `/${id}`).replace(/\/$/, '')
      const normalizedPermalink = permalink.replace(/^\//, '').replace(/\/$/, '')
      if (normalizedPermalink === slug || normalizedPermalink === decodedSlug) {
        return id
      }
    }
  }

  return null
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const slug = params.slug.join('/')

  // 카테고리 랜딩 페이지
  if (categoryMapping[slug]) {
    const categoryName = categoryMapping[slug]
    return generatePageMetadata({
      title: categoryName,
      description: `${categoryName} 카테고리의 포스트 목록`,
      url: `/${slug}`,
    })
  }

  // 카테고리 페이지네이션
  for (const [pathKey, categoryName] of Object.entries(categoryMapping)) {
    if (slug.startsWith(pathKey + '/page/')) {
      const parts = slug.split('/')
      const pageNum = parts[parts.length - 1]
      const pageNumInt = parseInt(pageNum)
      const { totalPages } = getPaginatedPostsByCategory(categoryName, 1, POSTS_PER_PAGE)

      const paginationLinks: Record<string, string> = {}
      if (pageNumInt > 1) {
        paginationLinks.prev = pageNumInt === 2 ? `/${pathKey}` : `/${pathKey}/page/${pageNumInt - 1}`
      }
      if (pageNumInt < totalPages) {
        paginationLinks.next = `/${pathKey}/page/${pageNumInt + 1}`
      }

      return generatePageMetadata({
        title: `${categoryName} - ${pageNum}페이지`,
        description: `${categoryName} 카테고리의 포스트 목록 - ${pageNum}페이지`,
        url: `/${slug}`,
        noIndex: true,
        paginationLinks,
      })
    }
  }

  // 개별 포스트 페이지
  const postId = resolvePostId(slug)
  if (!postId) {
    return {}
  }

  try {
    const fullPath = path.join(process.cwd(), 'src', 'data', `${postId}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    const title = matterResult.data.title || 'Untitled'
    const excerpt = matterResult.data.excerpt || ''
    const permalink = (matterResult.data.permalink || `/${postId}`).replace(/\/$/, '')
    // excerpt가 없으면 콘텐츠 앞부분에서 설명 생성
    const description = excerpt || matterResult.content
      .replace(/```[\s\S]*?```/g, '')
      .replace(/[#*_~>`\[\]()!-]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160) || title
    const date = matterResult.data.date || new Date().toISOString()
    const lastModified = matterResult.data.last_modified_at || matterResult.data.lastModifiedAt
    const tags = Array.isArray(matterResult.data.tags) ? matterResult.data.tags : []
    const categories = Array.isArray(matterResult.data.categories) ? matterResult.data.categories : []

    return {
      title: `${title} - secrett2633's blog`,
      description,
      alternates: {
        canonical: permalink,
      },
      openGraph: {
        title,
        description,
        url: permalink,
        type: 'article',
        publishedTime: new Date(date).toISOString(),
        modifiedTime: lastModified ? new Date(lastModified).toISOString() : undefined,
        authors: ['secrett2633'],
        tags,
        section: categories[0],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        creator: '@secrett2633',
      },
    }
  } catch {
    return {}
  }
}

export async function generateStaticParams() {
  try {
    // 캐시된 permalink 맵 사용 (빌드 속도 최적화)
    const cacheFile = path.join(process.cwd(), '.next-cache', 'permalink-cache.json')
    let permalinkMap: Record<string, { slug: string[], permalink: string }> = {}

    if (fs.existsSync(cacheFile)) {
      const cacheContent = fs.readFileSync(cacheFile, 'utf8')
      permalinkMap = JSON.parse(cacheContent)
    } else {
      // 캐시가 없으면 경고 출력하고 기본 방식 사용
      console.warn('Permalink cache not found. Run "npm run prebuild" first for faster builds.')
      const postIds = getAllPostIds()
      postIds.forEach((id) => {
        permalinkMap[id] = {
          slug: id.split('/'),
          permalink: `/${id}`
        }
      })
    }

    const postParams = Object.values(permalinkMap).map(({ slug }) => ({ slug }))

    // Also include category landing paths and paginated paths required for export mode
    const categoryLanding = Object.keys(categoryMapping).map((pathStr) => ({ slug: pathStr.split('/') }))

    // For each category, compute total pages and add /page/N
    const paginated = Object.entries(categoryMapping).flatMap(([pathStr, categoryName]) => {
      const { totalPages } = getPaginatedPostsByCategory(categoryName, 1, POSTS_PER_PAGE)
      const base = pathStr.split('/')
      const items = [] as { slug: string[] }[]
      for (let p = 2; p <= totalPages; p++) {
        items.push({ slug: [...base, 'page', String(p)] })
      }
      return items
    })

    return [...postParams, ...categoryLanding, ...paginated]
  } catch (error) {
    console.error('Error in generateStaticParams:', error)
    // Return empty array as fallback
    return []
  }
}

// In export mode, all params must be generated at build time
export const dynamicParams = false
export const dynamic = 'error'
export const revalidate = false

// 카테고리 포스트 목록 페이지 (랜딩 + 페이지네이션 공통)
function CategoryPostsPage({
  categoryName,
  categoryPath,
  slug,
  page,
}: {
  categoryName: string
  categoryPath: string
  slug: string
  page: number
}) {
  const { posts, currentPage: validPage, totalPages } = getPaginatedPostsByCategory(categoryName, page, POSTS_PER_PAGE)
  const isFirstPage = page === 1

  const breadcrumbItems = isFirstPage
    ? [{ name: categoryName, href: `/${categoryPath}` }]
    : [
        { name: categoryName, href: `/${categoryPath}` },
        { name: `${validPage}페이지`, href: `/${slug}` },
      ]

  const breadcrumbJsonLdItems = [
    { name: '홈', url: '/' },
    { name: categoryName, url: `/${categoryPath}` },
    ...(!isFirstPage ? [{ name: `${validPage}페이지`, url: `/${slug}` }] : []),
  ]

  const jsonLdName = isFirstPage
    ? `${categoryName} - secrett2633's blog`
    : `${categoryName} - ${validPage}페이지 - secrett2633's blog`
  const jsonLdDesc = isFirstPage
    ? `${categoryName} 카테고리의 포스트 목록`
    : `${categoryName} 카테고리의 포스트 목록 - ${validPage}페이지`

  return (
    <CommentCountProvider>
      <CollectionPageJsonLd name={jsonLdName} description={jsonLdDesc} url={`/${slug}`} />
      <BreadcrumbListJsonLd items={breadcrumbJsonLdItems} />
      <PageLayout>
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="page__title mb-6">{categoryName}</h1>

        {posts.length === 0 ? (
          <div className="py-12">
            <p className="text-gray-500">이 카테고리에 아직 포스트가 없습니다.</p>
          </div>
        ) : (
          <>
            <PostArchiveList posts={posts} />
            <Pagination
              currentPage={validPage}
              totalPages={totalPages}
              basePath={`/${categoryPath}`}
            />
          </>
        )}
      </PageLayout>
    </CommentCountProvider>
  )
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = params.slug.join('/')

  // 카테고리 랜딩 페이지
  if (categoryMapping[slug]) {
    return (
      <CategoryPostsPage
        categoryName={categoryMapping[slug]}
        categoryPath={slug}
        slug={slug}
        page={1}
      />
    )
  }

  // /{category-path}/page/{N} 패턴 처리
  for (const [pathKey, categoryName] of Object.entries(categoryMapping)) {
    if (slug.startsWith(pathKey + '/page/')) {
      const parts = slug.split('/')
      const pageStr = parts[parts.length - 1]
      const pageNum = Number(pageStr)
      const page = Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1
      return (
        <CategoryPostsPage
          categoryName={categoryName}
          categoryPath={pathKey}
          slug={slug}
          page={page}
        />
      )
    }
  }

  // Find the post by matching permalink (캐시 사용으로 최적화)
  const postId = resolvePostId(slug)

  if (!postId) {
    notFound()
  }

  try {
    const postData = await getPostData(postId)
    const primaryCategory = postData.categories?.[0]
    const categoryPath = primaryCategory ? categoryPathMapping[primaryCategory] : null
    let prevPost = null
    let nextPost = null

    if (primaryCategory) {
      const categoryPosts = getPostsByCategory(primaryCategory)
      const currentIndex = categoryPosts.findIndex((post) => post.id === postId)

      if (currentIndex !== -1) {
        prevPost = categoryPosts[currentIndex + 1] || null
        nextPost = categoryPosts[currentIndex - 1] || null
      }
    }

    const wordCount = postData.contentHtml.replace(/<[^>]*>/g, '').trim().split(/\s+/).length
    const postPermalink = postData.permalink || `/${postId}`
    const breadcrumbItems = []
    if (primaryCategory && categoryPath) {
      breadcrumbItems.push({ name: primaryCategory, href: `/${categoryPath}` })
    }
    breadcrumbItems.push({ name: postData.title, href: postPermalink })

    const breadcrumbJsonLdItems = [{ name: '홈', url: '/' }]
    if (primaryCategory && categoryPath) {
      breadcrumbJsonLdItems.push({ name: primaryCategory, url: `/${categoryPath}` })
    }
    breadcrumbJsonLdItems.push({ name: postData.title, url: postPermalink })

    return (
      <>
        <BlogPostingJsonLd
          title={postData.title}
          description={postData.excerpt || postData.title}
          url={postPermalink}
          datePublished={new Date(postData.date).toISOString()}
          dateModified={postData.lastModifiedAt ? new Date(postData.lastModifiedAt).toISOString() : undefined}
          categories={postData.categories}
          tags={postData.tags}
          wordCount={wordCount}
        />
        <BreadcrumbListJsonLd items={breadcrumbJsonLdItems} />
        <PageLayout>
          <Breadcrumb items={breadcrumbItems} />
          <article className="page">
            <header className="mb-8">
              <h1 className="page__title">{postData.title}</h1>
              <div className="page__meta">
                <time dateTime={postData.date}>
                  {format(new Date(postData.date), 'yyyy년 M월 d일', { locale: ko })}
                </time>
                {postData.lastModifiedAt && (
                  <time className="ml-4" dateTime={new Date(postData.lastModifiedAt).toISOString()}>
                    수정: {format(new Date(postData.lastModifiedAt), 'yyyy년 M월 d일', { locale: ko })}
                  </time>
                )}
              </div>
            </header>

            <div className="page__content">
              <div
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
              />
            </div>

            <footer className="page__meta mt-8">
              {postData.tags && postData.tags.length > 0 && (
                <div className="page__taxonomy">
                  <span className="text-sm font-medium text-gray-900 mb-2 block">태그</span>
                  {postData.tags.map((tag) => (
                    <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="page__taxonomy-item">
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </footer>

            {/* 댓글 섹션 */}
            <Comments postPermalink={postData.permalink || `/${postId}`} postId={postId} />

            {primaryCategory && (
              <section className="mt-12 border-t border-gray-200 pt-8">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  {primaryCategory} 의 다른글
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="text-gray-500">
                    이전글{' '}
                    {prevPost ? (
                      <Link
                        href={prevPost.permalink || `/${prevPost.id}`}
                        className="text-gray-500 hover:text-gray-700 underline decoration-dotted underline-offset-4"
                      >
                        {prevPost.title}
                      </Link>
                    ) : (
                      <span className="text-gray-400">없음</span>
                    )}
                  </li>
                  <li className="text-gray-900 font-semibold">
                    현재글 : {postData.title}
                  </li>
                  <li className="text-gray-500">
                    다음글{' '}
                    {nextPost ? (
                      <Link
                        href={nextPost.permalink || `/${nextPost.id}`}
                        className="text-gray-500 hover:text-gray-700 underline decoration-dotted underline-offset-4"
                      >
                        {nextPost.title}
                      </Link>
                    ) : (
                      <span className="text-gray-400">없음</span>
                    )}
                  </li>
                </ul>
              </section>
            )}
          </article>
        </PageLayout>
      </>
    )
  } catch (error) {
    console.error(`Error loading post data for postId: ${postId}`, error)
    notFound()
  }
}
