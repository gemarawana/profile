-- 1. images (legacy image URL registry)
INSERT INTO public.images (asset_key, image_url, alt_text) VALUES
('hero', 'https://images.unsplash.com/photo-1578592391689-0e3d1a1b52b9?w=1600&h=1000&fit=crop&auto=format', 'Mountain adventure'),
('heroGroup', 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=1400&h=900&fit=crop&auto=format', 'Gemarawana group'),
('intro', 'https://images.unsplash.com/photo-1629185752152-fe65698ddee4?w=900&h=1100&fit=crop&auto=format', 'Gemarawana members hiking together'),
('hiking1', 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=800&h=1000&fit=crop&auto=format', 'Hiking'),
('hiking2', 'https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?w=800&h=600&fit=crop&auto=format', 'Highland trek'),
('mountain1', 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=800&h=1000&fit=crop&auto=format', 'Mountain landscape'),
('mountain2', 'https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7?w=800&h=600&fit=crop&auto=format', 'Mountain landscape'),
('climbing', 'https://images.unsplash.com/photo-1758949868735-41ae958a0286?w=700&h=900&fit=crop&auto=format', 'Rock climbing'),
('climbingGroup', 'https://images.unsplash.com/photo-1769731897698-fad262ad1b37?w=800&h=600&fit=crop&auto=format', 'Outdoor training'),
('campfire', 'https://images.unsplash.com/photo-1758272959595-1d4113b1118b?w=800&h=600&fit=crop&auto=format', 'Campfire'),
('campfire2', 'https://images.unsplash.com/photo-1758272960155-3adf56c34870?w=800&h=600&fit=crop&auto=format', 'Friends at campfire'),
('friends', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&auto=format', 'Team bonding'),
('friendsSunset', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&auto=format', 'Sunset with friends'),
('trail', 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&h=600&fit=crop&auto=format', 'Trail hike'),
('forest', 'https://images.unsplash.com/photo-1597120590849-a1d5a743d155?w=800&h=1000&fit=crop&auto=format', 'Forest trail'),
('mountainNight', 'https://images.unsplash.com/photo-1554176259-aa961fc32671?w=1400&h=900&fit=crop&auto=format', 'Starry mountain night'),
('mountainAerial', 'https://images.unsplash.com/photo-1504870712357-65ea720d6078?w=900&h=700&fit=crop&auto=format', 'Aerial mountain'),
('rocky', 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&h=600&fit=crop&auto=format', 'Rocky mountain'),
('ctaBg', 'https://images.unsplash.com/photo-1547093349-65cdba98369a?w=1600&h=900&fit=crop&auto=format', 'Mountain landscape background')
ON CONFLICT (asset_key) DO UPDATE SET image_url = EXCLUDED.image_url, alt_text = EXCLUDED.alt_text;

-- 2. site_settings
INSERT INTO public.site_settings (key, value) VALUES
('nav_links', '[{"label": "Tentang", "href": "#tentang"}, {"label": "Kegiatan", "href": "#kegiatan"}, {"label": "Eksplorasi", "href": "#berita"}, {"label": "Cerita", "href": "#cerita"}, {"label": "Galeri", "href": "#galeri"}]'::jsonb),
('footer_nav_links', '[{"label": "Tentang", "href": "#tentang"}, {"label": "Kegiatan", "href": "#kegiatan"}, {"label": "Cerita", "href": "#cerita"}, {"label": "Galeri", "href": "#galeri"}, {"label": "FAQ", "href": "#faq"}, {"label": "Join Us", "href": "#join"}]'::jsonb),
('footer_socials', '[{"label": "Instagram", "href": "#"}, {"label": "TikTok", "href": "#"}, {"label": "YouTube", "href": "#"}, {"label": "WhatsApp", "href": "#"}]'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 2. hero_slides
INSERT INTO public.hero_slides (id, label, description, image_url, order_index, is_published) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Adventure', 'Beyond the summit', 'https://images.unsplash.com/photo-1578592391689-0e3d1a1b52b9?w=1600&h=1000&fit=crop&auto=format', 0, true),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Brotherhood', 'Together as one', 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=1400&h=900&fit=crop&auto=format', 1, true),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Exploration', 'Discover new peaks', 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=800&h=1000&fit=crop&auto=format', 2, true),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Conservation', 'Protect what we love', 'https://images.unsplash.com/photo-1758272959595-1d4113b1118b?w=800&h=600&fit=crop&auto=format', 3, true)
ON CONFLICT (id) DO NOTHING;

-- 3. why_cards
INSERT INTO public.why_cards (id, title, desc_text, icon_name, order_index, is_published) VALUES
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 'Adventure', 'Rasakan pengalaman berpetualang di alam terbuka melalui berbagai aktivitas outdoor yang menantang dan bermakna.', 'adventure', 0, true),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b12', 'Personal Growth', 'Bangun mental, leadership, disiplin, keberanian, dan tanggung jawab melalui pengalaman nyata di alam.', 'growth', 1, true),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b13', 'Brotherhood', 'Tumbuhkan ikatan keluarga yang kuat lintas angkatan melalui perjalanan, latihan, dan perjuangan bersama.', 'brotherhood', 2, true),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b14', 'Memories', 'Ciptakan cerita dan pengalaman yang akan terus dikenang, dari perjalanan pertama hingga ekspedisi bersama.', 'memories', 3, true),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b15', 'Networking', 'Perluas koneksi bersama alumni Gemarawana serta aktivis dan komunitas di bidang lingkungan dan olahraga outdoor.', 'networking', 4, true),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b16', 'Skill Mastery', 'Kuasai keterampilan outdoor secara langsung melalui empat divisi aktif: Mountaineering, Rock Climbing, Rafting, dan Journalistic.', 'compass', 5, true)
ON CONFLICT (id) DO NOTHING;

-- 4. organization_divisions
INSERT INTO public.organization_divisions (id, name, slug, description, order_index, is_published) VALUES
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c11', 'Divisi Mountaineering', 'mountaineering', 'Divisi penjelajahan dan pendakian gunung tinggi.', 0, true),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c12', 'Divisi Rock Climbing', 'rock-climbing', 'Divisi pemanjatan tebing alam dan dinding buatan.', 1, true),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c13', 'Divisi Rafting', 'rafting', 'Divisi pengarungan sungai arus deras.', 2, true),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c14', 'Divisi Journalistic', 'journalistic', 'Divisi dokumentasi, kepenulisan, dan penyebaran warta.', 3, true),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c15', 'Executive (BPH)', 'executive', 'Badan Pengurus Harian Gemarawana.', 4, true),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c16', 'Administration', 'administration', 'Urusan administrasi dan persuratan.', 5, true),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c17', 'Finance', 'finance', 'Urusan keuangan dan anggaran.', 6, true)
ON CONFLICT (id) DO NOTHING;

-- 5. organization_members
INSERT INTO public.organization_members (id, division_id, name, role, batch, image_url, order_index, is_active) VALUES
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380d11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c15', 'Ahmad Fauzan', 'Ketua Umum', 'Angkatan 2022', 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&h=600&fit=crop&auto=format', 0, true),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380d12', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c16', 'Nadia Putri', 'Sekretaris Umum', 'Angkatan 2023', 'https://images.unsplash.com/photo-1597120590849-a1d5a743d155?w=800&h=1000&fit=crop&auto=format', 1, true),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380d13', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c17', 'Budi Santoso', 'Bendahara', 'Angkatan 2022', 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=800&h=1000&fit=crop&auto=format', 2, true),
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380d14', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c11', 'Indira Sari', 'Div. Mountaineering', 'Angkatan 2023', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&auto=format', 3, true)
ON CONFLICT (id) DO NOTHING;

