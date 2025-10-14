export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold text-primary-600 mb-4">✅ 테스트 성공!</h1>
        <p className="text-gray-600 mb-6">
          Next.js 14 블로그가 정상적으로 작동하고 있습니다.
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>✓ TypeScript 설정 완료</p>
          <p>✓ Tailwind CSS 설정 완료</p>
          <p>✓ 컴포넌트 구조 완료</p>
          <p>✓ 라우팅 설정 완료</p>
        </div>
        <a 
          href="/"
          className="inline-block mt-6 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  )
}
