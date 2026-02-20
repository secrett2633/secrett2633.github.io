'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface CommentCountContextType {
  commentCounts: Record<string, number>
  loading: boolean
}

const CommentCountContext = createContext<CommentCountContextType>({
  commentCounts: {},
  loading: true,
})

export const useCommentCount = () => useContext(CommentCountContext)

// 캐시 관리
interface CacheData {
  counts: Record<string, number>
  timestamp: number
}

const CACHE_KEY = 'comment_counts_cache'
const CACHE_DURATION = 10 * 60 * 1000 // 10분 (밀리초)

interface CommentCountProviderProps {
  children: ReactNode
  repoOwner?: string
  repoName?: string
}

export default function CommentCountProvider({
  children,
  repoOwner = 'secrett2633',
  repoName = 'secrett2633.github.io',
}: CommentCountProviderProps) {
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAllCommentCounts() {
      try {
        // 캐시 확인
        const cachedData = localStorage.getItem(CACHE_KEY)
        if (cachedData) {
          try {
            const parsed: CacheData = JSON.parse(cachedData)
            const now = Date.now()
            
            // 캐시가 유효한지 확인 (10분 이내)
            if (now - parsed.timestamp < CACHE_DURATION) {
              setCommentCounts(parsed.counts)
              setLoading(false)
              return
            }
          } catch (error) {
            console.warn('Failed to parse cache:', error)
            localStorage.removeItem(CACHE_KEY)
          }
        }

        // GitHub REST API를 사용하여 모든 discussions를 페이지네이션으로 가져옵니다
        const counts: Record<string, number> = {}
        let nextUrl: string | null = `https://api.github.com/repos/${repoOwner}/${repoName}/discussions?per_page=100`

        // 모든 페이지를 순회
        while (nextUrl) {
          const response: Response = await fetch(nextUrl, {
            headers: {
              'Accept': 'application/vnd.github+json',
            },
          })

          if (!response.ok) {
            console.warn(`GitHub API returned ${response.status}`)
            setLoading(false)
            return
          }

          const discussions = await response.json()

          // 각 discussion에서 pathname을 추출하여 매핑
          for (const discussion of discussions) {
            try {
              // Giscus는 discussion title에 pathname을 저장합니다
              if (discussion.title) {
                // title을 정규화: 앞뒤 슬래시 추가
                let pathname = discussion.title.trim()
                
                // 앞에 슬래시가 없으면 추가
                if (!pathname.startsWith('/')) {
                  pathname = '/' + pathname
                }
                
                // 뒤에 슬래시가 없으면 추가
                if (!pathname.endsWith('/')) {
                  pathname = pathname + '/'
                }
                
                counts[pathname] = discussion.comments || 0
              }

              // body에서 URL을 찾아 pathname도 추출 (백업)
              if (discussion.body) {
                const urlMatch = discussion.body.match(/https?:\/\/[^\/\s]+(\/.+)/)
                if (urlMatch && urlMatch[1]) {
                  let pathname = urlMatch[1].split(/[\s\n#]/)[0].trim()
                  // 뒤에 슬래시가 없으면 추가
                  if (!pathname.endsWith('/')) {
                    pathname = pathname + '/'
                  }
                  counts[pathname] = discussion.comments || 0
                }
              }
            } catch (error) {
              // 개별 discussion 파싱 실패는 무시
              console.warn('Failed to parse discussion:', error)
            }
          }

          // Link 헤더에서 다음 페이지 URL 추출
          const linkHeader = response.headers.get('Link')
          nextUrl = null
          
          if (linkHeader) {
            const links = linkHeader.split(',')
            for (const link of links) {
              const match = link.match(/<([^>]+)>;\s*rel="next"/)
              if (match) {
                nextUrl = match[1]
                break
              }
            }
          }
        }

        setCommentCounts(counts)

        // 캐시에 저장
        const cacheData: CacheData = {
          counts,
          timestamp: Date.now(),
        }
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
        } catch (error) {
          console.warn('Failed to save cache:', error)
        }
      } catch (error) {
        console.warn('Failed to fetch comment counts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllCommentCounts()
  }, [repoOwner, repoName])

  return (
    <CommentCountContext.Provider value={{ commentCounts, loading }}>
      {children}
    </CommentCountContext.Provider>
  )
}