-- 6. activities
INSERT INTO public.activities (id, division_id, title, slug, subtitle, description, image_url, bento_span, order_index, is_published) VALUES
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380e11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c11', 'Mountaineering', 'mountaineering', 'Explore the summit.', 'Mendaki puncak-puncak tertinggi dan mempelajari teknik navigasi gunung hutan.', 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=800&h=1000&fit=crop&auto=format', 'large-left', 0, true),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380e12', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c12', 'Climbing', 'climbing', 'Challenge yourself.', 'Pemanjatan tebing alam (rock climbing) dan penjelajahan dinding vertikal.', 'https://images.unsplash.com/photo-1758949868735-41ae958a0286?w=700&h=900&fit=crop&auto=format', 'normal', 1, true),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380e13', NULL, 'Conservation', 'conservation', 'Protect the places we explore.', 'Kegiatan pelestarian alam, penanaman pohon, dan pembersihan sampah gunung.', 'https://images.unsplash.com/photo-1758272960155-3adf56c34870?w=800&h=600&fit=crop&auto=format', 'normal', 2, true),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380e14', NULL, 'Outdoor Training', 'outdoor-training', 'Learn skills beyond the classroom.', 'Pendidikan dan latihan kemampuan survival di alam terbuka secara taktis.', 'https://images.unsplash.com/photo-1769731897698-fad262ad1b37?w=800&h=600&fit=crop&auto=format', 'normal', 3, true),
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380e15', NULL, 'Expedition', 'expedition', 'Go further together.', 'Perjalanan ekspedisi eksplorasi jalur baru secara kolaboratif.', 'https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?w=800&h=600&fit=crop&auto=format', 'wide-bottom', 4, true)
ON CONFLICT (id) DO NOTHING;

