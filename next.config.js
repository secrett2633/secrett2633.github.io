/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages 루트 도메인에서는 basePath와 assetPrefix가 필요하지 않음
  // 개발 모드에서 export 설정 비활성화
  ...(process.env.NODE_ENV === 'development' && {
    output: undefined
  })
}

module.exports = nextConfig
