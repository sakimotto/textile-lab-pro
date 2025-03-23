'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Microscope, 
  FileText, 
  BarChart, 
  Calendar, 
  Users, 
  Settings,
  ClipboardList
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Microscope },
  { name: 'Samples', href: '/samples', icon: ClipboardList },
  { name: 'Tests', href: '/tests', icon: FileText },
  { name: 'Reports', href: '/reports', icon: BarChart },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-card border-r print:hidden">
      <div className="flex flex-col h-full">
        <div className="flex-1 px-4 space-y-2 py-4">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Microscope className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">TextileLab Pro</p>
              <p className="text-xs text-muted-foreground">Quality Assurance Lab</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
