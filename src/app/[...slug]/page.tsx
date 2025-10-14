import DefaultLayout from '@/components/DefaultLayout'
import Sidebar from '@/components/Sidebar'
import { getAllPostIds, getPostData, getPaginatedPostsByCategory } from '@/lib/posts'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Pagination from '@/components/Pagination'

// 정적 생성에서 동적 렌더링 허용하지 않음 (export 모드용)

interface PostPageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  try {
    const postIds = getAllPostIds()
    
    const postParams = postIds.map((id) => {
      // Read each post frontmatter to honor custom permalink when present
      try {
        const fullPath = path.join(process.cwd(), 'src', 'data', `${id}.md`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        const rawPermalink = matterResult.data.permalink as string | undefined
        const effectivePath = rawPermalink && typeof rawPermalink === 'string' && rawPermalink.trim().length > 0
          ? rawPermalink
          : `/${id}/`
        const normalized = effectivePath.replace(/^\/+/, '').replace(/\/+$/, '')
        const slug = normalized.split('/')
        return { slug }
      } catch (_err) {
        // Fallback to id-based slug on any error
        const slug = id.split('/')
        return { slug }
      }
    })

    // Also include category landing paths required for export mode
    const categorySlugs = [
      'backend/django',
      'backend/logging',
      'python/pep',
      'ai-ml/llm',
      'ai-ml/review',
      'devops/nginx',
      'devops/docker',
      'devops/safeline',
      'devops/jenkins',
      'devops/github-actions',
      'devops/aws',
      'etc/me',
      'etc/chrome-extension',
    ]

    const categoryParams = categorySlugs.map((pathStr) => ({ slug: pathStr.split('/') }))

    return [...postParams, ...categoryParams]
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

export default async function PostPage({ params }: PostPageProps) {
  const slug = params.slug.join('/')
  
  // 카테고리 경로 처리 (예: /backend/django -> Django 카테고리)
  const categoryMapping: { [key: string]: string } = {
    'backend/django': 'Django',
    'backend/logging': 'Logging',
    'python/pep': 'PEP',
    'ai-ml/llm': 'LLM',
    'ai-ml/review': 'Review',
    'devops/nginx': 'Nginx',
    'devops/docker': 'Docker',
    'devops/safeline': 'SafeLine',
    'devops/jenkins': 'Jenkins',
    'devops/github-actions': 'GitHub Actions',
    'devops/aws': 'AWS',
    'etc/me': 'Me',
    'etc/chrome-extension': 'Chrome Extension'
  }
  
  // 카테고리 경로인지 확인
  if (categoryMapping[slug]) {
    const categoryName = categoryMapping[slug]
    const { posts, currentPage: validPage, totalPages } = getPaginatedPostsByCategory(categoryName, 1, 20)
    
    return (
      <>
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 xl:w-72 order-1 lg:order-none">
              <Sidebar />
            </aside>
            <main className="flex-1">
              <h1 className="page__title mb-6">{categoryName}</h1>
              
              {posts.length === 0 ? (
                <div className="py-12">
                  <p className="text-gray-500">이 카테고리에 아직 포스트가 없습니다.</p>
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
                            {post.excerpt}
                          </div>
                        )}
                        
                        <div className="archive__item-meta">
                          <time dateTime={post.date}>
                            {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
                          </time>
                        </div>
                      </article>
                    ))}
                  </div>
                  
                  {/* 페이지네이션 */}
                  <Pagination 
                    currentPage={validPage}
                    totalPages={totalPages}
                    basePath={`/${slug}`}
                  />
                </>
              )}
            </main>
          </div>
        </div>
      </>
    )
  }
  
  // Find the post by matching permalink
  const postIds = getAllPostIds()
  let postId = ''
  
  try {
    // URL 디코딩된 slug와 원본 slug 모두 확인
    const decodedSlug = decodeURIComponent(slug)
    
    for (const id of postIds) {
      const fullPath = path.join(process.cwd(), 'src', 'data', `${id}.md`)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      const permalink = matterResult.data.permalink || `/${id}/`
      const normalizedPermalink = permalink.replace(/^\//, '').replace(/\/$/, '')
      
      // 원본 slug와 디코딩된 slug 모두 확인
      if (normalizedPermalink === slug || normalizedPermalink === decodedSlug) {
        postId = id
        break
      }
    }
    
    if (!postId) {
      // 개발 환경에서만 로그 출력 (빌드 시 경고 메시지 방지)
      if (process.env.NODE_ENV === 'development') {
        console.log(`Post not found for slug: ${slug}`)
      }
      // Return a custom message instead of 404
      return (
        <>
          <div className="flex flex-col lg:flex-row gap-8">
            <main className="flex-1">
              <article className="page">
                <header className="mb-8">
                  <h1 className="page__title">포스트를 찾을 수 없습니다</h1>
                </header>
                <div className="page__content">
                  <p className="text-gray-600">
                    요청하신 경로 <code className="bg-gray-100 px-2 py-1 rounded">/{slug}</code>에 해당하는 포스트가 존재하지 않습니다.
                  </p>
                  <p className="text-gray-600 mt-4">
                    <a href="/" className="text-blue-600 hover:text-blue-800 underline">
                      홈페이지로 돌아가기
                    </a>
                  </p>
                </div>
              </article>
            </main>
            
          </div>
        </>
      )
    }
  } catch (error) {
    console.error(`Error finding post for slug: ${slug}`, error)
    // Return a custom error message instead of 404
    return (
      <>
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1">
            <article className="page">
              <header className="mb-8">
                <h1 className="page__title">오류가 발생했습니다</h1>
              </header>
              <div className="page__content">
                <p className="text-gray-600">
                  포스트를 불러오는 중 오류가 발생했습니다.
                </p>
                <p className="text-gray-600 mt-4">
                  <a href="/" className="text-blue-600 hover:text-blue-800 underline">
                    홈페이지로 돌아가기
                  </a>
                </p>
              </div>
            </article>
          </main>
          
        </div>
      </>
    )
  }
  
  try {
    const postData = await getPostData(postId)
    
    return (
      <>
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1">
            <article className="page">
              <header className="mb-8">
                <h1 className="page__title">{postData.title}</h1>
                <div className="page__meta">
                  <time dateTime={postData.date}>
                    {format(new Date(postData.date), 'yyyy년 M월 d일', { locale: ko })}
                  </time>
                  {postData.lastModifiedAt && (
                    <span className="ml-4">
                      수정: {format(new Date(postData.lastModifiedAt), 'yyyy년 M월 d일', { locale: ko })}
                    </span>
                  )}
                </div>
              </header>

              <div className="page__content">
                <div 
                  dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                />
              </div>

              <footer className="page__meta mt-8">
                {postData.categories && postData.categories.length > 0 && (
                  <div className="page__taxonomy mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">카테고리</h4>
                    {postData.categories.map((category) => (
                      <span key={category} className="page__taxonomy-item">
                        {category}
                      </span>
                    ))}
                  </div>
                )}
                
                {postData.tags && postData.tags.length > 0 && (
                  <div className="page__taxonomy">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">태그</h4>
                    {postData.tags.map((tag) => (
                      <span key={tag} className="page__taxonomy-item">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </footer>
            </article>
          </main>
          
        </div>
      </>
    )
  } catch (error) {
    console.error(`Error loading post data for postId: ${postId}`, error)
    // Return a custom error message instead of 404
    return (
      <>
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1">
            <article className="page">
              <header className="mb-8">
                <h1 className="page__title">포스트를 불러올 수 없습니다</h1>
              </header>
              <div className="page__content">
                <p className="text-gray-600">
                  포스트 데이터를 불러오는 중 오류가 발생했습니다.
                </p>
                <p className="text-gray-600 mt-4">
                  <a href="/" className="text-blue-600 hover:text-blue-800 underline">
                    홈페이지로 돌아가기
                  </a>
                </p>
              </div>
            </article>
          </main>
          
        </div>
      </>
    )
  }
}
