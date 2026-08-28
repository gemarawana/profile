'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, LayoutDashboard } from 'lucide-react'
import { ADMIN_NAV } from '@/lib/constants/cms'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  async function handleSignOut() {
    setSigningOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  const Nav = (
    <nav className="flex h-full flex-col">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-[#E8E5E0] px-5 py-4">
        <div>
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 font-display text-sm font-black tracking-wider text-[#8B1A1A]"
          >
            <LayoutDashboard className="h-4 w-4" />
            GEMARAWANA CMS
          </Link>
          <p className="mt-1 truncate text-xs text-[#6B5A5A]">{email}</p>
        </div>
        {/* Close button for mobile drawer */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
          aria-label="Tutup menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {ADMIN_NAV.map(section => {
          if ('href' in section) {
            const active = pathname === section.href
            return (
              <Link
                key={section.href}
                href={section.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'mb-1 block rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                  active ? 'bg-[#8B1A1A]/10 text-[#8B1A1A]' : 'text-[#3A2A2A] hover:bg-[#F4F3F0]'
                )}
              >
                {section.title}
              </Link>
            )
          }

          return (
            <div key={section.title} className="mb-4">
              <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-[#6B5A5A]">
                {section.title}
              </p>
              {section.items.map(item => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'mb-0.5 block rounded-lg px-3 py-2 text-sm transition-colors',
                      active ? 'bg-[#8B1A1A]/10 font-semibold text-[#8B1A1A]' : 'text-[#3A2A2A] hover:bg-[#F4F3F0]'
                    )}
                  >
                    {item.title}
                  </Link>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-[#E8E5E0] p-3">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          size="sm"
          disabled={signingOut}
          onClick={handleSignOut}
        >
          {signingOut ? 'Signing out…' : 'Sign out'}
        </Button>
      </div>
    </nav>
  )

  return (
    <>
      {/* Mobile Top Navigation Bar (Hamburger in top-left) */}
      <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-[#E8E5E0] bg-white/95 px-4 py-3 shadow-xs backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 -ml-1 text-[#1A0A0A] hover:bg-[#F4F3F0] active:bg-[#E8E5E0]"
            onClick={() => setOpen(o => !o)}
            aria-label="Buka menu navigasi"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link
            href="/admin"
            className="flex items-center gap-2 font-display text-sm font-black tracking-wider text-[#8B1A1A]"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>GEMARAWANA</span>
          </Link>
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5A5A]">
          CMS
        </span>
      </header>

      {/* Backdrop for mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar / Drawer */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-[#E8E5E0] bg-white shadow-xl transition-transform duration-300 ease-in-out lg:static lg:w-64 lg:max-w-none lg:shadow-none lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {Nav}
      </aside>
    </>
  )
}
