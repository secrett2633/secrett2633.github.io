import DefaultLayout from '@/components/DefaultLayout'
import Sidebar from '@/components/Sidebar'
import { getPostsByCategory } from '@/lib/posts'
import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const categories = ['me', 'django', 'logging', 'pep', 'llm', 'review', 'nginx', 'docker', 'safeline', 'jenkins', 'github-actions', 'aws', 'chrome-extension']
  
  return categories.map((category) => ({
    category: category
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1)
  const posts = getPostsByCategory(categoryName)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="flex-1">
          <h1 className="page__title">{categoryName} 카테고리</h1>
          
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
                    {post.excerpt}
                  </div>
                )}
                
                <div className="archive__item-meta">
                  <time dateTime={post.date}>
                    {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
                  </time>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="page__taxonomy mt-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="page__taxonomy-item">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </main>
        
        <aside className="lg:w-80">
          <Sidebar />
        </aside>
      </div>
    </DefaultLayout>
  )
}
