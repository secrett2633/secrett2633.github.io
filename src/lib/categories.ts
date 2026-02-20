export interface CategoryChild {
  title: string
  url: string
}

export interface CategoryGroup {
  title: string
  children: CategoryChild[]
}

// 카테고리 경로 -> 표시 이름 매핑 (단일 소스)
export const categoryMapping: Record<string, string> = {
  'backend/django': 'Django',
  'backend/logging': 'Logging',
  'python/pep': 'PEP',
  'ai/llm': 'LLM',
  'ai/review': 'Review',
  'devops/nginx': 'Nginx',
  'devops/docker': 'Docker',
  'devops/safeline': 'SafeLine',
  'devops/jenkins': 'Jenkins',
  'devops/github-actions': 'GitHub Actions',
  'devops/aws': 'AWS',
  'etc/me': 'Me',
  'etc/chrome-extension': 'Chrome Extension',
}

// 역방향 매핑: categoryName -> path
export const categoryPathMapping: Record<string, string> = Object.fromEntries(
  Object.entries(categoryMapping).map(([path, name]) => [name, path])
)

// 카테고리 경로 목록 (sitemap 등에서 사용)
export const categoryPaths: string[] = Object.keys(categoryMapping)

// 사이드바용 그룹화된 카테고리
export const categoryGroups: CategoryGroup[] = [
  {
    title: 'Backend',
    children: [
      { title: 'Django', url: '/backend/django' },
      { title: 'Logging', url: '/backend/logging' },
    ],
  },
  {
    title: 'Python',
    children: [
      { title: 'PEP', url: '/python/pep' },
    ],
  },
  {
    title: 'AI/ML',
    children: [
      { title: 'LLM', url: '/ai/llm' },
      { title: 'Review', url: '/ai/review' },
    ],
  },
  {
    title: 'DevOps',
    children: [
      { title: 'Nginx', url: '/devops/nginx' },
      { title: 'Docker', url: '/devops/docker' },
      { title: 'SafeLine', url: '/devops/safeline' },
      { title: 'Jenkins', url: '/devops/jenkins' },
      { title: 'GitHub Actions', url: '/devops/github-actions' },
      { title: 'AWS', url: '/devops/aws' },
    ],
  },
  {
    title: 'etc',
    children: [
      { title: 'Me', url: '/etc/me' },
      { title: 'Chrome Extension', url: '/etc/chrome-extension' },
    ],
  },
]
