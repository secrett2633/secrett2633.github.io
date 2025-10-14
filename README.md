# secrett2633's Blog

Next.js 기반 기술 블로그입니다.

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 정적 파일 생성 (GitHub Pages용)
npm run export
```

## 배포

GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

- `main` 또는 `master` 브랜치에 푸시하면 자동으로 빌드 및 배포됩니다.
- 빌드된 파일은 `out` 폴더에 생성됩니다.

## 기술 스택

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown (gray-matter)
- **Deployment**: GitHub Pages
