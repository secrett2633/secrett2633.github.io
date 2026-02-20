import Link from 'next/link'
import { getPostsByCategory } from '@/lib/posts'
import { categoryGroups } from '@/lib/categories'

export default function Sidebar() {
  return (
    <div className="sidebar sticky">
      <nav className="space-y-4" aria-label="카테고리 네비게이션">
        {categoryGroups.map((category) => (
          <div key={category.title}>
            <p className="font-medium text-gray-900 mb-2">{category.title}</p>
            <ul className="space-y-1 ml-4">
              {category.children.map((child) => (
                <li key={child.title}>
                  <Link
                    href={child.url}
                    className="text-sm text-gray-600 hover:text-primary-600 block py-1"
                  >
                    {child.title} ({getPostsByCategory(child.title).length})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}
