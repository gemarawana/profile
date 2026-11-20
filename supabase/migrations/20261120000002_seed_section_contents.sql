-- Seed default section_contents configuration in site_settings (idempotent)
INSERT INTO public.site_settings (key, value)
VALUES (
    'section_contents',
    '{
      "hero": {
        "title": "GEMA",
        "title_highlight": "RAWANA.",
        "description": "Bangun Jiwa yang Berani, Setia pada Kawan, Tangguh Seperti Serigala."
      },
      "introduction": {
        "badge": "Mapala Telkom University — Since 2008",
        "title": "WHAT IS",
        "title_highlight": "GEMARAWANA?",
        "description": "Gema Rawana merupakan wadah penggiat alam Universitas Telkom yang menjadi ruang untuk menjelajah, bertumbuh, dan membangun karakter melalui pengalaman di alam bebas.",
        "secondary_description": "Berlandaskan kekeluargaan dan kode etik penggiat alam, kami membentuk pribadi yang tangguh, terampil, berintegritas, serta peduli terhadap alam dan sesama."
      },
      "about": {
        "badge": "The Difference",
        "title": "WHY",
        "title_highlight": "GEMARAWANA?",
        "description": "Because the best lessons aren''t always learned inside a classroom."
      },
      "our_story": {
        "badge": "History",
        "title": "OUR STORY",
        "title_highlight": "",
        "description": ""
      },
      "organization": {
        "badge": "Leadership",
        "title": "MEET THE PEOPLE BEHIND GEMARAWANA",
        "title_highlight": "",
        "description": ""
      },
      "activities": {
        "badge": "Activities",
        "title": "WHAT",
        "title_highlight": "WE DO",
        "description": "From learning the basics to standing on the summit."
      },
      "journey": {
        "badge": "The Path",
        "title": "YOUR JOURNEY",
        "title_highlight": "STARTS HERE.",
        "description": "Every journey begins step by step."
      },
      "articles": {
        "badge": "Journalism & Events",
        "title": "LATEST DISPATCHES",
        "title_highlight": "& REPORTS",
        "description": "Expedition reports, activity updates, and news coverage from all Gemarawana divisions.",
        "button_text": "Lihat Berita Lainnya"
      },
      "stories": {
        "badge": "People",
        "title": "THE PEOPLE BEHIND THE",
        "title_highlight": "JOURNEY.",
        "description": ""
      },
      "impact": {
        "badge": "",
        "title": "BEYOND THE JOURNEY.",
        "title_highlight": "INTO THE IMPACT.",
        "description": "Explore the wild. Protect the earth. Empower humanity."
      },
      "gallery": {
        "badge": "Gallery",
        "title": "LIFE AT",
        "title_highlight": "GEMARAWANA",
        "description": "Not every great memory happens at the summit.",
        "button_text": "See More"
      },
      "faq": {
        "badge": "FAQ",
        "title": "CURIOUS? WE''VE GOT",
        "title_highlight": "ANSWERS.",
        "description": ""
      },
      "cta": {
        "badge": "Join Us",
        "title": "YOUR NEXT ADVENTURE",
        "title_highlight": "STARTS HERE.",
        "description": "No need to wait to be ready. Start your journey with Gemarawana.",
        "button_text": "JOIN GEMARAWANA",
        "secondary_button_text": "ASK US ANYTHING"
      }
    }'::jsonb
)
ON CONFLICT (key) DO NOTHING;
