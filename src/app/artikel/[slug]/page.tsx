import type { Metadata } from 'next'
import { SmoothImage } from '@/components/ui/SmoothImage'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { Container } from '@/components/ui/Container'
import { C } from '@/lib/constants'
import { getArticleBySlug, getArticles, getSiteSettings } from '@/lib/dal'
import { ShareArticleModal } from '@/components/articles/ShareArticleModal'

type LinkItem = { label: string; href: string }

type Props = {
  params: Promise<{ slug: string }>
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return ''
  return dateStr.slice(0, 10)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan - Gemarawana',
    }
  }

  return {
    title: `${article.title} - Gemarawana`,
    description: article.excerpt || 'Artikel dan berita terbaru dari Gemarawana Telkom University.',
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.img ? [{ url: article.img }] : [],
    },
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params
  const [article, allArticles, navLinks, footerNavigation, footerSocials] = await Promise.all([
    getArticleBySlug(slug),
    getArticles(),
    getSiteSettings('nav_links'),
    getSiteSettings('contact'),
    getSiteSettings('footer_socials'),
  ])

  if (!article) {
    notFound()
  }

  // Related / other articles
  const otherArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3)

  // Check if content is HTML format or plain text paragraphs
  const hasHtml = /<[a-z][\s\S]*>/i.test(article.content || '')

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: C.warmWhite }}>
      <Navbar links={navLinks as LinkItem[]} />

      <main className="flex-1 pt-28 pb-20">
        <Container>
          {/* Breadcrumb / Back Button */}
          <div className="mb-8">
            <Link
              href="/#berita"
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

          <article className="max-w-4xl mx-auto">
            {/* Header / Meta */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                  style={{ background: C.crimson, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {article.category}
                </span>

                <div
                  className="flex items-center gap-2 text-xs font-semibold text-gray-500"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  <span>{formatDate(article.date)}</span>
                  {article.readTime && (
                    <>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </>
                  )}
                </div>
              </div>

              <h1
                className="font-display font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-6"
                style={{ color: C.text }}
              >
                {article.title}
              </h1>

              <div
                className="flex items-center gap-3 py-4 border-y"
                style={{ borderColor: C.border }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                  style={{ background: C.crimson }}
                >
                  {article.author ? article.author.charAt(0).toUpperCase() : 'G'}
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Ditulis oleh</div>
                  <div className="text-sm font-bold" style={{ color: C.textSub }}>
                    {article.author || 'Tim Gemarawana'}
                  </div>
                </div>
                <ShareArticleModal title={article.title} slug={slug} />
              </div>
            </header>

            {/* Featured Image */}
            {article.img && (
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg mb-10">
                <SmoothImage
                  src={article.img}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 900px"
                  priority
                />
              </div>
            )}

            {/* Excerpt Lead */}
            {article.excerpt && (
              <div
                className="p-6 md:p-8 rounded-2xl mb-8 border-l-4"
                style={{
                  background: C.lightGray,
                  borderColor: C.crimson,
                }}
              >
                <p className="text-base md:text-lg italic font-medium leading-relaxed" style={{ color: C.textSub }}>
                  &ldquo;{article.excerpt}&rdquo;
                </p>
              </div>
            )}

            {/* Content Body */}
            <div className="prose prose-lg max-w-none text-[#3A2A2A] leading-relaxed">
              {article.content ? (
                hasHtml ? (
                  <div
                    className="space-y-4"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                ) : (
                  <div className="space-y-6 text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {article.content.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))}
                  </div>
                )
              ) : (
                <p className="text-base text-gray-500 italic">
                  Konten lengkap untuk artikel ini belum tersedia.
                </p>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-12 pt-8 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: C.border }}>
              <Link
                href="/#berita"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#8B1A1A] hover:underline"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
                Kembali ke Berita Lainnya
              </Link>
            </div>
          </article>

          {/* Related / Other Articles */}
          {otherArticles.length > 0 && (
            <section className="mt-20 pt-12 border-t" style={{ borderColor: C.border }}>
              <h2 className="font-display font-black text-2xl md:text-3xl mb-8" style={{ color: C.text }}>
                Artikel Terkait Lainnya
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherArticles.map((item) => (
                  <Link
                    key={item.id}
                    href={`/artikel/${item.slug}`}
                    className="group rounded-2xl overflow-hidden border flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg no-underline text-inherit"
                    style={{ background: C.white, borderColor: C.border }}
                  >
                    <div>
                      <div className="relative w-full h-44 overflow-hidden">
                        <SmoothImage
                          src={item.img || '/placeholder.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute top-3 left-3 z-10">
                          <span
                            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                            style={{ background: 'rgba(20,6,6,0.85)', backdropFilter: 'blur(4px)' }}
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="text-[11px] font-bold text-gray-500 mb-2">
                          {formatDate(item.date)}
                        </div>
                        <h3 className="font-display font-bold text-base mb-2 line-clamp-2 group-hover:text-[#8B1A1A] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 text-xs font-bold text-[#8B1A1A] flex items-center justify-between">
                      <span className="text-[11px] text-gray-500 font-normal">{item.author}</span>
                      <span>Baca →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </Container>
      </main>

      <Footer navigation={footerNavigation as LinkItem[]} socials={footerSocials as LinkItem[]} />
      <ScrollToTop />
    </div>
  )
}
