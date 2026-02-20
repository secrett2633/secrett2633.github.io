'use client'

import Link from 'next/link'

const MAX_VISIBLE_PAGES = 5

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
}

export default function Pagination({ currentPage, totalPages, basePath = '' }: PaginationProps) {
  const createPageUrl = (page: number) => {
    const normalizedBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath
    if (page === 1) {
      return normalizedBase || '/'
    }
    return `${normalizedBase || ''}/page/${page}`
  }

  const getPageNumbers = (): number[] => {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    if (currentPage <= 3) {
      return Array.from({ length: MAX_VISIBLE_PAGES }, (_, i) => i + 1)
    }
    if (currentPage >= totalPages - 2) {
      return Array.from({ length: MAX_VISIBLE_PAGES }, (_, i) => totalPages - MAX_VISIBLE_PAGES + 1 + i)
    }
    return Array.from({ length: MAX_VISIBLE_PAGES }, (_, i) => currentPage - 2 + i)
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className="pagination" aria-label="페이지 네비게이션">
      <div className="pagination__inner">
        <Link
          href={createPageUrl(Math.max(1, currentPage - 1))}
          className={`pagination__prev ${currentPage === 1 ? 'pointer-events-none opacity-40' : ''}`}
          aria-label="이전 페이지"
          aria-disabled={currentPage === 1}
        >
          이전
        </Link>

        <div className="pagination__pages">
          {getPageNumbers().map((page) => {
            const isCurrentPage = page === currentPage
            return (
              <Link
                key={page}
                href={createPageUrl(page)}
                className={`pagination__page ${isCurrentPage ? 'pagination__page--current' : ''}`}
                aria-label={`페이지 ${page}`}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {page}
              </Link>
            )
          })}
        </div>

        <Link
          href={createPageUrl(Math.min(totalPages, currentPage + 1))}
          className={`pagination__next ${currentPage === totalPages ? 'pointer-events-none opacity-40' : ''}`}
          aria-label="다음 페이지"
          aria-disabled={currentPage === totalPages}
        >
          다음
        </Link>
      </div>
    </nav>
  )
}
