import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'src', 'data')

// 빌드 시 성능 최적화를 위한 메모이제이션 캐시
let sortedPostsCache: PostData[] | null = null
let postsCacheTimestamp = 0

// 댓글 인터페이스
export interface Comment {
  id: string
  author: string
  content: string
  date: string
  parentId?: string // 대댓글을 위한 부모 댓글 ID
  email?: string // 이메일 (선택사항)
  website?: string // 웹사이트 URL (선택사항)
}

// frontmatter에서 댓글 추출하는 헬퍼 함수
function extractCommentsFromMatter(matterResult: matter.GrayMatterFile<string>): Comment[] {
  try {
    const commentsData = matterResult.data.comments
    
    // comments가 없거나 배열이 아니면 빈 배열 반환
    if (!commentsData) {
      return []
    }
    
    // gray-matter가 배열을 객체로 변환할 수 있으므로 확인
    let commentsArray: any[] = []
    if (Array.isArray(commentsData)) {
      commentsArray = commentsData
    } else if (typeof commentsData === 'object' && commentsData !== null) {
      // 객체인 경우 값들을 배열로 변환
      commentsArray = Object.values(commentsData)
    } else {
      return []
    }
    
    // Comment 형식으로 변환 및 검증
    const comments: Comment[] = commentsArray
      .filter((comment: any) => {
        // 필수 필드 검증 (date는 string 또는 Date 객체일 수 있음)
        return (
          comment &&
          typeof comment === 'object' &&
          typeof comment.id === 'string' &&
          typeof comment.author === 'string' &&
          typeof comment.content === 'string' &&
          (typeof comment.date === 'string' || comment.date instanceof Date)
        )
      })
      .map((comment: any) => ({
        id: comment.id,
        author: comment.author,
        content: comment.content,
        // date가 Date 객체인 경우 ISO 문자열로 변환, 아니면 그대로 사용
        date: comment.date instanceof Date ? comment.date.toISOString() : comment.date,
        parentId: comment.parentId || undefined,
        email: comment.email || undefined,
        website: comment.website || undefined,
      }))
    
    // 날짜순으로 정렬 (오래된 것부터)
    return comments.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  } catch (error) {
    // 개발 환경에서만 에러 로그
    if (process.env.NODE_ENV === 'development') {
      console.error('Error extracting comments:', error)
    }
    return []
  }
}

export interface PostData {
  id: string
  title: string
  excerpt?: string
  date: string
  lastModifiedAt?: string
  categories?: string[]
  tags?: string[]
  permalink?: string
  toc?: boolean
  tocSticky?: boolean
  published?: boolean
  contentHtml: string
  comments?: Comment[]
  commentCount?: number
}

export function getAllPostIds(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map((fileName) => {
      return fileName.replace(/\.md$/, '')
    })
  } catch (error) {
    console.error('Error reading posts directory:', error)
    return []
  }
}

