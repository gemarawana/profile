-- Admin RLS write policies + Storage bucket
-- Auth: any authenticated Supabase user (auth.uid() IS NOT NULL) may mutate CMS content.
-- Public read policies remain unchanged.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT auth.uid() IS NOT NULL;
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon;

DO $$
DECLARE
    t text;
    tables text[] := ARRAY[
        'site_settings',
        'hero_slides',
        'why_cards',
        'organization_divisions',
        'organization_members',
        'activities',
        'journey_steps',
        'gallery_items',
        'member_stories',
        'articles',
        'history_milestones',
        'faqs',
        'impact_statistics',
        'images'
    ];
BEGIN
    FOREACH t IN ARRAY tables
    LOOP
        EXECUTE format(
            'CREATE POLICY "Admin select all %1$s" ON public.%1$I FOR SELECT TO authenticated USING (public.is_admin());',
            t
        );
        EXECUTE format(
            'CREATE POLICY "Admin insert %1$s" ON public.%1$I FOR INSERT TO authenticated WITH CHECK (public.is_admin());',
            t
        );
        EXECUTE format(
            'CREATE POLICY "Admin update %1$s" ON public.%1$I FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());',
            t
        );
        EXECUTE format(
            'CREATE POLICY "Admin delete %1$s" ON public.%1$I FOR DELETE TO authenticated USING (public.is_admin());',
            t
        );
    END LOOP;
END;
$$;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'cms-media',
    'cms-media',
    true,
    10485760,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "Public read cms-media"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'cms-media');

CREATE POLICY "Admin upload cms-media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'cms-media' AND public.is_admin());

CREATE POLICY "Admin update cms-media"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'cms-media' AND public.is_admin())
WITH CHECK (bucket_id = 'cms-media' AND public.is_admin());

CREATE POLICY "Admin delete cms-media"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'cms-media' AND public.is_admin());
