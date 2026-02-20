import { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'

interface PageLayoutProps {
  children: ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 xl:w-72 order-1 lg:order-none">
          <Sidebar />
        </aside>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
