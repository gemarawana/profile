// // Legacy migration reference only. Runtime content is read exclusively via src/lib/dal.
// import React from 'react'
// import { IMG } from './images'
// import type {
//   Activity,
//   WhyCard,
//   JourneyStep,
//   GalleryItem,
//   Story,
//   Expedition,
//   NewsArticle,
//   Leader,
//   FAQItem,
//   HistoryItem
// } from '../types'

// export const NAV_LINKS = [
//   { label: 'Tentang', href: '#tentang' },
//   { label: 'Kegiatan', href: '#kegiatan' },
//   { label: 'Eksplorasi', href: '#eksplorasi' },
//   { label: 'Cerita', href: '#cerita' },
//   { label: 'Galeri', href: '#galeri' },
// ]

// export const FOOTER_NAV_LINKS = [
//   { label: 'Tentang', href: '#tentang' },
//   { label: 'Kegiatan', href: '#kegiatan' },
//   { label: 'Cerita', href: '#cerita' },
//   { label: 'Galeri', href: '#galeri' },
//   { label: 'FAQ', href: '#faq' },
//   { label: 'Join Us', href: '#join' },
// ]

// export const FOOTER_SOCIALS = [
//   { label: 'Instagram', href: '#' },
//   { label: 'TikTok', href: '#' },
//   { label: 'YouTube', href: '#' },
//   { label: 'WhatsApp', href: '#' },
// ]

// export const WHY_CARDS: WhyCard[] = [
//   {
//     icon: (
//       <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center text-[#8B1A1A]">
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18L13 5l-3 5-2-3-5 13z" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 3" />
//         </svg>
//       </div>
//     ),
//     title: 'Adventure',
//     desc: 'Rasakan pengalaman berpetualang di alam terbuka melalui berbagai aktivitas outdoor yang menantang dan bermakna.',
//   },
//   {
//     icon: (
//       <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center text-[#8B1A1A]">
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-4 4m4-4l4 4M5 19h14" />
//         </svg>
//       </div>
//     ),
//     title: 'Personal Growth',
//     desc: 'Bangun mental, leadership, disiplin, keberanian, dan tanggung jawab melalui pengalaman nyata di alam.',
//   },
//   {
//     icon: (
//       <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center text-[#8B1A1A]">
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//         </svg>
//       </div>
//     ),
//     title: 'Brotherhood',
//     desc: 'Tumbuhkan ikatan keluarga yang kuat lintas angkatan melalui perjalanan, latihan, dan perjuangan bersama.',
//   },
//   {
//     icon: (
//       <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center text-[#8B1A1A]">
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//         </svg>
//       </div>
//     ),
//     title: 'Memories',
//     desc: 'Ciptakan cerita dan pengalaman yang akan terus dikenang, dari perjalanan pertama hingga ekspedisi bersama.',
//   },
//   {
//     icon: (
//       <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center text-[#8B1A1A]">
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
//         </svg>
//       </div>
//     ),
//     title: 'Networking',
//     desc: 'Perluas koneksi bersama alumni Gemarawana serta aktivis dan komunitas di bidang lingkungan dan olahraga outdoor.',
//   },
//   {
//     icon: (
//       <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center text-[#8B1A1A]">
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M16.243 7.757l-2.121 6.364-6.364 2.121 2.121-6.364 6.364-2.121z" />
//         </svg>
//       </div>
//     ),
//     title: 'Skill Mastery',
//     desc: 'Kuasai keterampilan outdoor secara langsung melalui empat divisi aktif: Mountaineering, Rock Climbing, Rafting, dan Journalistic.',
//   },
// ]

