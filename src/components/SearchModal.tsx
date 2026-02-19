'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { searchPosts, ClientPostData } from '@/lib/clientPosts'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<ClientPostData[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

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
      {/* 배경 오버레이 */}
      <div
        className="search-modal-overlay"
        onClick={onClose}
      />

      {/* 모달 컨테이너 */}
      <div className="search-modal-container">
        <div className="search-modal-content" ref={modalRef}>
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
                placeholder="제목, 요약, 내용으로 검색..."
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
                  {searchResults.length}개의 결과를 찾았습니다.
                </div>
                <div className="space-y-3">
                  {searchResults.map((post) => (
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
                      <div className="search-result-meta">
                        <span>{new Date(post.date).toLocaleDateString('ko-KR')}</span>
                      </div>
                    </Link>
                  ))}
                </div>
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
