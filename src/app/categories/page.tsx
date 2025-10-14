import DefaultLayout from '@/components/DefaultLayout'
import Sidebar from '@/components/Sidebar'
import { getSortedPostsData } from '@/lib/posts'
import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export default function CategoriesPage() {
  const posts = getSortedPostsData()
  const categories = Array.from(new Set(posts.flatMap(post => post.categories || [])))

  return (
    <DefaultLayout>
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="flex-1">
          <h1 className="page__title">카테고리</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const categoryPosts = posts.filter(post => 
                post.categories && post.categories.includes(category)
              )
              
              return (
                <div key={category} className="archive__item">
                  <h2 className="archive__item-title">
                    <Link href={`/categories/${category.toLowerCase()}`}>
                      {category}
                    </Link>
                  </h2>
                  <p className="archive__item-excerpt">
                    {categoryPosts.length}개의 포스트
                  </p>
                </div>
              )
            })}
          </div>
        </main>
        
        <aside className="lg:w-80">
          <Sidebar />
        </aside>
      </div>
    </DefaultLayout>
  )
}
