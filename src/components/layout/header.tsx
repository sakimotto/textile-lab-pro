import { Microscope } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b print:hidden">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Microscope className="h-6 w-6" />
            <span className="text-xl font-bold">TextileLab Pro</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-sm font-medium hover:text-primary">Services</a>
            <a href="#about" className="text-sm font-medium hover:text-primary">About</a>
            <a href="#contact" className="text-sm font-medium hover:text-primary">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  )
}