export function getSortedPostsData(): PostData[] {
  // 프로덕션 빌드 시 캐시 사용 (빌드 속도 최적화)
  const now = Date.now()
  if (sortedPostsCache && process.env.NODE_ENV === 'production') {
    return sortedPostsCache
  }
  
  // 개발 모드에서는 5초 캐시 (파일 변경 감지)
  if (sortedPostsCache && process.env.NODE_ENV === 'development' && now - postsCacheTimestamp < 5000) {
    return sortedPostsCache
  }
  
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      
      // 댓글 정보 추출
      const comments = extractCommentsFromMatter(matterResult)

      return {
        id,
        title: matterResult.data.title || 'Untitled',
        excerpt: matterResult.data.excerpt || '',
        date: matterResult.data.date || new Date().toISOString(),
        lastModifiedAt: matterResult.data.last_modified_at || matterResult.data.lastModifiedAt,
        categories: Array.isArray(matterResult.data.categories) ? matterResult.data.categories : [],
        tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
        permalink: (matterResult.data.permalink || `/${id}`).replace(/\/$/, ''),
        toc: matterResult.data.toc || false,
        tocSticky: matterResult.data.toc_sticky || matterResult.data.tocSticky || false,
        published: matterResult.data.published !== false,
        contentHtml: '', // Will be populated when needed
        comments,
        commentCount: comments.length,
      } as PostData
    })

    const sortedPosts = allPostsData
      .filter((post) => post.published !== false)
      .sort((a, b) => {
        if (a.date < b.date) {
          return 1
        } else {
          return -1
        }
      })
    
    // 캐시 저장
    sortedPostsCache = sortedPosts
    postsCacheTimestamp = now
    
    return sortedPosts
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export async function getPostData(id: string): Promise<PostData> {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(matterResult.content)

    // HTML 후처리: 이미지 lazy loading, 외부 링크 rel 속성, 헤딩 ID 추가
    const contentHtml = processedContent.toString()
      .replace(/<img(?![^>]*loading=)/g, '<img loading="lazy" decoding="async"')
      .replace(/<a\s+href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"')
      .replace(/<(h[1-6])>(.*?)<\/h[1-6]>/g, (match, tag, content) => {
        const id = content.replace(/<[^>]*>/g, '').trim()
          .toLowerCase()
          .replace(/[^\w\s가-힣-]/g, '')
          .replace(/\s+/g, '-')
        return `<${tag} id="${id}"><a href="#${id}">${content}</a></${tag}>`
      })
    
    // 댓글 정보 추출
    const comments = extractCommentsFromMatter(matterResult)

    return {
      id,
      title: matterResult.data.title || 'Untitled',
      excerpt: matterResult.data.excerpt || '',
      date: matterResult.data.date || new Date().toISOString(),
      lastModifiedAt: matterResult.data.last_modified_at || matterResult.data.lastModifiedAt,
      categories: Array.isArray(matterResult.data.categories) ? matterResult.data.categories : [],
      tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
      permalink: (matterResult.data.permalink || `/${id}`).replace(/\/$/, ''),
      toc: matterResult.data.toc || false,
      tocSticky: matterResult.data.toc_sticky || matterResult.data.tocSticky || false,
      published: matterResult.data.published !== false,
      contentHtml,
      comments,
      commentCount: comments.length,
    } as PostData
  } catch (error) {
    console.error('Error reading post:', error)
    throw new Error(`Post not found: ${id}`)
  }
}

export function getPostsByCategory(category: string): PostData[] {
  const allPosts = getSortedPostsData()
  return allPosts.filter((post) => 
    post.categories && post.categories.includes(category)
  )
}

export function getAllTags(): string[] {
  const allPosts = getSortedPostsData()
  const tagSet = new Set<string>()
  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (typeof tag === 'string' && tag.trim()) {
        tagSet.add(tag.trim())
      }
    })
  })
  return Array.from(tagSet).sort()
}

export function getPostsByTag(tag: string): PostData[] {
  const allPosts = getSortedPostsData()
  return allPosts.filter((post) => 
    post.tags && post.tags.includes(tag)
  )
}

export interface PaginatedPosts {
  posts: PostData[]
  currentPage: number
  totalPages: number
  totalPosts: number
}

export function getPaginatedPosts(page: number = 1, postsPerPage: number = 20): PaginatedPosts {
  const allPosts = getSortedPostsData()
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  
  // 페이지 번호 유효성 검사
  const validPage = Math.max(1, Math.min(page, totalPages))
  
  const startIndex = (validPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const posts = allPosts.slice(startIndex, endIndex)
  
  return {
    posts,
    currentPage: validPage,
    totalPages,
    totalPosts
  }
}

export function getPaginatedPostsByCategory(category: string, page: number = 1, postsPerPage: number = 20): PaginatedPosts {
  const allPosts = getPostsByCategory(category)
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  
  // 페이지 번호 유효성 검사
  const validPage = Math.max(1, Math.min(page, totalPages))
  
  const startIndex = (validPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const posts = allPosts.slice(startIndex, endIndex)
  
  return {
    posts,
    currentPage: validPage,
    totalPages,
    totalPosts
  }
}
