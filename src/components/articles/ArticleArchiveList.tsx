'use client'

import { useState, useMemo, useEffect } from 'react'
import { SmoothImage } from '@/components/ui/SmoothImage'
import Link from 'next/link'
import { C } from '@/lib/constants'
import type { NewsArticle } from '@/types'

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return dateStr.slice(0, 10)
}

export function ArticleArchiveList({ articles }: { articles: NewsArticle[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Extract unique categories and counts
  const categories = useMemo(() => {
    const map = new Map<string, number>()
    articles.forEach((art) => {
      if (art.category) {
        map.set(art.category, (map.get(art.category) || 0) + 1)
      }
    })
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
  }, [articles])

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchCategory =
        selectedCategory === 'all' ||
        art.category.toLowerCase() === selectedCategory.toLowerCase()

      const matchSearch =
        searchQuery.trim() === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.author.toLowerCase().includes(searchQuery.toLowerCase())

      return matchCategory && matchSearch
    })
  }, [articles, selectedCategory, searchQuery])

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery, itemsPerPage])

  // Pagination calculation
  const totalItems = filteredArticles.length
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      // Smooth scroll to top of list
      const listElement = document.getElementById('articles-list-top')
      if (listElement) {
        listElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <div id="articles-list-top" className="flex flex-col gap-8">
      {/* Controls Bar: Search & Category Filter */}
      <div className="flex flex-col gap-6 p-6 rounded-3xl border bg-white shadow-sm" style={{ borderColor: C.border }}>
        {/* Search and Items Per Page Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Cari judul, kata kunci, atau penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A]"
              style={{ borderColor: C.border }}
            />
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Items Per Page Select */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto text-xs font-semibold text-gray-600">
            <span>Tampilkan:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="rounded-lg border px-3 py-1.5 bg-white text-xs font-bold text-[#1A0A0A] focus:outline-none focus:border-[#8B1A1A] cursor-pointer"
              style={{ borderColor: C.border }}
            >
              <option value={10}>10 / halaman</option>
              <option value={25}>25 / halaman</option>
              <option value={50}>50 / halaman</option>
            </select>
          </div>
        </div>

        {/* Category Pills Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 category-scrollbar">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              selectedCategory === 'all'
                ? 'text-white shadow-md'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            }`}
            style={{
              background: selectedCategory === 'all' ? C.crimson : undefined,
            }}
          >
            <span>Semua Kategori</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {articles.length}
            </span>
          </button>

          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.name.toLowerCase()
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
                style={{
                  background: isActive ? C.crimson : undefined,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
              >
                <span>{cat.name}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Results Header Info */}
      <div className="flex items-center justify-between text-xs font-semibold text-gray-500 px-1">
        <span>
          Menampilkan {totalItems > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + itemsPerPage, totalItems)} dari {totalItems} artikel
        </span>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-[#8B1A1A] hover:underline font-bold"
          >
            Reset Kategori
          </button>
        )}
      </div>

      {/* Grid Content */}
      {paginatedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedArticles.map((art) => (
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
      ) : (
        <div className="rounded-3xl border border-dashed p-16 text-center bg-white" style={{ borderColor: C.border }}>
          <div className="w-16 h-16 rounded-full bg-[#8B1A1A]/10 text-[#8B1A1A] flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="font-display font-black text-xl mb-2" style={{ color: C.text }}>
            Tidak Ada Artikel Ditemukan
          </h3>
          <p className="text-sm max-w-md mx-auto mb-6" style={{ color: C.muted }}>
            {searchQuery
              ? `Tidak ada artikel yang cocok dengan pencarian "${searchQuery}".`
              : 'Tidak ada artikel yang tersedia dalam kategori ini.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all')
              setSearchQuery('')
            }}
            className="px-6 py-2.5 rounded-full text-xs font-bold text-white transition-all hover:shadow-lg cursor-pointer"
            style={{ background: C.crimson }}
          >
            Tampilkan Semua Artikel
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t" style={{ borderColor: C.border }}>
          <div className="text-xs font-semibold text-gray-500 order-2 sm:order-1">
            Halaman <span className="font-bold text-gray-900">{currentPage}</span> dari{' '}
            <span className="font-bold text-gray-900">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1.5 order-1 sm:order-2">
            {/* Prev Button */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1 cursor-pointer"
              style={{ borderColor: C.border, color: C.text }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Prev</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first, last, current, and surrounding pages
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  const isActive = page === currentPage
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                        isActive
                          ? 'text-white shadow-md'
                          : 'text-gray-700 border hover:bg-gray-50'
                      }`}
                      style={{
                        background: isActive ? C.crimson : undefined,
                        borderColor: isActive ? C.crimson : C.border,
                      }}
                    >
                      {page}
                    </button>
                  )
                }

                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="px-1 text-xs text-gray-400">
                      ...
                    </span>
                  )
                }

                return null
              })}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1 cursor-pointer"
              style={{ borderColor: C.border, color: C.text }}
            >
              <span>Next</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
