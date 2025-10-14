import { getPostsByCategory } from '@/lib/posts'

const categories = [
  {
    title: "Backend",
    children: [
      { title: "Django", url: "/backend/django/" },
      { title: "Logging", url: "/backend/logging/" }
    ]
  },
  {
    title: "Python",
    children: [
      { title: "PEP", url: "/python/pep/" }
    ]
  },
  {
    title: "AI/ML",
    children: [
      { title: "LLM", url: "/ai/llm/" },
      { title: "Review", url: "/ai/review/" }
    ]
  },
  {
    title: "DevOps",
    children: [
      { title: "Nginx", url: "/devops/nginx/" },
      { title: "Docker", url: "/devops/docker/" },
      { title: "SafeLine", url: "/devops/safeline/" },
      { title: "Jenkins", url: "/devops/jenkins/" },
      { title: "GitHub Actions", url: "/devops/github-actions/" },
      { title: "AWS", url: "/devops/aws/" }
    ]
  },
  {
    title: "etc",
    children: [
      { title: "Me", url: "/etc/me/" },
      { title: "Chrome Extension", url: "/etc/chrome-extension/" }
    ]
  }
]

export default function Sidebar() {
  return (
    <div className="sidebar sticky">
      <nav className="space-y-4">
        {categories.map((category) => (
          <div key={category.title}>
            <h4 className="font-medium text-gray-900 mb-2">{category.title}</h4>
            <ul className="space-y-1 ml-4">
              {category.children.map((child) => (
                <li key={child.title}>
                  <a 
                    href={child.url}
                    className="text-sm text-gray-600 hover:text-primary-600 block py-1"
                  >
                    {child.title} ({getPostsByCategory(child.title).length})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}
