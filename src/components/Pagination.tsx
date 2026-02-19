'use client'

import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
}

export default function Pagination({ currentPage, totalPages, basePath = '' }: PaginationProps) {
  // 경로 기반 페이지네이션 링크 생성 (/page/N). 1 페이지는 기본 경로 사용
  const createPageUrl = (page: number) => {
    const normalizedBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath
    if (page === 1) {
      return normalizedBase || '/'
    }
    return `${normalizedBase || ''}/page/${page}`
  }

  // 페이지 번호 배열 생성 (현재 페이지 주변의 페이지들)
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 적으면 모든 페이지 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 첫 페이지
      pages.push(1)
      
      if (currentPage > 3) {
        pages.push('...')
      }
      
      // 현재 페이지 주변
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...')
      }
      
      // 마지막 페이지
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className="pagination" aria-label="페이지 네비게이션">
      <div className="pagination__inner">
        {/* 이전 페이지 */}
        {currentPage > 1 && (
          <Link 
            href={createPageUrl(currentPage - 1)}
            className="pagination__prev"
            aria-label="이전 페이지"
          >
            Previous
          </Link>
        )}
        
        {/* 페이지 번호들 */}
        <div className="pagination__pages">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="pagination__ellipsis">
                  ...
                </span>
              )
            }
            
            const pageNum = page as number
            const isCurrentPage = pageNum === currentPage
            
            return (
              <Link
                key={pageNum}
                href={createPageUrl(pageNum)}
                className={`pagination__page ${isCurrentPage ? 'pagination__page--current' : ''}`}
                aria-label={`페이지 ${pageNum}`}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {pageNum}
              </Link>
            )
          })}
        </div>
        
        {/* 다음 페이지 */}
        {currentPage < totalPages && (
          <Link 
            href={createPageUrl(currentPage + 1)}
            className="pagination__next"
            aria-label="다음 페이지"
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  )
}
