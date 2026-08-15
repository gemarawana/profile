CREATE TABLE IF NOT EXISTS public.images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_key VARCHAR(255) UNIQUE NOT NULL,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published images"
ON public.images FOR SELECT TO anon, authenticated
USING (is_published = true);

CREATE INDEX IF NOT EXISTS images_asset_key_idx ON public.images(asset_key);
CREATE INDEX IF NOT EXISTS images_published_idx ON public.images(is_published) WHERE is_published = true;

CREATE TRIGGER tr_update_images_updated_at
BEFORE UPDATE ON public.images
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
