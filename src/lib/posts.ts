import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'src', 'data')

export const POSTS_PER_PAGE = 20
const DEV_CACHE_TTL_MS = 5000

// 빌드 시 성능 최적화를 위한 메모이제이션 캐시
let sortedPostsCache: PostData[] | null = null
let postsCacheTimestamp = 0

export interface PostData {
  id: string
  title: string
  excerpt?: string
  date: string
  lastModifiedAt?: string
  categories?: string[]
  tags?: string[]
  permalink?: string
  published?: boolean
  contentHtml: string
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

  // 개발 모드에서는 캐시 TTL 적용 (파일 변경 감지)
  if (sortedPostsCache && process.env.NODE_ENV === 'development' && now - postsCacheTimestamp < DEV_CACHE_TTL_MS) {
    return sortedPostsCache
  }

  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        id,
        title: matterResult.data.title || 'Untitled',
        excerpt: matterResult.data.excerpt || '',
        date: matterResult.data.date || new Date().toISOString(),
        lastModifiedAt: matterResult.data.last_modified_at || matterResult.data.lastModifiedAt,
        categories: Array.isArray(matterResult.data.categories) ? matterResult.data.categories : [],
        tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
        permalink: (matterResult.data.permalink || `/${id}`).replace(/\/$/, ''),
        published: matterResult.data.published !== false,
        contentHtml: '', // Will be populated when needed
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

    return {
      id,
      title: matterResult.data.title || 'Untitled',
      excerpt: matterResult.data.excerpt || '',
      date: matterResult.data.date || new Date().toISOString(),
      lastModifiedAt: matterResult.data.last_modified_at || matterResult.data.lastModifiedAt,
      categories: Array.isArray(matterResult.data.categories) ? matterResult.data.categories : [],
      tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
      permalink: (matterResult.data.permalink || `/${id}`).replace(/\/$/, ''),
      published: matterResult.data.published !== false,
      contentHtml,
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

export function getPaginatedPosts(page: number = 1, postsPerPage: number = POSTS_PER_PAGE): PaginatedPosts {
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

export function getPaginatedPostsByCategory(category: string, page: number = 1, postsPerPage: number = POSTS_PER_PAGE): PaginatedPosts {
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
