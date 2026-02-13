const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postsDirectory = path.join(process.cwd(), 'src', 'data')
const cacheDirectory = path.join(process.cwd(), '.next-cache')
const cacheFile = path.join(cacheDirectory, 'permalink-cache.json')

console.log('🔍 Generating permalink cache...')

try {
  // 캐시 디렉토리 생성
  if (!fs.existsSync(cacheDirectory)) {
    fs.mkdirSync(cacheDirectory, { recursive: true })
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const permalinkMap = {}
  
  console.log(`📄 Processing ${fileNames.length} files...`)
  
  fileNames.forEach((fileName, index) => {
    if (!fileName.endsWith('.md')) return
    
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    
    try {
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      const rawPermalink = matterResult.data.permalink
      
      const effectivePath = rawPermalink && typeof rawPermalink === 'string' && rawPermalink.trim().length > 0
        ? rawPermalink
        : `/${id}/`
      
      const normalized = effectivePath.replace(/^\/+/, '').replace(/\/+$/, '')
      
      permalinkMap[id] = {
        slug: normalized.split('/'),
        permalink: effectivePath
      }
      
      // 진행 상황 표시 (매 500개마다)
      if ((index + 1) % 500 === 0) {
        console.log(`  ✓ Processed ${index + 1}/${fileNames.length} files`)
      }
    } catch (err) {
      console.error(`  ⚠️  Error processing ${fileName}:`, err.message)
      // 에러 발생 시 기본값 사용
      permalinkMap[id] = {
        slug: id.split('/'),
        permalink: `/${id}/`
      }
    }
  })
  
  // 캐시 파일 저장
  fs.writeFileSync(cacheFile, JSON.stringify(permalinkMap, null, 2))
  
  console.log(`✅ Permalink cache generated successfully!`)
  console.log(`   Total posts: ${Object.keys(permalinkMap).length}`)
  console.log(`   Cache file: ${cacheFile}`)
} catch (error) {
  console.error('❌ Error generating permalink cache:', error)
  process.exit(1)
}
