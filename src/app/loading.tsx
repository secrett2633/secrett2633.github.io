export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen" role="status" aria-label="로딩 중">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      <span className="sr-only">로딩 중...</span>
    </div>
  )
}
