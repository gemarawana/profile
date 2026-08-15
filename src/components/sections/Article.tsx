"use client"

import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { C } from '@/lib/constants'
import type { NewsArticle } from '@/types'
import { useModal } from '@/components/ui/ModalProvider'

const wordpressUrl = '#'
export function Article({ articles }: { articles: NewsArticle[] }) {
    const featured = articles.find(a => a.featured) ?? articles[0]

    const rest = articles
        .filter(a => a.id !== featured.id)
        .slice(0, 6)

    const hasMoreArticles = articles.length > 7
    

    const { openModal } = useModal()

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
                <div
                    className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl border flex flex-col lg:flex-row items-stretch"
                    style={{ background: C.white, borderColor: C.border }}
                >
                    <div className="relative lg:w-3/5 min-h-[280px] lg:min-h-[380px] overflow-hidden">
                        <Image
                            src={featured.img}
                            alt={featured.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                        <div className="absolute top-4 left-4 z-10">
                            <span
                                className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                                style={{ background: C.crimson, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                            >
                                {featured.category}
                            </span>
                        </div>
                    </div>

                    <div className="lg:w-2/5 p-8 lg:p-10 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 text-xs font-bold mb-4" style={{ color: C.muted, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                                <span>{featured.date}</span>
                                {/* <span>•</span>
                                <span>{featured.readTime}</span> */}
                            </div>
                            <h3 className="font-display font-black text-xl lg:text-2xl mb-4 leading-snug group-hover:text-[#8B1A1A] transition-colors" style={{ color: C.text }}>
                                {featured.title}
                            </h3>
                            <p className="text-sm leading-relaxed mb-6" style={{ color: C.muted }}>
                                {featured.excerpt}
                            </p>
                        </div>

                        <div className="pt-6 border-t flex items-center justify-between" style={{ borderColor: C.border }}>
                            <span className="text-xs font-semibold" style={{ color: C.textSub, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                                {featured.author}
                            </span>
                            <span
                                className="text-xs font-bold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300"
                                style={{ color: C.crimson, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                            >
                                    Baca Selengkapnya
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block" style={{ marginLeft: 6 }} aria-hidden>
                                            <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                            <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {rest.map((art) => (
                        <div
                            key={art.id}
                            className="group rounded-2xl overflow-hidden border flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                            style={{ background: C.white, borderColor: C.border }}
                        >
                            <div>
                                <div className="relative w-full h-48 overflow-hidden">
                                    <Image
                                        src={art.img}
                                        alt={art.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute top-3 left-3 z-10">
                                        <span
                                            className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white"
                                            style={{ background: 'rgba(20,6,6,0.85)', backdropFilter: 'blur(4px)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                                        >
                                            {art.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-[11px] font-bold mb-2.5" style={{ color: C.muted, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                                        <span>{art.date}</span>
                                        {/* <span>•</span>
                                        <span>{art.readTime}</span> */}
                                    </div>
                                    <h4 className="font-display font-black text-lg mb-2.5 line-clamp-2 group-hover:text-[#8B1A1A] transition-colors" style={{ color: C.text }}>
                                        {art.title}
                                    </h4>
                                    <p className="text-xs leading-relaxed line-clamp-3" style={{ color: C.muted }}>
                                        {art.excerpt}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold" style={{ color: C.crimson, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                                <span className="text-[11px] font-normal" style={{ color: C.muted }}>
                                    {art.author}
                                </span>
                                <span className="inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                                     Baca
                                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block" style={{ marginLeft: 6 }} aria-hidden>
                                        <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                        <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                     </svg>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {hasMoreArticles && (
                    <div className="mt-10 w-full">
                        <a
                            href={wordpressUrl}
                            onClick={e => {
                                e.preventDefault()
                                openModal({ title: 'More Articles', message: 'Our full article archive is coming soon. Follow our channels for updates.' })
                            }}
                            className="block w-full btn-primer border-[1.5px] border-[#8B1A1A] bg-transparent px-7 py-2 text-center text-lg font-bold text-[#8B1A1A] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8B1A1A] hover:text-white"
                        >
                            See More
                        </a>
                    </div>
                )}

            </div>
        </Section>
    )
}
