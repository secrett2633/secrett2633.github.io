/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 개발 모드에서 export 설정 비활성화
  ...(process.env.NODE_ENV === 'development' && {
    output: undefined
  })
}

module.exports = nextConfig
