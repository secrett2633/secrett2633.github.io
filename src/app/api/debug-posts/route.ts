import { NextResponse } from 'next/server'
import { getSortedPostsData } from '@/lib/posts'

export async function GET() {
  try {
    const posts = getSortedPostsData()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error in debug-posts API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
