'use client'

import Giscus from '@giscus/react'

interface CommentsProps {
  postPermalink: string
  postId: string
}

export default function Comments({ postPermalink, postId }: CommentsProps) {
  return (
    <section className="comments-section mt-12 pt-8 border-t border-gray-200">      
      <Giscus
        repo="secrett2633/secrett2633.github.io"
        repoId="R_kgDONkmJow"
        category="General"
        categoryId="DIC_kwDONkmJo84C02zj"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="ko"
        loading="lazy"
      />
    </section>
  )
}

