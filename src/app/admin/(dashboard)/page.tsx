import Link from 'next/link'
import { adminCount } from '@/lib/dal/admin'
import { createClient } from '@/lib/supabase/server'
import { Breadcrumb, PageHeader } from '@/components/admin/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const STAT_CARDS = [
  { key: 'articles', label: 'Articles', href: '/admin/content/articles', table: 'articles' as const },
  { key: 'activities', label: 'Activities', href: '/admin/content/activities', table: 'activities' as const },
  { key: 'members', label: 'Members', href: '/admin/content/members', table: 'organization_members' as const },
  { key: 'gallery', label: 'Gallery', href: '/admin/content/gallery', table: 'gallery_items' as const },
  { key: 'divisions', label: 'Divisions', href: '/admin/content/divisions', table: 'organization_divisions' as const },
  { key: 'stories', label: 'Stories', href: '/admin/content/member-stories', table: 'member_stories' as const },
  { key: 'hero', label: 'Hero Slides', href: '/admin/content/hero-slides', table: 'hero_slides' as const },
  { key: 'why', label: 'Why Cards', href: '/admin/content/why-cards', table: 'why_cards' as const },
  { key: 'faq', label: 'FAQ', href: '/admin/content/faq', table: 'faqs' as const },
]

export default async function AdminDashboardPage() {
  const counts = await Promise.all(STAT_CARDS.map(c => adminCount(c.table)))

  const supabase = await createClient()
  const { data: recentArticles } = await supabase
    .from('articles')
    .select('id, title, is_published, updated_at')
    .order('updated_at', { ascending: false })
    .limit(5)

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard' }]} />
      <PageHeader title="CMS Dashboard" description="Overview of Gemarawana content." />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {STAT_CARDS.map((card, i) => (
          <Link key={card.key} href={card.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-[#6B5A5A]">{card.label}</p>
                <p className="mt-2 font-display text-3xl font-black text-[#8B1A1A]">{counts[i]}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Articles</CardTitle>
        </CardHeader>
        <CardContent>
          {!recentArticles?.length ? (
            <p className="text-sm text-[#6B5A5A]">No articles yet.</p>
          ) : (
            <ul className="divide-y divide-[#E8E5E0]">
              {recentArticles.map(a => (
                <li key={a.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <Link href={`/admin/content/articles/${a.id}`} className="font-medium text-[#1A0A0A] hover:text-[#8B1A1A]">
                    {a.title}
                  </Link>
                  <span className="shrink-0 text-xs text-[#6B5A5A]">
                    {a.is_published ? 'Published' : 'Draft'} · {new Date(a.updated_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
