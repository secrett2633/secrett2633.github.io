const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postsDirectory = path.join(process.cwd(), 'src', 'data')
const outputJsonPath = path.join(process.cwd(), 'public', 'search-index.json')
const outputTsPath = path.join(process.cwd(), 'src', 'lib', 'clientPosts.ts')

async function generateSearchData() {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const searchData = []

    for (const fileName of fileNames) {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      // HTML 대신 plain text만 추출 (경량 인덱스)
      const plainText = matterResult.content
        .replace(/```[\s\S]*?```/g, '') // 코드 블록 제거
        .replace(/`[^`]*`/g, '')        // 인라인 코드 제거
        .replace(/!\[.*?\]\(.*?\)/g, '') // 이미지 제거
        .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // 링크 텍스트만 유지
        .replace(/#{1,6}\s*/g, '')       // 헤딩 마커 제거
        .replace(/[*_~>-]/g, '')         // 마크다운 서식 제거
        .replace(/\s+/g, ' ')           // 공백 정리
        .trim()
        .slice(0, 200) // 검색용으로 앞 200자만

      searchData.push({
        id,
        title: matterResult.data.title || 'Untitled',
        excerpt: matterResult.data.excerpt || '',
        date: matterResult.data.date || new Date().toISOString(),
        permalink: (matterResult.data.permalink || `/${id}`).replace(/\/$/, ''),
        tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags.flat().filter(t => typeof t === 'string') : [],
        text: plainText,
      })
    }

    // JSON 파일로 public에 저장 (on-demand 로딩용)
    fs.writeFileSync(outputJsonPath, JSON.stringify(searchData))
    console.log(`✅ Search index generated: ${searchData.length} posts (${(Buffer.byteLength(JSON.stringify(searchData)) / 1024).toFixed(1)}KB)`)

    // TypeScript 래퍼 파일 생성 (인터페이스 + lazy loader)
    const tsContent = `// 클라이언트 사이드 검색용 경량 인덱스
// 이 파일은 빌드 시점에 자동 생성됩니다. 직접 수정하지 마세요.

export interface ClientPostData {
  id: string
  title: string
  excerpt?: string
  date: string
  permalink?: string
  tags?: string[]
  text?: string
}

let cachedData: ClientPostData[] | null = null

async function loadSearchIndex(): Promise<ClientPostData[]> {
  if (cachedData) return cachedData
  const res = await fetch('/search-index.json')
  cachedData = await res.json()
  return cachedData!
}

export async function searchPosts(query: string): Promise<ClientPostData[]> {
  if (!query.trim()) return []

  const data = await loadSearchIndex()
  const q = query.toLowerCase()

  // #태그 형태로 검색하면 태그만 정확히 매칭
  let results: ClientPostData[]
  if (q.startsWith('#') && q.length > 1) {
    const tagQuery = q.slice(1)
    results = data.filter(post =>
      post.tags?.some(t => t.toLowerCase() === tagQuery)
    )
  } else {
    results = data.filter(post =>
      post.title.toLowerCase().includes(q) ||
      post.excerpt?.toLowerCase().includes(q) ||
      post.tags?.some(t => t.toLowerCase().includes(q)) ||
      post.text?.toLowerCase().includes(q)
    )
  }

  return results.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
`

    fs.writeFileSync(outputTsPath, tsContent)
    console.log('✅ Client search module generated')
  } catch (error) {
    console.error('❌ Error generating search data:', error)
    process.exit(1)
  }
}

generateSearchData().catch(console.error)
