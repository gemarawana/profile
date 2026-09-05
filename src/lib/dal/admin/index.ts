import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { PUBLIC_REVALIDATE_PATHS } from '@/lib/constants/cms'
import type { Database } from '@/types/database.types'

type TableName = keyof Database['public']['Tables']

export function revalidatePublic() {
  for (const path of PUBLIC_REVALIDATE_PATHS) {
    revalidatePath(path)
  }
}

function formatDalError(error: unknown): string {
  if (!error) return 'Terjadi kesalahan sistem'
  const msg = typeof error === 'object' && error !== null && 'message' in error
    ? String((error as { message: unknown }).message)
    : String(error)
  const code = typeof error === 'object' && error !== null && 'code' in error
    ? String((error as { code: unknown }).code)
    : ''

  if (
    code === 'PGRST116' ||
    code === '42501' ||
    msg.includes('Cannot coerce the result') ||
    msg.includes('row-level security') ||
    msg.includes('permission denied')
  ) {
    return 'Anda tidak memiliki akses untuk mengubah data website'
  }

  return msg || 'Gagal memproses data'
}

export async function adminList<T extends TableName>(
  table: T,
  options?: {
    search?: string
    searchColumns?: string[]
    orderBy?: string
    ascending?: boolean
    page?: number
    pageSize?: number
    eq?: Record<string, string | boolean | number | null>
  }
) {
  const supabase = await createClient()
  const page = options?.page ?? 1
  const pageSize = options?.pageSize ?? 20
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase.from(table).select('*', { count: 'exact' })

  if (options?.eq) {
    for (const [key, value] of Object.entries(options.eq)) {
      if (value === null) query = query.is(key, null)
      else query = query.eq(key, value)
    }
  }

  if (options?.search && options.searchColumns?.length) {
    const term = options.search.replace(/%/g, '')
    const orFilter = options.searchColumns.map(col => `${col}.ilike.%${term}%`).join(',')
    query = query.or(orFilter)
  }

  query = query
    .order(options?.orderBy ?? 'order_index', { ascending: options?.ascending ?? true })
    .range(from, to)

  const { data, error, count } = await query
  if (error) throw new Error(formatDalError(error))

  return {
    data: (data ?? []) as Database['public']['Tables'][T]['Row'][],
    count: count ?? 0,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / pageSize)),
  }
}

export async function adminGetById<T extends TableName>(table: T, id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from(table).select('*').eq('id', id).maybeSingle()
  if (error) throw new Error(formatDalError(error))
  return data as Database['public']['Tables'][T]['Row'] | null
}

export async function adminCreate<T extends TableName>(
  table: T,
  payload: Database['public']['Tables'][T]['Insert']
) {
  const supabase = await createClient()
  const { data, error } = await supabase.from(table).insert(payload as never).select('*').single()
  if (error) throw new Error(formatDalError(error))
  revalidatePublic()
  return data as Database['public']['Tables'][T]['Row']
}

export async function adminUpdate<T extends TableName>(
  table: T,
  id: string,
  payload: Database['public']['Tables'][T]['Update']
) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from(table)
    .update(payload as never)
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw new Error(formatDalError(error))
  revalidatePublic()
  return data as Database['public']['Tables'][T]['Row']
}

export async function adminDelete<T extends TableName>(table: T, id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw new Error(formatDalError(error))
  revalidatePublic()
}

export async function adminReorder(
  table: TableName,
  id: string,
  direction: 'up' | 'down',
  orderColumn = 'order_index'
) {
  const supabase = await createClient()
  const { data: current, error: curErr } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single()

  if (curErr || !current) throw new Error(formatDalError(curErr || 'Item not found'))

  const currentOrder = (current as { order_index: number }).order_index

  let neighborQuery = supabase.from(table).select('*')
  if (direction === 'up') {
    neighborQuery = neighborQuery
      .lt(orderColumn, currentOrder)
      .order(orderColumn, { ascending: false })
      .limit(1)
  } else {
    neighborQuery = neighborQuery
      .gt(orderColumn, currentOrder)
      .order(orderColumn, { ascending: true })
      .limit(1)
  }

  const { data: neighbors, error: nErr } = await neighborQuery
  if (nErr) throw new Error(formatDalError(nErr))
  const neighbor = neighbors?.[0] as { id: string; order_index: number } | undefined
  if (!neighbor) return

  const { error: e1 } = await supabase
    .from(table)
    .update({ [orderColumn]: neighbor.order_index } as never)
    .eq('id', id)
  if (e1) throw new Error(formatDalError(e1))

  const { error: e2 } = await supabase
    .from(table)
    .update({ [orderColumn]: currentOrder } as never)
    .eq('id', neighbor.id)
  if (e2) throw new Error(formatDalError(e2))

  revalidatePublic()
}

export async function adminCount(table: TableName) {
  const supabase = await createClient()
  const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true })
  if (error) throw new Error(formatDalError(error))
  return count ?? 0
}

export async function adminGetDivisionsOptions() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('organization_divisions')
    .select('id, name, slug')
    .order('order_index', { ascending: true })
  if (error) throw new Error(formatDalError(error))
  return data ?? []
}
