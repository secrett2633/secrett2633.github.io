'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { searchPosts, ClientPostData } from '@/lib/clientPosts'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<ClientPostData[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // 검색 로직 - 클라이언트 사이드에서 직접 검색
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    // 디바운싱을 위한 타이머
    const timer = setTimeout(() => {
      const results = searchPosts(searchQuery)
      setSearchResults(results)
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
    <div className="search-modal">
      {/* 배경 오버레이 */}
      <div 
        className="search-modal-overlay"
        onClick={onClose}
      />
      
      {/* 모달 컨테이너 */}
      <div className="search-modal-container">
        <div className="search-modal-content">
          {/* 헤더 */}
          <div className="search-modal-header">
            <h2 className="search-modal-title">게시글 검색</h2>
            <button
              onClick={onClose}
              className="search-modal-close"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 검색 입력 */}
          <div className="px-6 py-4">
            <div className="search-input-container">
              <div className="search-input-icon">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="제목, 요약, 내용으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* 검색 결과 */}
          <div className="search-results-container">
            {searchQuery.trim() && searchResults.length === 0 ? (
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