// export const ACTIVITIES: Activity[] = [
//   { title: 'Mountaineering', sub: 'Explore the summit.', img: IMG.mountain1 },
//   { title: 'Climbing', sub: 'Challenge yourself.', img: IMG.climbing },
//   { title: 'Conservation', sub: 'Protect the places we explore.', img: IMG.campfire2 },
//   { title: 'Outdoor Training', sub: 'Learn skills beyond the classroom.', img: IMG.climbingGroup },
//   { title: 'Expedition', sub: 'Go further together.', img: IMG.hiking2 },
// ]

// export const JOURNEY: JourneyStep[] = [
//   { num: '01', title: 'DISCOVER', desc: 'Kenalan dengan Gemarawana dan temukan dunia baru yang menunggumu.' },
//   { num: '02', title: 'LEARN', desc: 'Pelajari basic outdoor skills — navigasi, survival, dan teknik dasar pendakian.' },
//   { num: '03', title: 'EXPLORE', desc: 'Ikuti perjalanan dan kegiatan pertamamu bersama tim Gemarawana.' },
//   { num: '04', title: 'CHALLENGE', desc: 'Hadapi tantangan sesungguhnya di lapangan bersama tim yang solid.' },
//   { num: '05', title: 'GROW', desc: 'Bangun leadership, karakter, dan mental yang kuat melalui pengalaman nyata.' },
//   { num: '06', title: 'BELONG', desc: 'Menjadi bagian dari keluarga besar Gemarawana lintas generasi.' },
// ]

// export const GALLERY: GalleryItem[] = [
//   { img: IMG.campfire,      className: 'col-span-2 row-span-1', alt: 'Campfire gathering' },
//   { img: IMG.climbing,      className: 'col-span-1 row-span-2', alt: 'Rock climbing' },
//   { img: IMG.trail,         className: 'col-span-1 row-span-1', alt: 'Trail hike' },
//   { img: IMG.friends,       className: 'col-span-1 row-span-1', alt: 'Team bonding' },
//   { img: IMG.heroGroup,     className: 'col-span-1 row-span-1', alt: 'Summit expedition' },
//   { img: IMG.hiking2,       className: 'col-span-1 row-span-1', alt: 'Highland trek' },
//   { img: IMG.mountain2,     className: 'col-span-2 row-span-1', alt: 'Mountain landscape' },
//   { img: IMG.forest,        className: 'col-span-1 row-span-2', alt: 'Forest trail' },
//   { img: IMG.campfire2,     className: 'col-span-1 row-span-1', alt: 'Friends at campfire' },
//   { img: IMG.friendsSunset, className: 'col-span-1 row-span-1', alt: 'Sunset with friends' },
//   { img: IMG.climbingGroup, className: 'col-span-1 row-span-1', alt: 'Outdoor training' },
//   { img: IMG.mountainNight, className: 'col-span-1 row-span-1', alt: 'Starry mountain night' },
// ]

// export const STORIES: Story[] = [
//   {
//     quote: "Awalnya saya nggak pernah naik gunung. Ternyata Gemarawana bukan cuma mengajarkan saya tentang alam, tapi juga tentang diri saya sendiri.",
//     name: 'Rizky Pratama',
//     batch: 'Angkatan 2022',
//     img: IMG.hiking1,
//   },
//   {
//     quote: "Di sini saya belajar artinya kerja tim yang sesungguhnya. Setiap pendakian mengajarkan saya hal baru tentang leadership dan kepercayaan.",
//     name: 'Sari Dewi Ananda',
//     batch: 'Angkatan 2021',
//     img: IMG.forest,
//   },
//   {
//     quote: "Bergabung dengan Gemarawana adalah keputusan terbaik selama kuliah. Keluarga ini yang bikin saya bertahan dan terus berkembang.",
//     name: 'Bagas Nugroho',
//     batch: 'Angkatan 2023',
//     img: IMG.trail,
//   },
// ]

