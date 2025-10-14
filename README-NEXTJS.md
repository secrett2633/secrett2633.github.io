# Jekyll to Next.js 14 블로그 마이그레이션

이 프로젝트는 기존 Jekyll 블로그를 Next.js 14로 마이그레이션한 결과입니다.

## 🚀 주요 변경사항

### 기술 스택 변경
- **Jekyll** → **Next.js 14** (App Router)
- **Liquid 템플릿** → **React 컴포넌트**
- **SCSS** → **Tailwind CSS**
- **Ruby** → **TypeScript**

### 디자인 유지
- 기존 Minimal Mistakes 테마의 디자인을 그대로 유지
- 커스텀 스크롤바 스타일 포함
- 반응형 레이아웃 유지
- 사이드바 네비게이션 구조 유지

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── [...slug]/         # 동적 포스트 라우팅
│   ├── categories/         # 카테고리 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # React 컴포넌트
│   ├── DefaultLayout.tsx  # 기본 레이아웃
│   ├── Masthead.tsx       # 헤더 네비게이션
│   ├── Sidebar.tsx        # 사이드바
│   └── Footer.tsx         # 푸터
├── lib/                   # 유틸리티 함수
│   └── posts.ts           # 포스트 처리 로직
├── data/                  # 마크다운 포스트 파일
└── styles/                # 스타일 파일
    └── globals.css        # 글로벌 스타일
```

## 🛠️ 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 프로덕션 빌드
```bash
npm run build
```

### 4. 정적 파일 내보내기 (GitHub Pages용)
```bash
npm run export
```

## 📝 포스트 작성

새로운 포스트를 작성하려면 `src/data/` 디렉토리에 마크다운 파일을 추가하세요.

### 포스트 파일 형식
```markdown
---
title: "포스트 제목"
excerpt: "포스트 요약"
categories:
  - Category1
tags:
  - [Tag1, Tag2]
permalink: /category/post-title/
toc: true
toc_sticky: true
date: 2025-01-01 23:10:11+0900
last_modified_at: 2025-01-01 23:10:14+0900
published: true
---

포스트 내용...
```

## 🌐 배포

### GitHub Pages 배포
1. `npm run export` 실행
2. `out` 디렉토리의 내용을 GitHub Pages에 업로드
3. `.nojekyll` 파일을 루트에 추가

### Vercel 배포
1. Vercel에 프로젝트 연결
2. 자동 배포 설정

## 🔧 주요 기능

- ✅ 정적 사이트 생성 (SSG)
- ✅ 마크다운 포스트 지원
- ✅ 카테고리 및 태그 시스템
- ✅ 반응형 디자인
- ✅ 검색 기능 (추후 구현 예정)
- ✅ 댓글 시스템 (추후 구현 예정)
- ✅ SEO 최적화

## 📚 마이그레이션된 기능

### 레이아웃
- `_layouts/default.html` → `DefaultLayout.tsx`
- `_layouts/home.html` → `page.tsx`
- `_layouts/single.html` → `[...slug]/page.tsx`

### 컴포넌트
- `_includes/masthead.html` → `Masthead.tsx`
- `_includes/sidebar.html` → `Sidebar.tsx`
- `_includes/footer.html` → `Footer.tsx`

### 스타일
- `_sass/minimal-mistakes.scss` → `globals.css` (Tailwind CSS)
- 커스텀 스크롤바 스타일 유지

### 데이터
- `_posts/` → `src/data/`
- `_data/navigation.yml` → 하드코딩된 네비게이션

## 🎨 디자인 특징

- **색상**: Plum 테마 기반의 보라색 계열
- **타이포그래피**: Inter 폰트 사용
- **레이아웃**: 사이드바가 있는 2컬럼 레이아웃
- **반응형**: 모바일에서는 사이드바가 하단으로 이동

## 🔮 향후 개선 계획

- [ ] 검색 기능 구현
- [ ] 댓글 시스템 통합
- [ ] RSS 피드 생성
- [ ] 사이트맵 자동 생성
- [ ] 다크 모드 지원
- [ ] 포스트 페이지네이션
- [ ] 관련 포스트 추천

## 📄 라이선스

MIT License - 기존 Jekyll 블로그와 동일한 라이선스 정책을 따릅니다.