-- 7. journey_steps
INSERT INTO public.journey_steps (id, step_number, title, description, image_url, order_index, is_published) VALUES
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380f11', '01', 'DISCOVER', 'Kenalan dengan Gemarawana dan temukan dunia baru yang menunggumu.', 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=800&h=1000&fit=crop&auto=format', 0, true),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380f12', '02', 'LEARN', 'Pelajari basic outdoor skills - navigasi, survival, dan teknik dasar pendakian.', 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&h=600&fit=crop&auto=format', 1, true),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380f13', '03', 'EXPLORE', 'Ikuti perjalanan dan kegiatan pertamamu bersama tim Gemarawana.', 'https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?w=800&h=600&fit=crop&auto=format', 2, true),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380f14', '04', 'CHALLENGE', 'Hadapi tantangan sesungguhnya di lapangan bersama tim yang solid.', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&auto=format', 3, true),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380f15', '05', 'GROW', 'Bangun leadership, karakter, dan mental yang kuat melalui pengalaman nyata.', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&auto=format', 4, true),
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380f16', '06', 'BELONG', 'Menjadi bagian dari keluarga besar Gemarawana lintas generasi.', 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=1400&h=900&fit=crop&auto=format', 5, true)
ON CONFLICT (id) DO UPDATE SET
    step_number = EXCLUDED.step_number,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url,
    order_index = EXCLUDED.order_index,
    is_published = EXCLUDED.is_published;

