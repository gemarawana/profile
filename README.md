# GEMARAWANA — Website & CMS Organisasi Mahasiswa Pecinta Alam

Website resmi dan Content Management System (CMS) untuk organisasi mahasiswa pecinta alam Telkom University (**GEMARAWANA**). Dibangun menggunakan Next.js App Router, TypeScript, Tailwind CSS v4, dan Supabase sebagai backend database & authentication.

---

## 📌 Overview

* **Tujuan Project**: Menyediakan portal informasi publik yang modern, responsif, dan interaktif mengenai kegiatan, kepengurusan, artikel, dokumentasi ekspedisi, serta pendaftaran anggota baru GEMARAWANA, dilengkapi dengan dashboard CMS untuk mempermudah pengurus mengelola konten tanpa mengubah source code.
* **Masalah yang Diselesaikan**: Menggantikan pengelolaan data statis dengan database dinamis berbasis Supabase, mempermudah publikasi artikel dengan Rich Text Editor, serta memberikan alur registrasi dan showcase organisasi secara terintegrasi.
* **Scope Project**:
  * Landing page publik & sub-halaman organisasi (`/about`, `/activities`, `/artikel`, `/gallery`, `/recruitment`, `/stories`).
  * Sistem Content Management System (CMS) di `/admin` dengan autentikasi berbasis Supabase Auth.
* **Target Pengguna**: Calon anggota baru, anggota aktif & alumni GEMARAWANA, sivitas akademika Telkom University, pegiat alam terbuka, serta pengurus organisasi (administrator konten).

---

## ✨ Features

### 🌐 Public Website
* **Hero Slideshow**: Banner utama interaktif dengan gambar ekspedisi dan informasi utama.
* **Informasi Organisasi**: Profil, visi misi, sejarah, struktur kepengurusan & divisi (`/about`).
* **Katalog Kegiatan**: Daftar kegiatan operasional dan ekspedisi alam (`/activities`).
* **Publikasi Artikel**: Halaman artikel & berita kegiatan dengan slug dinamis (`/artikel` & `/artikel/[slug]`).
* **Galeri Dokumentasi**: Grid galeri foto kegiatan & petualangan alam (`/gallery`).
* **Cerita Anggota (Member Stories)**: Testimoni & kisah inspiratif anggota GEMARAWANA (`/stories`).
* **Pendaftaran Anggota (Recruitment)**: Informasi alur pendaftaran dan recruitment CTA (`/recruitment`).
* **FAQ & Contact**: Pertanyaan umum seputar organisasi, link sosial media, dan informasi kontak.

### 🛠️ Admin CMS Dashboard (`/admin`)
* **Role-Based Auth & Protected Route**: Proteksi route `/admin` melalui middleware Next.js dan Supabase Auth.
* **Content Management (12 Modul)**:
  * Activities (Kegiatan)
  * Articles (Artikel & Berita dengan Rich Text Editor Tiptap)
  * Divisions (Divisi Organisasi)
  * FAQ (Tanya Jawab)
  * Gallery Items (Galeri Foto)
  * Hero Slides (Slide Banner Utama)
  * History Milestones (Linimasa Sejarah)
  * Journey Steps (Alur Perjalanan Anggota)
  * Member Stories (Cerita & Testimoni)
  * Organization Members (Anggota & Pengurus)
  * Impact Statistics (Statistik & Angka Dampak)
  * Why Cards (Keunggulan & Alasan Bergabung)
* **Reorder & Status Publishing**: Fitur pengurutan baris data (`order_index`) dan toggle publikasi (`is_published`).
* **Site Settings Management**: Pengaturan dinamis untuk link navigasi, kontak footer, link sosial media, serta gambar intro & CTA.

---

## 🛠️ Tech Stack

| Kategori | Teknologi | Kegunaan |
| --- | --- | --- |
| **Framework** | Next.js 15 (App Router) | Full-stack React framework dengan Server Components & Turbopack |
| **UI Library** | React 19 | Core library untuk antarmuka pengguna |
| **Bahasa** | TypeScript 5.8 | Pengetikan statis dan keamanan tipe data |
| **Styling** | Tailwind CSS v4 & PostCSS | Utility-first styling framework |
| **Typography** | `@tailwindcss/typography` | Format styling konten artikel & rich text output |
| **Backend & Auth** | Supabase (`@supabase/supabase-js`, `@supabase/ssr`) | PostgreSQL database, Storage, dan Session/Auth management |
| **Editor** | Tiptap Editor (`@tiptap/react`, StarterKit) | Headless Rich Text Editor untuk form CMS artikel |
| **Validasi Data** | Zod 4 | Skema validasi input form dan server actions |
| **Komponen UI** | CVA (`class-variance-authority`), `clsx`, `tailwind-merge` | Utility pengelolaan class variant komponen |
| **Icons** | Lucide React | Ikon modern dan konsisten di seluruh antarmuka |
| **Optimasi Gambar** | `next/image` & Sharp | Kompresi dan optimasi rendering gambar |

