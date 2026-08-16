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
      <div className="border-b border-[#E8E5E0] px-5 py-4">
        <Link href="/admin" className="flex items-center gap-2 font-display text-sm font-black tracking-wider text-[#8B1A1A]">
          <LayoutDashboard className="h-4 w-4" />
          GEMARAWANA CMS
        </Link>
        <p className="mt-1 truncate text-xs text-[#6B5A5A]">{email}</p>
      </div>

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

      <div className="border-t border-[#E8E5E0] p-3">
        <Button type="button" variant="outline" className="w-full" size="sm" disabled={signingOut} onClick={handleSignOut}>
          {signingOut ? 'Signing out…' : 'Sign out'}
        </Button>
      </div>
    </nav>
  )

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-[#E8E5E0] bg-white px-4 py-3 lg:hidden">
        <span className="font-display text-sm font-black text-[#8B1A1A]">CMS</span>
        <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 border-r border-[#E8E5E0] bg-white transition-transform lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {Nav}
      </aside>
    </>
  )
}