// export const EXPEDITIONS: Expedition[] = [
//   { mountain: 'MOUNT PAPANDAYAN', year: '2026 Expedition', img: IMG.mountain1, large: true },
//   { mountain: 'MOUNT GEDE', year: '2026 Expedition', img: IMG.rocky, large: false },
//   { mountain: 'OUTDOOR TRAINING', year: '2026 Season', img: IMG.climbingGroup, large: false },
//   { mountain: 'CONSERVATION ACTION', year: '2026 Initiative', img: IMG.campfire, large: false },
// ]

// export const ARTICLES: NewsArticle[] = [
//   {
//     id: '1',
//     title: 'Ekspedisi Atap Jawa Barat: Tim Gemarawana Berhasil Menuntaskan Misi Konservasi & Navigasi Gunung Ciremai',
//     excerpt: 'Laporan resmi perjalanan 4 hari tim ekspedisi Gemarawana melintasi jalur Palutungan hingga Apuy sambil melakukan pemetaan keanekaragaman hayati dan pembersihan sampah pelestarian alam.',
//     category: 'Ekspedisi & Konservasi',
//     date: '10 AGUSTUS 2026',
//     readTime: '5 MIN READ',
//     author: 'Divisi Mountaineering',
//     img: IMG.mountain1,
//     slug: 'ekspedisi-atap-jawa-barat-ciremai',
//     featured: true,
//   },
//   {
//     id: '2',
//     title: 'Latihan Gabungan Rock Climbing: Mengasah Teknik Anchor & Safety Rigging Tebing Terjal',
//     excerpt: 'Penggemblengan fisik dan mental anggota muda dalam menguasai prosedur keselamatan tinggi, pemanjatan artificial, dan teknik penambatan tebing.',
//     category: 'Rock Climbing',
//     date: '28 JULI 2026',
//     readTime: '4 MIN READ',
//     author: 'Divisi Rock Climbing',
//     img: IMG.climbing,
//     slug: 'latihan-gabungan-rock-climbing-mandu',
//   },
//   {
//     id: '3',
//     title: 'Aksi Bersih Gunung & Penanaman 500 Bibit Pohon di Hutan Lindung Papandayan',
//     excerpt: 'Wujud nyata komitmen perlindungan alam binaan divisi Lingkungan Hidup bersama masyarakat adat lokal dan jajaran aktivis konservasi.',
//     category: 'Konservasi Alam',
//     date: '15 JULI 2026',
//     readTime: '3 MIN READ',
//     author: 'Divisi Lingkungan Hidup',
//     img: IMG.campfire2,
//     slug: 'aksi-bersih-gunung-penanaman-bibit-papandayan',
//   },
//   {
//     id: '4',
//     title: 'Warta Jurnalistik Outdoor: Catatan Etnografi & Dokumentasi Visual Ekspedisi Rimba Sumatra',
//     excerpt: 'Hasil riset lapangan dan dokumentasi foto-jurnalistik mengenai kearifan lokal masyarakat pinggir hutan dan pelestarian vegetasi langka.',
//     category: 'Jurnalistik & Liputan',
//     date: '02 JULI 2026',
//     readTime: '6 MIN READ',
//     author: 'Divisi Jurnalistik',
//     img: IMG.forest,
//     slug: 'warta-jurnalistik-outdoor-rimba-sumatra',
//   },
//   {
//     id: '5',
//     title: 'Pengembaraan Anggota Muda: Pelatihan Orientasi Medan & Survival Dasar di Kaki Gunung Gede',
//     excerpt: 'Ujian tahap akhir bagi calon anggota baru dalam menguji ketahanan fisik, manajemen logistik pendakian, dan navigasi darat kompas-peta.',
//     category: 'Diksar & Pelatihan',
//     date: '18 JUNI 2026',
//     readTime: '4 MIN READ',
//     author: 'Divisi Pendidikan & Latihan',
//     img: IMG.climbingGroup,
//     slug: 'pengembaraan-anggota-muda-survival-gede',
//   },
//   {
//     id: '6',
//     title: 'Arung Jeram & Simulasi Pertolongan Air: Pengarungan Deras Sungai Citarik',
//     excerpt: 'Simulasi keselamatan air dan penguasaan teknik dayung arung jeram kelas III+ bersama instruktur pemandu berpengalaman.',
//     category: 'Rafting & ORAD',
//     date: '05 JUNI 2026',
//     readTime: '5 MIN READ',
//     author: 'Divisi Olahraga Arus Deras',
//     img: IMG.hiking2,
//     slug: 'arung-jeram-simulasi-pertolongan-air-citarik',
//   },
// ]

