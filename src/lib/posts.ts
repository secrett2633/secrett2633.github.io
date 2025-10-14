import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'src', 'data')

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
        permalink: matterResult.data.permalink || `/${id}/`,
        toc: matterResult.data.toc || false,
        tocSticky: matterResult.data.toc_sticky || matterResult.data.tocSticky || false,
        published: matterResult.data.published !== false,
        contentHtml: '', // Will be populated when needed
      } as PostData
    })

    return allPostsData
      .filter((post) => post.published !== false)
      .sort((a, b) => {
        if (a.date < b.date) {
          return 1
        } else {
          return -1
        }
      })
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
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
      id,
      title: matterResult.data.title || 'Untitled',
      excerpt: matterResult.data.excerpt || '',
      date: matterResult.data.date || new Date().toISOString(),
      lastModifiedAt: matterResult.data.last_modified_at || matterResult.data.lastModifiedAt,
      categories: Array.isArray(matterResult.data.categories) ? matterResult.data.categories : [],
      tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
      permalink: matterResult.data.permalink || `/${id}/`,
      toc: matterResult.data.toc || false,
      tocSticky: matterResult.data.toc_sticky || matterResult.data.tocSticky || false,
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
