// Debug component to test basic functionality
'use client'

import { useEffect, useState } from 'react'

export default function DebugPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Test if we can read the posts
    fetch('/api/debug-posts')
      .then(res => res.json())
      .then(data => {
        console.log('Posts data:', data)
        setPosts(data)
      })
      .catch(err => {
        console.error('Error fetching posts:', err)
        setError(err.message)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">디버그 페이지</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>에러:</strong> {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">포스트 데이터</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(posts, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">시스템 정보</h2>
          <ul className="space-y-2">
            <li><strong>Node.js 버전:</strong> {process.env.NODE_VERSION || 'Unknown'}</li>
            <li><strong>Next.js 버전:</strong> {process.env.NEXT_VERSION || 'Unknown'}</li>
            <li><strong>환경:</strong> {process.env.NODE_ENV || 'Unknown'}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
