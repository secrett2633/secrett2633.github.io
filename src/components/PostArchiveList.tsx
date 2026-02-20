import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import CommentCount from '@/components/CommentCount'
import type { PostData } from '@/lib/posts'

interface PostArchiveListProps {
  posts: PostData[]
}

export default function PostArchiveList({ posts }: PostArchiveListProps) {
  return (
    <div className="entries-list">
      {posts.map((post) => (
        <article key={post.id} className="archive__item">
          <h2 className="archive__item-title">
            <Link href={post.permalink || `/${post.id}`}>
              {post.title}
            </Link>
          </h2>

          {post.excerpt && (
            <div className="archive__item-excerpt">
              <Link href={post.permalink || `/${post.id}`}>
                {post.excerpt}
              </Link>
            </div>
          )}

          <div className="archive__item-meta">
            <time dateTime={post.date}>
              {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
            </time>
            <CommentCount postPermalink={post.permalink || `/${post.id}`} />
          </div>
        </article>
      ))}
    </div>
  )
}
