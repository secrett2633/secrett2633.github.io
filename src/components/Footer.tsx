export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <div id="footer" className="page__footer">
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} secrett2633. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
