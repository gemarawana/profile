import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#140606] text-white px-6 text-center">
      <h1 className="font-display text-6xl font-black text-[#8B1A1A] mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Halaman Tidak Ditemukan</h2>
      <p className="text-[#FAF5F5]/65 max-w-md mb-8">
        Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#8B1A1A] text-white rounded-full font-bold hover:bg-[#6B1414] transition-colors"
      >
        <span>Kembali ke Beranda</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M15 3h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  )
}
