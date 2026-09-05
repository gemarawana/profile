import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { Container } from '@/components/ui/Container'
import { ArticleArchiveList } from '@/components/articles/ArticleArchiveList'
import { C } from '@/lib/constants'
import { getArticles, getSiteSettings } from '@/lib/dal'

type LinkItem = { label: string; href: string }

export const metadata: Metadata = {
  title: 'Arsip Berita & Artikel - Gemarawana',
  description: 'Kumpulan seluruh catatan ekspedisi, laporan kegiatan, liputan divisi, dan berita seputar Gemarawana Telkom University.',
  openGraph: {
    title: 'Arsip Berita & Artikel - Gemarawana',
    description: 'Kumpulan seluruh catatan ekspedisi, laporan kegiatan, dan berita seputar Gemarawana.',
  },
}

export default async function ArticlesArchivePage() {
  const [articles, navLinks, footerNavigation, footerSocials, joinUrl] = await Promise.all([
    getArticles(),
    getSiteSettings('nav_links'),
    getSiteSettings('contact'),
    getSiteSettings('footer_socials'),
    getSiteSettings('join_url'),
  ])

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: C.warmWhite }}>
      <Navbar links={navLinks as LinkItem[]} joinUrl={(joinUrl as string) || ''} />

      <main className="flex-1 pt-28 pb-20">
        <Container>
          {/* Breadcrumb & Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#8B1A1A] hover:text-[#6B1414] transition-colors py-2 px-4 rounded-full bg-[#8B1A1A]/5 hover:bg-[#8B1A1A]/10"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              <span>Kembali ke Beranda</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="max-w-3xl mb-12">
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3"
              style={{ background: 'rgba(139,26,26,0.08)', color: C.crimson, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Journalism & Events
            </div>
            <h1
              className="font-display font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-4"
              style={{ color: C.text }}
            >
              ARSIP BERITA & ARTIKEL
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-gray-600">
              Temukan seluruh catatan perjalanan ekspedisi, kabar kegiatan divisi, serta publikasi terkini dari Gemarawana Telkom University.
            </p>
          </div>

          {/* Interactive Archive List */}
          <ArticleArchiveList articles={articles} />
        </Container>
      </main>

      <Footer navigation={footerNavigation as LinkItem[]} socials={footerSocials as LinkItem[]} />
      <ScrollToTop />
    </div>
  )
}
