import { getPaginatedPosts } from '@/lib/posts'
import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Sidebar from '@/components/Sidebar'
import Pagination from '@/components/Pagination'
import CommentCount from '@/components/CommentCount'
import CommentCountProvider from '@/components/CommentCountProvider'

// 정적 생성에서 동적 렌더링 허용하지 않음 (export 모드용)

export const dynamic = 'error'
export const revalidate = false

export default function Home() {
  const currentPage = 1
  const { posts, currentPage: validPage, totalPages, totalPosts } = getPaginatedPosts(currentPage, 20)

  return (
    <CommentCountProvider>
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 xl:w-72 order-1 lg:order-none">
            <Sidebar />
          </aside>
          <main className="flex-1">
            <h1 className="page__title mb-6">Recent Posts</h1>
            
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
                        <Link href={post.permalink || `/${post.id}/`}>
                          {post.title}
                        </Link>
                      </h2>
                      
                      {post.excerpt && (
                        <div className="archive__item-excerpt">
                          <Link href={post.permalink || `/${post.id}/`}>
                            {post.excerpt}
                          </Link>
                        </div>
                      )}
                      
                      <div className="archive__item-meta">
                        <time dateTime={post.date}>
                          {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
                        </time>
                        <CommentCount postPermalink={post.permalink || `/${post.id}/`} />
                      </div>
                    </article>
                  ))}
                </div>
                
                {/* 페이지네이션 */}
                <Pagination 
                  currentPage={validPage}
                  totalPages={totalPages}
                  basePath="/"
                />
              </>
            )}
          </main>
    
        </div>
      </div>
    </CommentCountProvider>
  )
}