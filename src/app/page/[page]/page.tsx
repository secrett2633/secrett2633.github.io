import type { Metadata } from 'next'
import { getPaginatedPosts, POSTS_PER_PAGE } from '@/lib/posts'
import { generatePageMetadata } from '@/lib/metadata'
import Pagination from '@/components/Pagination'
import CommentCountProvider from '@/components/CommentCountProvider'
import { CollectionPageJsonLd, BreadcrumbListJsonLd } from '@/components/JsonLd'
import PageLayout from '@/components/PageLayout'
import PostArchiveList from '@/components/PostArchiveList'

export const dynamic = 'error'
export const revalidate = false

interface PageProps {
  params: { page: string }
}

export async function generateStaticParams() {
  const { totalPages } = getPaginatedPosts(1, POSTS_PER_PAGE)
  const pages: { page: string }[] = []
  for (let p = 2; p <= totalPages; p++) {
    pages.push({ page: String(p) })
  }
  return pages
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pageNum = parseInt(params.page)
  const { totalPages } = getPaginatedPosts(1, POSTS_PER_PAGE)

  const paginationLinks: Record<string, string> = {}
  if (pageNum > 1) {
    paginationLinks.prev = pageNum === 2 ? '/' : `/page/${pageNum - 1}`
  }
  if (pageNum < totalPages) {
    paginationLinks.next = `/page/${pageNum + 1}`
  }

  return generatePageMetadata({
    title: `${params.page}페이지`,
    description: `최신 포스트 목록 - ${params.page}페이지`,
    url: `/page/${params.page}`,
    noIndex: true,
    paginationLinks,
  })
}

export default function PagedHome({ params }: PageProps) {
  const pageNum = Number(params.page)
  const currentPage = Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1
  const { posts, currentPage: validPage, totalPages } = getPaginatedPosts(currentPage, POSTS_PER_PAGE)

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
      <PageLayout>
        <h1 className="page__title mb-6">최신 포스트</h1>

        {posts.length === 0 ? (
          <div className="py-12">
            <p className="text-gray-500">아직 포스트가 없습니다.</p>
          </div>
        ) : (
          <>
            <PostArchiveList posts={posts} />
            <Pagination
              currentPage={validPage}
              totalPages={totalPages}
              basePath="/"
            />
          </>
        )}
      </PageLayout>
    </CommentCountProvider>
  )
}
