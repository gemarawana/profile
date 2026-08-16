import { Suspense } from 'react'
import AdminLoginPage from './login-client'

export default function Page() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-sm text-[#6B5A5A]">Loading…</div>}>
      <AdminLoginPage />
    </Suspense>
  )
}
