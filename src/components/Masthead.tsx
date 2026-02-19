'use client'

import { useState } from 'react'
import Link from 'next/link'
import SearchModal from './SearchModal'

const navigation = {
  main: [
    { title: 'GitHub', url: 'https://github.com/secrett2633' }
  ]
}

export default function Masthead() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="masthead">
      <div className="masthead__inner-wrap">
        <div className="masthead__menu">
          <nav id="site-nav" className="greedy-nav" aria-label="메인 네비게이션">
            <Link href="/" className="site-title">
              secrett2633's blog
            </Link>
            
            <div className="flex items-center space-x-4">
              <ul className="visible-links">
                {navigation.main.map((link) => (
                  <li key={link.title} className="masthead__menu-item">
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>

              <button
                className="search__toggle"
                type="button"
                aria-label="검색"
                onClick={() => setIsSearchOpen(true)}
              >
                <svg className="icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.99 16">
                  <path d="M15.5,13.12L13.19,10.8a1.69,1.69,0,0,0-1.28-.55l-0.06-.06A6.5,6.5,0,0,0,5.77,0,6.5,6.5,0,0,0,2.46,11.59a6.47,6.47,0,0,0,7.74.26l0.05,0.05a1.65,1.65,0,0,0,.5,1.24l2.38,2.38A1.68,1.68,0,0,0,15.5,13.12ZM6.4,2A4.41,4.41,0,1,1,2,6.4,4.43,4.43,0,0,1,6.4,2Z" transform="translate(-.01)"></path>
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>
      
      {/* 검색 모달 */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  )
}