---

## 📋 Prerequisites

Pastikan environment lokal telah memenuhi spesifikasi berikut sebelum menjalankan project:

* **Node.js**: Versi `18.18.0` atau lebih tinggi (disarankan Node.js LTS `v20.x` / `v22.x`)
* **Package Manager**: `npm` (versi 9 atau lebih baru)
* **Supabase Project**: Project Supabase aktif (gratis atau self-hosted) untuk database & autentikasi.

---

## 🚀 Installation

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd gemarawana-v2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment:**
   Salin file template `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Pada Windows Command Prompt: `copy .env.example .env` atau PowerShell: `Copy-Item .env.example .env`)*

4. **Isi Environment Variables:**
   Buka file `.env` dan masukkan konfigurasi Supabase Anda (lihat bagian [Environment Configuration](#-environment-configuration)).

---

## 🔐 Environment Configuration

Konfigurasi environment variables yang digunakan oleh project:

```env
# Optional: URL domain publik website untuk keperluan metadata/SEO (opsional saat local dev)
NEXT_PUBLIC_SITE_URL=https://gemarawana.or.id

# Required: URL API Project Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Required: Publishable / Anon Key Supabase (aman untuk diakses client)
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-anon-key
```

> [!WARNING]
> Jangan pernah memasukkan `service_role_key`, database password, atau credential rahasia ke dalam file `.env` frontend atau mengunggah file `.env` ke version control.

---

## 🗄️ Database Setup

Project menggunakan Supabase PostgreSQL dengan skema tabel dan migration yang tersedia pada direktori `supabase/`:

1. **Jalankan Migrations di Supabase SQL Editor** (secara berurutan):
   * `supabase/migrations/001_initial_schema.sql` (Tabel utama: slides, activities, articles, divisions, members, settings, dll.)
   * `supabase/migrations/002_images.sql`
   * `supabase/migrations/003_journey_steps_image_url.sql`
   * `supabase/migrations/004_admin_auth_and_policies.sql` (Kebijakan Row Level Security / RLS)
   * `supabase/migrations/20260816122817_drop_images_table.sql`

2. **Seed Data Awal (Opsional):**
   * Jalankan query pada `supabase/seed.sql` melalui SQL Editor Supabase untuk mengimpor data awal (kegiatan, faq, artikel, milestone, dan settings).

3. **Membuat Akun Admin:**
   * Buat pengguna baru di dashboard Supabase (**Authentication** → **Users** → **Add User**).
   * Gunakan email dan password tersebut untuk login ke `/admin/login`.

---

## 📁 Project Structure

```text
gemarawana-v2/
├── public/                       # Aset publik statis (favicon, logo, icons)
├── scripts/
│   └── gen-cms-modules.js        # Generator script untuk perancangan modul CMS admin
├── src/
│   ├── app/                      # Next.js App Router (Pages, Layouts, Server Routes)
│   │   ├── (public pages)
│   │   │   ├── about/            # Halaman Profil & Visi Misi
│   │   │   ├── activities/       # Halaman Kegiatan
│   │   │   ├── artikel/          # Halaman Artikel & Berita
│   │   │   │   └── [slug]/       # Detail Artikel Dinamis
│   │   │   ├── gallery/          # Halaman Galeri Foto
│   │   │   ├── recruitment/      # Halaman Penerimaan Anggota
│   │   │   └── stories/          # Halaman Cerita Anggota
│   │   ├── admin/                # Route Admin Panel
│   │   │   ├── (dashboard)/      # Protected Dashboard Area
│   │   │   │   ├── content/      # 12 Modul Manajemen Konten
│   │   │   │   └── settings/     # Pengaturan Global Website
│   │   │   └── login/            # Halaman Login Admin
│   │   ├── globals.css           # Global Styles & Tailwind CSS Config
│   │   ├── layout.tsx            # Root Layout
│   │   ├── page.tsx              # Landing Page Utama
│   │   └── sitemap.ts            # Dynamic SEO Sitemap
│   ├── components/
│   │   ├── admin/                # Komponen Dashboard (DataTable, FormFields, RichTextEditor, dll)
│   │   ├── articles/             # Komponen Khusus Artikel (ShareModal, ArticleCards)
│   │   ├── common/               # Komponen Umum (LogoMark, ScrollToTop)
│   │   ├── layout/               # Komponen Tata Letak Publik (Navbar, Footer)
│   │   ├── sections/             # Section Landing Page (Hero, Intro, FAQ, Org, dll)
│   │   └── ui/                   # Reusable Primitive UI (Button, Card, Input, dll)
│   ├── data/                     # Fallback & Static Metadata (site.tsx, images.ts)
│   ├── hooks/                    # Custom React Hooks (useCounter, useInView)
│   ├── lib/
│   │   ├── auth/                 # Guard & Verifikasi Sesi Admin (`require-admin.ts`)
│   │   ├── constants/            # Konfigurasi Navigasi & CMS Constants
│   │   ├── dal/                  # Data Access Layer (Query Supabase publik & admin)
│   │   ├── mappers/              # Mapper fungsi dari skema DB ke entitas UI
│   │   ├── supabase/             # Inisialisasi Supabase Client (Browser/Server)
│   │   └── validations/          # Skema Validasi Zod
│   ├── types/                    # TypeScript Typings (`database.types.ts`, `index.ts`)
│   └── proxy.ts                  # Middleware helper autentikasi admin
├── supabase/
│   ├── migrations/               # File migrasi database SQL
│   └── seed.sql                  # Data seed awal
├── middleware.ts                 # Route middleware (proteksi akses `/admin`)
├── next.config.ts                # Konfigurasi Next.js & remote image patterns
├── package.json                  # Dependencies & npm scripts
├── postcss.config.mjs            # Konfigurasi PostCSS Tailwind CSS v4
└── tsconfig.json                 # Konfigurasi TypeScript
```

---

## 🏃 Running the Project

Perintah yang tersedia sesuai konfigurasi `package.json`:

### 1. Development Mode
Menjalankan server development lokal dengan Next.js Turbopack:
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) pada browser.

### 2. Linting & Code Quality
Memeriksa kepatuhan kode dan deteksi error dengan ESLint:
```bash
npm run lint
```

### 3. Production Build
Mengompilasi dan mengoptimasi aplikasi untuk kebutuhan deployment:
```bash
npm run build
```

### 4. Production Preview
Menjalankan server production dari hasil build:
```bash
npm start
```

---

## ⚙️ Configuration

### 1. Image Optimization (`next.config.ts`)
Domain eksternal yang diizinkan untuk pemuatan gambar melalui `next/image`:
* `images.unsplash.com`
* `uploads.unsplash.com`
* Supabase Storage: `*.supabase.co` (`/storage/v1/object/public/**`)

Jika menggunakan bucket storage Supabase kustom, sesuaikan hostname remote patterns pada file `next.config.ts`.

### 2. Route Protection (`middleware.ts` & `src/proxy.ts`)
* Semua permintaan ke route `/admin/*` (kecuali `/admin/login`) akan dicek status autentikasinya.
* Pengguna yang belum login akan dialihkan ke `/admin/login?next=/admin/...`.
* Pengguna yang sudah login dan membuka `/admin/login` akan langsung dialihkan ke dashboard `/admin`.

---

## 🛠️ Developer Scripts

### Scaffolding Modul CMS Baru (`scripts/gen-cms-modules.js`)
Project menyediakan script bantuan untuk membuat boilerplate modul CRUD CMS di dalam `/admin/content/`:
```bash
node scripts/gen-cms-modules.js
```
Script ini akan menghasilkan file `actions.ts`, form client component, `page.tsx`, `new/page.tsx`, dan `[id]/page.tsx` secara otomatis sesuai skema yang ditentukan.

---

## 🔧 Troubleshooting

### 1. Database Query Error: "Missing Supabase config"
* **Penyebab**: Environment variable `NEXT_PUBLIC_SUPABASE_URL` atau `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` belum terdefinisi di file `.env`.
* **Solusi**: Pastikan file `.env` ada di root folder dan nilainya telah diisi sesuai project Supabase Anda, lalu restart development server (`npm run dev`).

### 2. Error Gambar Tidak Muncul (Invalid src prop)
* **Penyebab**: Domain URL gambar belum terdaftar di `remotePatterns` pada `next.config.ts`.
* **Solusi**: Daftarkan hostname domain gambar pada array `remotePatterns` di file `next.config.ts` dan restart server.

### 3. Loop Redirect pada Halaman Admin
* **Penyebab**: Sesi autentikasi cookie kedaluwarsa atau publishable key tidak cocok dengan project Supabase.
* **Solusi**: Bersihkan cookies browser untuk `localhost`, pastikan user terdaftar di Supabase Auth, dan lakukan login ulang di `/admin/login`.

---

## 🤝 Contributing

1. Buat branch fitur baru (`git checkout -b feature/nama-fitur`).
2. Terapkan perubahan dan pastikan kode lolos linting (`npm run lint`).
3. Pastikan build berhasil tanpa error (`npm run build`).
4. Commit perubahan dengan pesan yang deskriptif (`git commit -m "feat: tambah modul kegiatan"`).
5. Push ke branch Anda (`git push origin feature/nama-fitur`).
6. Buat Pull Request ke branch `main`.

---

## 📄 License & Organization

Website ini dikembangkan untuk organisasi **GEMARAWANA — Mahasiswa Pecinta Alam Telkom University**.
Seluruh konten, logo, dan dokumentasi merupakan hak milik GEMARAWANA Telkom University.