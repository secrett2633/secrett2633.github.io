import type { Metadata } from 'next'
import { getAllTags, getPostsByTag } from '@/lib/posts'
import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Sidebar from '@/components/Sidebar'
import CommentCount from '@/components/CommentCount'
import CommentCountProvider from '@/components/CommentCountProvider'
import { CollectionPageJsonLd, BreadcrumbListJsonLd } from '@/components/JsonLd'
import Breadcrumb from '@/components/Breadcrumb'

export const dynamic = 'error'
export const revalidate = false
export const dynamicParams = false

interface TagPageProps {
  params: { tag: string }
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)
  return {
    title: `#${tag} - secrett2633's blog`,
    description: `${tag} 태그가 포함된 포스트 목록`,
    alternates: {
      canonical: `/tags/${params.tag}`,
    },
    openGraph: {
      title: `#${tag} - secrett2633's blog`,
      description: `${tag} 태그가 포함된 포스트 목록`,
      url: `/tags/${params.tag}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `#${tag} - secrett2633's blog`,
      description: `${tag} 태그가 포함된 포스트 목록`,
    },
  }
}

export default function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)
  const posts = getPostsByTag(tag)

  return (
    <CommentCountProvider>
      <CollectionPageJsonLd
        name={`#${tag} - secrett2633's blog`}
        description={`${tag} 태그가 포함된 포스트 목록`}
        url={`/tags/${params.tag}`}
      />
      <BreadcrumbListJsonLd
        items={[
          { name: '홈', url: '/' },
          { name: `#${tag}`, url: `/tags/${params.tag}` },
        ]}
      />
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 xl:w-72 order-1 lg:order-none">
            <Sidebar />
          </aside>
          <div className="flex-1">
            <Breadcrumb items={[{ name: `#${tag}`, href: `/tags/${params.tag}` }]} />
            <h1 className="page__title mb-6">#{tag}</h1>
            <p className="text-gray-500 mb-6">{posts.length}개의 포스트</p>

            {posts.length === 0 ? (
              <div className="py-12">
                <p className="text-gray-500">이 태그에 해당하는 포스트가 없습니다.</p>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </CommentCountProvider>
  )
}
