/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/secrett2633.github.io' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/secrett2633.github.io' : '',
  // 개발 모드에서 export 설정 비활성화
  ...(process.env.NODE_ENV === 'development' && {
    output: undefined,
    assetPrefix: undefined,
    basePath: undefined
  })
}

module.exports = nextConfig