// export const HISTORY: HistoryItem[] = [
//   { year: '1987', event: 'Gemarawana didirikan oleh sekelompok mahasiswa pecinta alam yang bersemangat dan bervisi.' },
//   { year: '1991', event: 'Ekspedisi besar pertama ke puncak Semeru — sebuah milestone yang mendefinisikan identitas organisasi.' },
//   { year: '1999', event: 'Program konservasi dimulai, memperluas visi dari sekadar mendaki menjadi menjaga dan mencintai alam.' },
//   { year: '2010', event: 'Ekspansi besar-besaran anggota dan program — melampaui 200 anggota aktif.' },
//   { year: '2018', event: 'Inisiatif lingkungan skala nasional mendapat pengakuan dari Kementerian Lingkungan Hidup.' },
//   { year: '2026', event: 'Generasi baru memulai babak berikutnya dari perjalanan panjang Gemarawana.' },
// ]

// export const LEADERS: Leader[] = [
//   { name: 'Ahmad Fauzan', role: 'Ketua Umum', batch: 'Angkatan 2022', div: 'Executive', img: IMG.trail },
//   { name: 'Nadia Putri', role: 'Sekretaris Umum', batch: 'Angkatan 2023', div: 'Administration', img: IMG.forest },
//   { name: 'Budi Santoso', role: 'Bendahara', batch: 'Angkatan 2022', div: 'Finance', img: IMG.hiking1 },
//   { name: 'Indira Sari', role: 'Div. Mountaineering', batch: 'Angkatan 2023', div: 'Mountaineering', img: IMG.friends },
// ]

// export const FAQS: FAQItem[] = [
//   { q: 'Apakah harus sudah bisa naik gunung?', a: 'Tidak sama sekali! Kami menerima anggota dari semua level. Program kami dimulai dari basic training yang mengajarkan semua skill dari nol.' },
//   { q: 'Apakah mahasiswa baru boleh bergabung?', a: 'Ya! Mahasiswa baru sangat dipersilahkan bergabung. Justru awal kuliah adalah waktu terbaik untuk mulai perjalananmu.' },
//   { q: 'Apakah harus memiliki perlengkapan outdoor sendiri?', a: 'Tidak wajib. Gemarawana memiliki koleksi perlengkapan yang bisa dipinjamkan untuk anggota, terutama untuk kegiatan bersama.' },
//   { q: 'Apa saja yang akan dipelajari?', a: 'Navigasi, survival, pertolongan pertama (P3K), teknik pendakian, konservasi alam, leadership, dan banyak lagi.' },
//   { q: 'Apakah kegiatannya hanya naik gunung?', a: 'Jauh dari itu! Kami punya hiking, rock climbing, camping, soft trekking, environmental actions, training, dan berbagai kegiatan sosial.' },
//   { q: 'Apakah ada biaya untuk bergabung?', a: 'Ada iuran keanggotaan yang terjangkau. Detail biaya disampaikan saat proses rekrutmen berlangsung.' },
//   { q: 'Bagaimana proses pendaftarannya?', a: 'Daftar online, ikuti orientasi, lulus seleksi dasar, dan welcome to the family! Prosesnya tidak menakutkan sama sekali.' },
//   { q: 'Kapan open recruitment dibuka?', a: 'Open recruitment biasanya dibuka di awal semester genap. Follow Instagram kami untuk update terbaru.' },
// ]
