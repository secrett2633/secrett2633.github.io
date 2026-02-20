import type { Metadata } from 'next'
import { getPaginatedPosts, POSTS_PER_PAGE } from '@/lib/posts'
import Pagination from '@/components/Pagination'
import CommentCountProvider from '@/components/CommentCountProvider'
import { CollectionPageJsonLd } from '@/components/JsonLd'
import PageLayout from '@/components/PageLayout'
import PostArchiveList from '@/components/PostArchiveList'

// 정적 생성에서 동적 렌더링 허용하지 않음 (export 모드용)

export const dynamic = 'error'
export const revalidate = false

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  const currentPage = 1
  const { posts, currentPage: validPage, totalPages } = getPaginatedPosts(currentPage, POSTS_PER_PAGE)

  return (
    <CommentCountProvider>
      <CollectionPageJsonLd
        name="secrett2633's blog - Recent Posts"
        description="기술 블로그 - Django, Python, DevOps, AI/ML 관련 최신 포스트"
        url="/"
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
