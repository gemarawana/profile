-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to handle updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 1. site_settings
CREATE TABLE IF NOT EXISTS public.site_settings (
    key VARCHAR(255) PRIMARY KEY,
    value JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);

-- 2. hero_slides
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read hero_slides" ON public.hero_slides FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE INDEX IF NOT EXISTS hero_slides_order_idx ON public.hero_slides(order_index) WHERE is_published = true;

-- 3. why_cards
CREATE TABLE IF NOT EXISTS public.why_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    desc_text TEXT NOT NULL,
    icon_name VARCHAR(255) NOT NULL, -- "mountain", "growth", "brotherhood", "camera", "globe", "compass"
    order_index INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.why_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read why_cards" ON public.why_cards FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE INDEX IF NOT EXISTS why_cards_order_idx ON public.why_cards(order_index) WHERE is_published = true;

-- 4. organization_divisions
CREATE TABLE IF NOT EXISTS public.organization_divisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.organization_divisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read organization_divisions" ON public.organization_divisions FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE INDEX IF NOT EXISTS org_div_slug_idx ON public.organization_divisions(slug);

-- 5. organization_members
CREATE TABLE IF NOT EXISTS public.organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    division_id UUID REFERENCES public.organization_divisions(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    batch VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read organization_members" ON public.organization_members FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE INDEX IF NOT EXISTS org_mem_div_idx ON public.organization_members(division_id);

-- 6. activities
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    division_id UUID REFERENCES public.organization_divisions(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    subtitle TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    bento_span VARCHAR(50) DEFAULT 'normal' NOT NULL, -- e.g. "large-left", "middle-top", "middle-bottom", "right-top", "wide-bottom", "normal"
    order_index INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read activities" ON public.activities FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE INDEX IF NOT EXISTS activities_slug_idx ON public.activities(slug);
CREATE INDEX IF NOT EXISTS activities_order_idx ON public.activities(order_index) WHERE is_published = true;

-- 7. journey_steps
CREATE TABLE IF NOT EXISTS public.journey_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    step_number VARCHAR(10) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.journey_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read journey_steps" ON public.journey_steps FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE INDEX IF NOT EXISTS journey_steps_order_idx ON public.journey_steps(order_index) WHERE is_published = true;

-- 8. gallery_items
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255) NOT NULL,
    grid_class VARCHAR(100) NOT NULL DEFAULT 'col-span-1 row-span-1',
    order_index INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gallery_items" ON public.gallery_items FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE INDEX IF NOT EXISTS gallery_order_idx ON public.gallery_items(order_index) WHERE is_published = true;

-- 9. member_stories
CREATE TABLE IF NOT EXISTS public.member_stories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    batch VARCHAR(255) NOT NULL,
    quote TEXT NOT NULL,
    full_story TEXT,
    image_url TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.member_stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read member_stories" ON public.member_stories FOR SELECT TO anon, authenticated USING (is_published = true);

-- 10. articles
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    division_id UUID REFERENCES public.organization_divisions(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT,
    category VARCHAR(255) NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    publication_date DATE NOT NULL,
    read_time VARCHAR(50) NOT NULL,
    image_url TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read articles" ON public.articles FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE INDEX IF NOT EXISTS articles_slug_idx ON public.articles(slug);
CREATE INDEX IF NOT EXISTS articles_pub_date_idx ON public.articles(publication_date DESC) WHERE is_published = true;

-- 11. history_milestones
CREATE TABLE IF NOT EXISTS public.history_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    year VARCHAR(10) NOT NULL,
    event_description TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.history_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read history_milestones" ON public.history_milestones FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE INDEX IF NOT EXISTS history_order_idx ON public.history_milestones(order_index) WHERE is_published = true;

-- 12. faqs
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(255) DEFAULT 'General' NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE INDEX IF NOT EXISTS faqs_order_idx ON public.faqs(order_index) WHERE is_published = true;

-- 13. impact_statistics
CREATE TABLE IF NOT EXISTS public.impact_statistics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stat_key VARCHAR(255) UNIQUE NOT NULL,
    stat_value INTEGER NOT NULL,
    stat_suffix VARCHAR(50) DEFAULT '+' NOT NULL,
    label VARCHAR(255) NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
ALTER TABLE public.impact_statistics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read impact_statistics" ON public.impact_statistics FOR SELECT TO anon, authenticated USING (true);

-- Add triggers for auto-updating updated_at columns
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' 
          AND table_type = 'BASE TABLE'
          AND table_name IN ('site_settings', 'hero_slides', 'why_cards', 'organization_divisions', 'organization_members', 'activities', 'journey_steps', 'gallery_items', 'member_stories', 'articles', 'history_milestones', 'faqs', 'impact_statistics')
    LOOP
        EXECUTE format('CREATE TRIGGER tr_update_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();', t);
    END LOOP;
END;
$$;
