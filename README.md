# GEMARAWANA — Mapala Telkom University Website

Website resmi organisasi mahasiswa pecinta alam Telkom University (**GEMARAWANA**).
Dikembangkan menggunakan Next.js App Router, TypeScript, dan Tailwind CSS.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Image Optimization**: `next/image`

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

### 3. Build Production

```bash
npm run build
```

### 4. Start Production Server

```bash
npm start
```

---

## 📁 Folder Structure

```text
gemarawana-v2/
├── public/                  # Asset publik (favicon, icons)
├── src/
│   ├── app/                 # Next.js App Router (pages, layout, globals.css)
│   ├── components/
│   │   ├── common/          # Component bersama (LogoMark, ScrollToTop)
│   │   ├── layout/          # Component struktur layout (Navbar, Footer)
│   │   └── sections/        # Section halaman (Hero, Introduction, FAQ, dll)
│   ├── data/                # Data terpisah (site text, list kegiatan, pengurus, faq)
│   ├── hooks/               # Custom hooks (useInView, useCounter)
│   ├── lib/                 # Utility & Constants (constants, classnames)
│   └── types/               # TypeScript interfaces
├── next.config.ts           # Next.js configuration
├── postcss.config.mjs       # Tailwind CSS v4 PostCSS integration
├── package.json
└── tsconfig.json
```

---

## 📝 How to Update Content

- **Informasi / Teks Umum & FAQ**: Edit [`src/data/site.ts`](file:///e:/Project/vibecoding/gemarawana-v2/src/data/site.ts).
- **Gambar Unsplash**: Edit URL gambar pada [`src/data/images.ts`](file:///e:/Project/vibecoding/gemarawana-v2/src/data/images.ts).
- **Warna & Theme**: Edit variabel warna pada [`src/lib/constants.ts`](file:///e:/Project/vibecoding/gemarawana-v2/src/lib/constants.ts) dan [`src/app/globals.css`](file:///e:/Project/vibecoding/gemarawana-v2/src/app/globals.css).
