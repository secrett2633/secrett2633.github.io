import type { Metadata } from 'next'
import { getAllTags, getPostsByTag } from '@/lib/posts'
import { generatePageMetadata } from '@/lib/metadata'
import CommentCountProvider from '@/components/CommentCountProvider'
import { CollectionPageJsonLd, BreadcrumbListJsonLd } from '@/components/JsonLd'
import Breadcrumb from '@/components/Breadcrumb'
import PageLayout from '@/components/PageLayout'
import PostArchiveList from '@/components/PostArchiveList'

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
  return generatePageMetadata({
    title: `#${tag}`,
    description: `${tag} 태그가 포함된 포스트 목록`,
    url: `/tags/${params.tag}`,
  })
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
      <PageLayout>
        <Breadcrumb items={[{ name: `#${tag}`, href: `/tags/${params.tag}` }]} />
        <h1 className="page__title mb-6">#{tag}</h1>
        <p className="text-gray-500 mb-6">{posts.length}개의 포스트</p>

        {posts.length === 0 ? (
          <div className="py-12">
            <p className="text-gray-500">이 태그에 해당하는 포스트가 없습니다.</p>
          </div>
        ) : (
          <PostArchiveList posts={posts} />
        )}
      </PageLayout>
    </CommentCountProvider>
  )
}
