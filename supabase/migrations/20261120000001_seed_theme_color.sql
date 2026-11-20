-- Seed default theme_color configuration in site_settings (idempotent)
INSERT INTO public.site_settings (key, value)
VALUES (
    'theme_color',
    '{"primary": "#8B1D1D", "primary_hover": "#6E1515", "primary_light": "#FDF2F2", "preset_name": "Maroon Default"}'::jsonb
)
ON CONFLICT (key) DO NOTHING;