-- 8. gallery_items
INSERT INTO public.gallery_items (id, image_url, alt_text, grid_class, order_index, is_published) VALUES
('01eebc99-9c0b-4ef8-bb6d-6bb9bd380011', 'https://images.unsplash.com/photo-1758272959595-1d4113b1118b?w=800&h=600&fit=crop&auto=format', 'Campfire gathering', 'col-span-2 row-span-1', 0, true),
('01eebc99-9c0b-4ef8-bb6d-6bb9bd380012', 'https://images.unsplash.com/photo-1758949868735-41ae958a0286?w=700&h=900&fit=crop&auto=format', 'Rock climbing', 'col-span-1 row-span-2', 1, true),
('01eebc99-9c0b-4ef8-bb6d-6bb9bd380013', 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&h=600&fit=crop&auto=format', 'Trail hike', 'col-span-1 row-span-1', 2, true),
('01eebc99-9c0b-4ef8-bb6d-6bb9bd380014', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&auto=format', 'Team bonding', 'col-span-1 row-span-1', 3, true),
('01eebc99-9c0b-4ef8-bb6d-6bb9bd380015', 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=1400&h=900&fit=crop&auto=format', 'Summit expedition', 'col-span-1 row-span-1', 4, true),
('01eebc99-9c0b-4ef8-bb6d-6bb9bd380016', 'https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?w=800&h=600&fit=crop&auto=format', 'Highland trek', 'col-span-1 row-span-1', 5, true),
('01eebc99-9c0b-4ef8-bb6d-6bb9bd380017', 'https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7?w=800&h=600&fit=crop&auto=format', 'Mountain landscape', 'col-span-2 row-span-1', 6, true),
('01eebc99-9c0b-4ef8-bb6d-6bb9bd380018', 'https://images.unsplash.com/photo-1597120590849-a1d5a743d155?w=800&h=1000&fit=crop&auto=format', 'Forest trail', 'col-span-1 row-span-2', 7, true),
('01eebc99-9c0b-4ef8-bb6d-6bb9bd380019', 'https://images.unsplash.com/photo-1758272960155-3adf56c34870?w=800&h=600&fit=crop&auto=format', 'Friends at campfire', 'col-span-1 row-span-1', 8, true),
('01eebc99-9c0b-4ef8-bb6d-6bb9bd380020', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&auto=format', 'Sunset with friends', 'col-span-1 row-span-1', 9, true),
('01eebc99-9c0b-4ef8-bb6d-6bb9bd380021', 'https://images.unsplash.com/photo-1769731897698-fad262ad1b37?w=800&h=600&fit=crop&auto=format', 'Outdoor training', 'col-span-1 row-span-1', 10, true),
('01eebc99-9c0b-4ef8-bb6d-6bb9bd380022', 'https://images.unsplash.com/photo-1554176259-aa961fc32671?w=1400&h=900&fit=crop&auto=format', 'Starry mountain night', 'col-span-1 row-span-1', 11, true)
ON CONFLICT (id) DO NOTHING;

-- 9. member_stories
INSERT INTO public.member_stories (id, name, batch, quote, full_story, image_url, order_index, is_published) VALUES
('11eebc99-9c0b-4ef8-bb6d-6bb9bd380111', 'Rizky Pratama', 'Angkatan 2022', 'Awalnya saya nggak pernah naik gunung. Ternyata Gemarawana bukan cuma mengajarkan saya tentang alam, tapi juga tentang diri saya sendiri.', NULL, 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=800&h=1000&fit=crop&auto=format', 0, true),
('11eebc99-9c0b-4ef8-bb6d-6bb9bd380112', 'Sari Dewi Ananda', 'Angkatan 2021', 'Di sini saya belajar artinya kerja tim yang sesungguhnya. Setiap pendakian mengajarkan saya hal baru tentang leadership dan kepercayaan.', NULL, 'https://images.unsplash.com/photo-1597120590849-a1d5a743d155?w=800&h=1000&fit=crop&auto=format', 1, true),
('11eebc99-9c0b-4ef8-bb6d-6bb9bd380113', 'Bagas Nugroho', 'Angkatan 2023', 'Bergabung dengan Gemarawana adalah keputusan terbaik selama kuliah. Keluarga ini yang bikin saya bertahan dan terus berkembang.', NULL, 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&h=600&fit=crop&auto=format', 2, true)
ON CONFLICT (id) DO NOTHING;

-- 10. articles
INSERT INTO public.articles (id, division_id, title, slug, excerpt, content, category, author_name, publication_date, read_time, image_url, is_featured, is_published) VALUES
('22eebc99-9c0b-4ef8-bb6d-6bb9bd380211', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c11', 'Ekspedisi Atap Jawa Barat: Tim Gemarawana Berhasil Menuntaskan Misi Konservasi & Navigasi Gunung Ciremai', 'ekspedisi-atap-jawa-barat-ciremai', 'Laporan resmi perjalanan 4 hari tim ekspedisi Gemarawana melintasi jalur Palutungan hingga Apuy sambil melakukan pemetaan keanekaragaman hayati dan pembersihan sampah pelestarian alam.', NULL, 'Ekspedisi & Konservasi', 'Divisi Mountaineering', '2026-08-10', '5 MIN READ', 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=800&h=1000&fit=crop&auto=format', true, true),
('22eebc99-9c0b-4ef8-bb6d-6bb9bd380212', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c12', 'Latihan Gabungan Rock Climbing: Mengasah Teknik Anchor & Safety Rigging Tebing Terjal', 'latihan-gabungan-rock-climbing-mandu', 'Penggemblengan fisik dan mental anggota muda dalam menguasai prosedur keselamatan tinggi, pemanjatan artificial, dan teknik penambatan tebing.', NULL, 'Rock Climbing', 'Divisi Rock Climbing', '2026-07-28', '4 MIN READ', 'https://images.unsplash.com/photo-1758949868735-41ae958a0286?w=700&h=900&fit=crop&auto=format', false, true),
('22eebc99-9c0b-4ef8-bb6d-6bb9bd380213', NULL, 'Aksi Bersih Gunung & Penanaman 500 Bibit Pohon di Hutan Lindung Papandayan', 'aksi-bersih-gunung-penanaman-bibit-papandayan', 'Wujud nyata komitmen perlindungan alam binaan divisi Lingkungan Hidup bersama masyarakat adat lokal dan jajaran aktivis konservasi.', NULL, 'Konservasi Alam', 'Divisi Lingkungan Hidup', '2026-07-15', '3 MIN READ', 'https://images.unsplash.com/photo-1758272960155-3adf56c34870?w=800&h=600&fit=crop&auto=format', false, true),
('22eebc99-9c0b-4ef8-bb6d-6bb9bd380214', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c14', 'Warta Jurnalistik Outdoor: Catatan Etnografi & Dokumentasi Visual Ekspedisi Rimba Sumatra', 'warta-jurnalistik-outdoor-rimba-sumatra', 'Hasil riset lapangan dan dokumentasi foto-jurnalistik mengenai kearifan lokal masyarakat pinggir hutan dan pelestarian vegetasi langka.', NULL, 'Jurnalistik & Liputan', 'Divisi Jurnalistik', '2026-07-02', '6 MIN READ', 'https://images.unsplash.com/photo-1597120590849-a1d5a743d155?w=800&h=1000&fit=crop&auto=format', false, true),
('22eebc99-9c0b-4ef8-bb6d-6bb9bd380215', NULL, 'Pengembaraan Anggota Muda: Pelatihan Orientasi Medan & Survival Dasar di Kaki Gunung Gede', 'pengembaraan-anggota-muda-survival-gede', 'Ujian tahap akhir bagi calon anggota baru dalam menguji ketahanan fisik, manajemen logistik pendakian, dan navigasi darat kompas-peta.', NULL, 'Diksar & Pelatihan', 'Divisi Pendidikan & Latihan', '2026-06-18', '4 MIN READ', 'https://images.unsplash.com/photo-1769731897698-fad262ad1b37?w=800&h=600&fit=crop&auto=format', false, true),
('22eebc99-9c0b-4ef8-bb6d-6bb9bd380216', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c13', 'Arung Jeram & Simulasi Pertolongan Air: Pengarungan Deras Sungai Citarik', 'arung-jeram-simulasi-pertolongan-air-citarik', 'Simulasi keselamatan air dan penguasaan teknik dayung arung jeram kelas III+ bersama instruktur pemandu berpengalaman.', NULL, 'Rafting & ORAD', 'Divisi Olahraga Arus Deras', '2026-06-05', '5 MIN READ', 'https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?w=800&h=600&fit=crop&auto=format', false, true)
ON CONFLICT (id) DO NOTHING;

-- 11. history_milestones
INSERT INTO public.history_milestones (id, year, event_description, order_index, is_published) VALUES
('33eebc99-9c0b-4ef8-bb6d-6bb9bd380311', '1987', 'Gemarawana didirikan oleh sekelompok mahasiswa pecinta alam yang bersemangat dan bervisi.', 0, true),
('33eebc99-9c0b-4ef8-bb6d-6bb9bd380312', '1991', 'Ekspedisi besar pertama ke puncak Semeru — sebuah milestone yang mendefinisikan identitas organisasi.', 1, true),
('33eebc99-9c0b-4ef8-bb6d-6bb9bd380313', '1999', 'Program konservasi dimulai, memperluas visi dari sekadar mendaki menjadi menjaga dan mencintai alam.', 2, true),
('33eebc99-9c0b-4ef8-bb6d-6bb9bd380314', '2010', 'Ekspansi besar-besaran anggota dan program — melampaui 200 anggota aktif.', 3, true),
('33eebc99-9c0b-4ef8-bb6d-6bb9bd380315', '2018', 'Inisiatif lingkungan skala nasional mendapat pengakuan dari Kementerian Lingkungan Hidup.', 4, true),
('33eebc99-9c0b-4ef8-bb6d-6bb9bd380316', '2026', 'Generasi baru memulai babak berikutnya dari perjalanan panjang Gemarawana.', 5, true)
ON CONFLICT (id) DO NOTHING;

-- 12. faqs
INSERT INTO public.faqs (id, question, answer, category, order_index, is_published) VALUES
('44eebc99-9c0b-4ef8-bb6d-6bb9bd380411', 'Apakah harus sudah bisa naik gunung?', 'Tidak sama sekali! Kami menerima anggota dari semua level. Program kami dimulai dari basic training yang mengajarkan semua skill dari nol.', 'General', 0, true),
('44eebc99-9c0b-4ef8-bb6d-6bb9bd380412', 'Apakah mahasiswa baru boleh bergabung?', 'Ya! Mahasiswa baru sangat dipersilahkan bergabung. Justru awal kuliah adalah waktu terbaik untuk mulai perjalananmu.', 'General', 1, true),
('44eebc99-9c0b-4ef8-bb6d-6bb9bd380413', 'Apakah harus memiliki perlengkapan outdoor sendiri?', 'Tidak wajib. Gemarawana memiliki koleksi perlengkapan yang bisa dipinjamkan untuk anggota, terutama untuk kegiatan bersama.', 'General', 2, true),
('44eebc99-9c0b-4ef8-bb6d-6bb9bd380414', 'Apa saja yang akan dipelajari?', 'Navigasi, survival, pertolongan pertama (P3K), teknik pendakian, konservasi alam, leadership, dan banyak lagi.', 'General', 3, true),
('44eebc99-9c0b-4ef8-bb6d-6bb9bd380415', 'Apakah kegiatannya hanya naik gunung?', 'Jauh dari itu! Kami punya hiking, rock climbing, camping, soft trekking, environmental actions, training, dan berbagai kegiatan sosial.', 'General', 4, true),
('44eebc99-9c0b-4ef8-bb6d-6bb9bd380416', 'Apakah ada biaya untuk bergabung?', 'Ada iuran keanggotaan yang terjangkau. Detail biaya disampaikan saat proses rekrutmen berlangsung.', 'General', 5, true),
('44eebc99-9c0b-4ef8-bb6d-6bb9bd380417', 'Bagaimana proses pendaftarannya?', 'Daftar online, ikuti orientasi, lulus seleksi dasar, dan welcome to the family! Prosesnya tidak menakutkan sama sekali.', 'General', 6, true),
('44eebc99-9c0b-4ef8-bb6d-6bb9bd380418', 'Kapan open recruitment dibuka?', 'Open recruitment biasanya dibuka di awal semester genap. Follow Instagram kami untuk update terbaru.', 'General', 7, true)
ON CONFLICT (id) DO NOTHING;

-- 13. impact_statistics
INSERT INTO public.impact_statistics (id, stat_key, stat_value, stat_suffix, label, order_index) VALUES
('55eebc99-9c0b-4ef8-bb6d-6bb9bd380511', 'expeditions', 84, '+', 'Expeditions', 0),
('55eebc99-9c0b-4ef8-bb6d-6bb9bd380512', 'environmental_actions', 42, '+', 'Environmental Actions', 1),
('55eebc99-9c0b-4ef8-bb6d-6bb9bd380513', 'students_reached', 1200, '+', 'Students Reached', 2),
('55eebc99-9c0b-4ef8-bb6d-6bb9bd380514', 'projects', 28, '+', 'Conservation Projects', 3)
ON CONFLICT (id) DO NOTHING;
