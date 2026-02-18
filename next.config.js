/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true
  },
  // 병렬 빌드 워커 수 증가 (빌드 속도 향상)
  experimental: {
    workerThreads: true,
    cpus: 4
  },
  // GitHub Pages 루트 도메인에서는 basePath와 assetPrefix가 필요하지 않음
  // 개발 모드에서 export 설정 비활성화
  ...(process.env.NODE_ENV === 'development' && {
    output: undefined
  })
}

module.exports = nextConfig
