CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  category text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  cover_image text NOT NULL DEFAULT '',
  body_html text NOT NULL DEFAULT '',
  author text,
  video_url text,
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.articles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.articles TO authenticated;
GRANT ALL ON public.articles TO service_role;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published articles" ON public.articles FOR SELECT TO anon USING (published = true);
CREATE POLICY "Signed-in users can read published articles" ON public.articles FOR SELECT TO authenticated USING (published = true);

CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  bio text,
  photo_url text,
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.team_members TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read visible management profiles" ON public.team_members FOR SELECT TO anon USING (visible = true);
CREATE POLICY "Signed-in users can read visible management profiles" ON public.team_members FOR SELECT TO authenticated USING (visible = true);

CREATE INDEX articles_published_at_idx ON public.articles (published_at DESC) WHERE published = true;
CREATE INDEX team_members_sort_order_idx ON public.team_members (sort_order ASC) WHERE visible = true;