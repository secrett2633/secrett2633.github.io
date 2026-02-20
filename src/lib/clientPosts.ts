// 클라이언트 사이드 검색용 경량 인덱스
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
