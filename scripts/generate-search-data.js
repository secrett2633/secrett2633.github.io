const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postsDirectory = path.join(process.cwd(), 'src', 'data')
const outputPath = path.join(process.cwd(), 'src', 'lib', 'clientPosts.ts')

async function generateSearchData() {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const searchData = []
    
    for (const fileName of fileNames) {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      // HTML로 변환된 콘텐츠 생성 (동적 import 사용)
      const { remark } = await import('remark')
      const html = await import('remark-html')
      const processedContent = await remark()
        .use(html.default)
        .process(matterResult.content)
      const contentHtml = processedContent.toString()

      searchData.push({
        id,
        title: matterResult.data.title || 'Untitled',
        excerpt: matterResult.data.excerpt || '',
        date: matterResult.data.date || new Date().toISOString(),
        permalink: (matterResult.data.permalink || `/${id}`).replace(/\/$/, ''),
        contentHtml: contentHtml
      })
    }

    const searchDataContent = `// 클라이언트 사이드에서 사용할 posts 데이터
// 이 파일은 빌드 시점에 posts 데이터를 JSON으로 변환하여 생성됩니다.

export interface ClientPostData {
  id: string
  title: string
  excerpt?: string
  date: string
  permalink?: string
  contentHtml: string
}

// 빌드 시점에 생성된 posts 데이터
export const clientPostsData: ClientPostData[] = ${JSON.stringify(searchData, null, 2)}

// 검색 함수
export function searchPosts(query: string): ClientPostData[] {
  if (!query.trim()) {
    return []
  }

  const searchQuery = query.toLowerCase()
  
  return clientPostsData.filter(post => 
    post.title.toLowerCase().includes(searchQuery) ||
    post.excerpt?.toLowerCase().includes(searchQuery) ||
    post.contentHtml.toLowerCase().includes(searchQuery)
  )
}`

    fs.writeFileSync(outputPath, searchDataContent)
    console.log(`✅ Search data generated: ${searchData.length} posts`)
  } catch (error) {
    console.error('❌ Error generating search data:', error)
    process.exit(1)
  }
}

generateSearchData().catch(console.error)
