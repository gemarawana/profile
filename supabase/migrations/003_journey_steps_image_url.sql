ALTER TABLE public.journey_steps
ADD COLUMN IF NOT EXISTS image_url TEXT;

UPDATE public.journey_steps
SET image_url = CASE step_number
    WHEN '01' THEN 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=800&h=1000&fit=crop&auto=format'
    WHEN '02' THEN 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&h=600&fit=crop&auto=format'
    WHEN '03' THEN 'https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?w=800&h=600&fit=crop&auto=format'
    WHEN '04' THEN 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&auto=format'
    WHEN '05' THEN 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&auto=format'
    WHEN '06' THEN 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=1400&h=900&fit=crop&auto=format'
    ELSE 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=800&h=1000&fit=crop&auto=format'
END
WHERE image_url IS NULL;

ALTER TABLE public.journey_steps
ALTER COLUMN image_url SET NOT NULL;
