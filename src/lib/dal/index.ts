import { createClient } from '@/lib/supabase/server'
import * as mappers from '@/lib/mappers'

function handleQueryError(error: { message?: string }, context: string): never {
  console.error(`Supabase DAL Error in ${context}:`, error)
  throw new Error(`Database query failed in ${context}: ${error.message || error}`)
}

export async function getHeroSlides() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .eq('is_published', true)
    .order('order_index', { ascending: true })

  if (error) {
    handleQueryError(error, 'getHeroSlides')
  }

  return data.map(mappers.mapHeroSlide)
}

export async function getWhyCards() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('why_cards')
    .select('*')
    .eq('is_published', true)
    .order('order_index', { ascending: true })

  if (error) {
    handleQueryError(error, 'getWhyCards')
  }

  return data.map(mappers.mapWhyCard)
}

export async function getActivities() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('is_published', true)
    .order('order_index', { ascending: true })

  if (error) {
    handleQueryError(error, 'getActivities')
  }

  return data.map(mappers.mapActivity)
}

export async function getActivityBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // Not found
    handleQueryError(error, 'getActivityBySlug')
  }

  return mappers.mapActivity(data)
}

export async function getJourneySteps() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('journey_steps')
    .select('*')
    .eq('is_published', true)
    .order('order_index', { ascending: true })

  if (error) {
    handleQueryError(error, 'getJourneySteps')
  }

  return data.map(mappers.mapJourneyStep)
}

export async function getGalleryItems() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('is_published', true)
    .order('order_index', { ascending: true })

  if (error) {
    handleQueryError(error, 'getGalleryItems')
  }

  return data.map(mappers.mapGalleryItem)
}

export async function getMemberStories() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('member_stories')
    .select('*')
    .eq('is_published', true)
    .order('order_index', { ascending: true })

  if (error) {
    handleQueryError(error, 'getMemberStories')
  }

  return data.map(mappers.mapStory)
}

export async function getArticles() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .order('publication_date', { ascending: false })

  if (error) {
    handleQueryError(error, 'getArticles')
  }

  return data.map(mappers.mapArticle)
}

export async function getFeaturedArticle() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('is_featured', true)
    .eq('is_published', true)
    .limit(1)
    .maybeSingle()

  if (error) {
    handleQueryError(error, 'getFeaturedArticle')
  }

  if (!data) {
    // Fallback to latest article
    const { data: latest, error: latestError } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('publication_date', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (latestError) handleQueryError(latestError, 'getFeaturedArticleFallback')
    return latest ? mappers.mapArticle(latest) : null
  }

  return mappers.mapArticle(data)
}

export async function getArticleBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // Not found
    handleQueryError(error, 'getArticleBySlug')
  }

  return mappers.mapArticle(data)
}

export async function getOrganizationDivisions() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('organization_divisions')
    .select('*')
    .eq('is_published', true)
    .order('order_index', { ascending: true })

  if (error) {
    handleQueryError(error, 'getOrganizationDivisions')
  }

  return data
}

export async function getOrganizationMembers() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('organization_members')
    .select('*, organization_divisions(*)')
    .eq('is_active', true)
    .order('order_index', { ascending: true })

  if (error) {
    handleQueryError(error, 'getOrganizationMembers')
  }

  return (data as mappers.DbMemberWithDivision[]).map(mappers.mapLeader)
}

export async function getHistoryMilestones() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('history_milestones')
    .select('*')
    .eq('is_published', true)
    .order('order_index', { ascending: true })

  if (error) {
    handleQueryError(error, 'getHistoryMilestones')
  }

  return data.map(mappers.mapHistory)
}

export async function getFaqs() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_published', true)
    .order('order_index', { ascending: true })

  if (error) {
    handleQueryError(error, 'getFaqs')
  }

  return data.map(mappers.mapFAQ)
}

export async function getImpactStatistics() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('impact_statistics')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    handleQueryError(error, 'getImpactStatistics')
  }

  return data.map(row => ({
    value: row.stat_value,
    label: row.label,
  }))
}

export async function getSiteSettings(key: string): Promise<unknown> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('key', key)
    .maybeSingle()

  if (error) {
    handleQueryError(error, 'getSiteSettings')
  }

  return data?.value ?? null
}

export async function getImageUrls(): Promise<Record<string, string>> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('images')
    .select('asset_key, image_url')
    .eq('is_published', true)

  if (error) {
    handleQueryError(error, 'getImageUrls')
  }

  return Object.fromEntries(data.map(({ asset_key, image_url }) => [asset_key, image_url]))
}
