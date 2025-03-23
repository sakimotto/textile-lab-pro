import { ReactNode } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import Sidebar from './sidebar'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}
