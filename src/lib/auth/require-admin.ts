import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function getSessionUser() {
  const supabase = await createClient()
  const { data: claimsData, error } = await supabase.auth.getClaims()
  if (error || !claimsData?.claims) return null

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) return null
  return user
}

export async function requireAdmin() {
  const user = await getSessionUser()
  if (!user) {
    redirect('/admin/login')
  }
  return { user }
}
