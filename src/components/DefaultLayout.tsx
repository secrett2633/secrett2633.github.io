import Masthead from '@/components/Masthead'
import Footer from '@/components/Footer'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Masthead />
      <div className="initial-content">
        {children}
      </div>
      <Footer />
    </>
  )
}
