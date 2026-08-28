import { requireAdmin } from '@/lib/auth/require-admin'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { ToastViewport } from '@/components/ui/toast'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await requireAdmin()

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F7] lg:flex-row">
      <AdminSidebar email={user.email ?? 'Admin'} />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
      <ToastViewport />
    </div>
  )
}
