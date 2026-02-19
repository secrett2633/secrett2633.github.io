import type { Metadata } from 'next'
import { getPaginatedPosts } from '@/lib/posts'
import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Sidebar from '@/components/Sidebar'
import Pagination from '@/components/Pagination'
import CommentCount from '@/components/CommentCount'
import CommentCountProvider from '@/components/CommentCountProvider'
import { CollectionPageJsonLd, BreadcrumbListJsonLd } from '@/components/JsonLd'

export const dynamic = 'error'
export const revalidate = false

interface PageProps {
  params: { page: string }
}

export async function generateStaticParams() {
  const { totalPages } = getPaginatedPosts(1, 20)
  const pages: { page: string }[] = []
  for (let p = 2; p <= totalPages; p++) {
    pages.push({ page: String(p) })
  }
  return pages
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pageNum = parseInt(params.page)
  const { totalPages } = getPaginatedPosts(1, 20)

  const paginationLinks: Record<string, string> = {}
  if (pageNum > 1) {
    paginationLinks.prev = pageNum === 2 ? '/' : `/page/${pageNum - 1}`
  }
  if (pageNum < totalPages) {
    paginationLinks.next = `/page/${pageNum + 1}`
  }

  return {
    title: `${params.page}페이지 - secrett2633's blog`,
    description: `최신 포스트 목록 - ${params.page}페이지`,
    alternates: {
      canonical: `/page/${params.page}`,
      ...paginationLinks,
    },
    openGraph: {
      title: `${params.page}페이지 - secrett2633's blog`,
      description: `최신 포스트 목록 - ${params.page}페이지`,
      url: `/page/${params.page}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${params.page}페이지 - secrett2633's blog`,
      description: `최신 포스트 목록 - ${params.page}페이지`,
    },
    robots: {
      index: false,
      follow: true,
    },
  }
}

export default function PagedHome({ params }: PageProps) {
  const pageNum = Number(params.page)
  const currentPage = Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1
  const { posts, currentPage: validPage, totalPages } = getPaginatedPosts(currentPage, 20)

  return (
    <CommentCountProvider>
      <CollectionPageJsonLd
        name={`${currentPage}페이지 - secrett2633's blog`}
        description={`최신 포스트 목록 - ${currentPage}페이지`}
        url={`/page/${currentPage}`}
      />
      <BreadcrumbListJsonLd
        items={[
          { name: '홈', url: '/' },
          { name: `${currentPage}페이지`, url: `/page/${currentPage}` },
        ]}
      />
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 xl:w-72 order-1 lg:order-none">
            <Sidebar />
          </aside>
          <div className="flex-1">
            <h1 className="page__title mb-6">최신 포스트</h1>

            {posts.length === 0 ? (
              <div className="py-12">
                <p className="text-gray-500">아직 포스트가 없습니다.</p>
              </div>
            ) : (
              <>
                <div className="entries-list">
                  {posts.map((post) => (
                    <article key={post.id} className="archive__item">
                      <h2 className="archive__item-title">
                        <Link href={post.permalink || `/${post.id}`}>
                          {post.title}
                        </Link>
                      </h2>

                      {post.excerpt && (
                        <div className="archive__item-excerpt">
                          <Link href={post.permalink || `/${post.id}`}>
                            {post.excerpt}
                          </Link>
                        </div>
                      )}

                      <div className="archive__item-meta">
                        <time dateTime={post.date}>
                          {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
                        </time>
                        <CommentCount postPermalink={post.permalink || `/${post.id}`} />
                      </div>
                    </article>
                  ))}
                </div>

                <Pagination
                  currentPage={validPage}
                  totalPages={totalPages}
                  basePath="/"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </CommentCountProvider>
  )
}
