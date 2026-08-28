'use client'

import { SmoothImage } from '@/components/ui/SmoothImage'
import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { C } from '@/lib/constants'
import type { NewsArticle } from '@/types'

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  // Returns ISO formatted date slice YYYY-MM-DD or original if already formatted
  return dateStr.slice(0, 10)
}

export function Article({ articles = [] }: { articles: NewsArticle[] }) {

  if (!articles || articles.length === 0) {
    return (
      <Section id="berita" style={{ background: C.lightGray }}>
        <SectionHeading
          eyebrow="Journalism & Events"
          title={<>LATEST DISPATCHES<br />&amp; REPORTS</>}
          description="Expedition reports, activity updates, and news coverage from all Gemarawana divisions."
          align="center"
        />
        <div className="rounded-3xl border border-dashed p-12 text-center" style={{ borderColor: C.border, background: C.white }}>
          <p className="text-base font-semibold" style={{ color: C.muted }}>
            Belum ada artikel yang dipublikasikan saat ini.
          </p>
        </div>
      </Section>
    )
  }

  // 1. Featured article: latest 1 with featured=true (or fallback to latest article)
  const featured = articles.find((a) => a.featured) ?? articles[0]

  // 2. Regular articles: rest of articles (where id is not the featured id)
  const regularArticles = articles
    .filter((a) => a.id !== featured.id)
    .slice(0, 6)

  const hasMoreArticles = articles.length > 7

  return (
    <Section id="berita" style={{ background: C.lightGray }}>
      <SectionHeading
        eyebrow="Journalism & Events"
        title={<>LATEST DISPATCHES<br />&amp; REPORTS</>}
        description="Expedition reports, activity updates, and news coverage from all Gemarawana divisions."
        align="center"
      />

      <div className="flex flex-col gap-8">
        {/* Featured Article Card */}
        {featured && (
          <Link
            href={`/artikel/${featured.slug}`}
            className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl border flex flex-col lg:flex-row items-stretch text-inherit no-underline"
            style={{ background: C.white, borderColor: C.border }}
          >
            <div className="relative lg:w-3/5 min-h-[280px] lg:min-h-[380px] overflow-hidden">
              <SmoothImage
                src={featured.img || '/placeholder.jpg'}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm inline-block"
                  style={{ background: C.crimson, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {featured.category}
                </span>
              </div>
            </div>

            <div className="lg:w-2/5 p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div
                  className="flex items-center gap-2 text-xs font-bold mb-4"
                  style={{ color: C.muted, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  <span>{formatDate(featured.date)}</span>
                  {featured.readTime && (
                    <>
                      <span>•</span>
                      <span>{featured.readTime}</span>
                    </>
                  )}
                </div>
                <h3
                  className="font-display font-black text-xl lg:text-2xl mb-4 leading-snug group-hover:text-[#8B1A1A] transition-colors"
                  style={{ color: C.text }}
                >
                  {featured.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6 line-clamp-3"
                  style={{ color: C.muted }}
                >
                  {featured.excerpt}
                </p>
              </div>

              <div
                className="pt-6 border-t flex items-center justify-between"
                style={{ borderColor: C.border }}
              >
                <span
                  className="text-xs font-semibold"
                  style={{ color: C.textSub, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {featured.author}
                </span>
                <span
                  className="text-xs font-bold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300"
                  style={{ color: C.crimson, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  Baca Selengkapnya
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="inline-block"
                    aria-hidden
                  >
                    <path
                      d="M5 12h14"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Regular Articles Grid */}
        {regularArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((art) => (
              <Link
                key={art.id}
                href={`/artikel/${art.slug}`}
                className="group rounded-2xl overflow-hidden border flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl text-inherit no-underline"
                style={{ background: C.white, borderColor: C.border }}
              >
                <div>
                  <div className="relative w-full h-48 overflow-hidden">
                    <SmoothImage
                      src={art.img || '/placeholder.jpg'}
                      alt={art.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white shadow-sm inline-block"
                        style={{
                          background: 'rgba(20,6,6,0.85)',
                          backdropFilter: 'blur(4px)',
                          fontFamily: 'Plus Jakarta Sans, sans-serif',
                        }}
                      >
                        {art.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div
                      className="flex items-center gap-2 text-[11px] font-bold mb-2.5"
                      style={{ color: C.muted, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    >
                      <span>{formatDate(art.date)}</span>
                      {art.readTime && (
                        <>
                          <span>•</span>
                          <span>{art.readTime}</span>
                        </>
                      )}
                    </div>
                    <h4
                      className="font-display font-black text-lg mb-2.5 line-clamp-2 group-hover:text-[#8B1A1A] transition-colors"
                      style={{ color: C.text }}
                    >
                      {art.title}
                    </h4>
                    <p
                      className="text-xs leading-relaxed line-clamp-3"
                      style={{ color: C.muted }}
                    >
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div
                  className="p-6 pt-0 flex items-center justify-between text-xs font-bold"
                  style={{ color: C.crimson, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  <span className="text-[11px] font-normal" style={{ color: C.muted }}>
                    {art.author}
                  </span>
                  <span className="inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                    Baca
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="inline-block"
                      aria-hidden
                    >
                      <path
                        d="M5 12h14"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {hasMoreArticles && (
          <div className="mt-6 w-full">
            <Link
              href="/artikel"
              className="block w-full rounded-full border-[1.5px] border-[#8B1A1A] bg-transparent px-7 py-3 text-center text-base font-bold text-[#8B1A1A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8B1A1A] hover:text-white cursor-pointer no-underline"
            >
              Lihat Berita Lainnya
            </Link>
          </div>
        )}
      </div>
    </Section>
  )
}
