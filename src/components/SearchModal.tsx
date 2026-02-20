'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { searchPosts, ClientPostData } from '@/lib/clientPosts'

const RESULTS_PER_PAGE = 10

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<ClientPostData[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const totalPages = Math.ceil(searchResults.length / RESULTS_PER_PAGE)
  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * RESULTS_PER_PAGE
    return searchResults.slice(start, start + RESULTS_PER_PAGE)
  }, [searchResults, currentPage])

  // 검색어 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // 페이지 변경 시 결과 영역 스크롤 초기화
  useEffect(() => {
    resultsRef.current?.scrollTo(0, 0)
  }, [currentPage])

  // 검색 로직 - 비동기 검색 (lazy-loaded index)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const timer = setTimeout(async () => {
      setIsSearching(true)
      const results = await searchPosts(searchQuery)
      setSearchResults(results)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // 모달이 열릴 때 input에 포커스
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
    if (!isOpen) {
      setSearchQuery('')
      setSearchResults([])
      setCurrentPage(1)
    }
  }, [isOpen])

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="search-modal" role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
      <div
        className="search-modal-overlay"
        onClick={onClose}
      />

      <div className="search-modal-container">
        <div className="search-modal-content" ref={resultsRef}>
          {/* 헤더 */}
          <div className="search-modal-header">
            <h2 id="search-modal-title" className="search-modal-title">게시글 검색</h2>
            <button
              onClick={onClose}
              className="search-modal-close"
              aria-label="검색 닫기"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 검색 입력 */}
          <div className="px-6 py-4">
            <div className="search-input-container">
              <div className="search-input-icon">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="제목, 태그, 내용으로 검색... (#태그명 으로 태그 검색)"
                aria-label="게시글 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* 검색 결과 */}
          <div className="search-results-container">
            {isSearching ? (
              <div className="search-placeholder" role="status">
                <span className="sr-only">검색 중...</span>
                검색 중...
              </div>
            ) : searchQuery.trim() && searchResults.length === 0 ? (
              <div className="search-no-results">
                검색 결과가 없습니다.
              </div>
            ) : searchResults.length > 0 ? (
              <div className="px-6 py-4">
                <div className="search-results-count">
                  {searchResults.length}개의 결과 (페이지 {currentPage}/{totalPages})
                </div>
                <div className="space-y-3">
                  {paginatedResults.map((post) => (
                    <Link
                      key={post.id}
                      href={post.permalink || `/${post.id}`}
                      onClick={onClose}
                      className="search-result-item"
                    >
                      <h3 className="search-result-title">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="search-result-excerpt">
                          {post.excerpt}
                        </p>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {post.tags.slice(0, 5).map((tag) => (
                            <span
                              key={tag}
                              className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded cursor-pointer hover:bg-blue-100 hover:text-blue-700"
                              onClick={(e) => {
                                e.preventDefault()
                                setSearchQuery(`#${tag}`)
                              }}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="search-result-meta">
                        <span>{new Date(post.date).toLocaleDateString('ko-KR')}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      이전
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let page: number
                      if (totalPages <= 5) {
                        page = i + 1
                      } else if (currentPage <= 3) {
                        page = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i
                      } else {
                        page = currentPage - 2 + i
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1.5 text-sm border rounded-md ${
                            currentPage === page
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      다음
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="search-placeholder">
                검색어를 입력해주세요.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
