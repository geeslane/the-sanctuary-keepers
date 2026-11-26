import { createServerFn } from "@tanstack/react-start";
import { requireLocalAdmin } from "@/lib/admin-auth.functions";
import { articleBodyToHtml, cleanArticleHtml, slugifyTitle } from "@/lib/article-admin";
import { youtubeEmbedUrl } from "@/lib/youtube";

export type AdminArticle = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  cover_image: string;
  body_html: string;
  video_url: string | null;
  author: string | null;
  published: boolean;
  published_at: string | null;
  updated_at: string;
};

async function withArticles<T>(run: (db: Awaited<typeof import("@/integrations/supabase/client.server")>["supabaseAdmin"]) => Promise<T>) {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    return await run(supabaseAdmin);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("SUPABASE_SERVICE_ROLE_KEY")) {
      throw new Error("Publishing is not set up on the server yet. Add SUPABASE_SERVICE_ROLE_KEY to the server environment.");
    }
    throw error;
  }
}

function cleanText(value: unknown, label: string, max: number, required = false) {
  const text = typeof value === "string" ? value.trim() : "";
  if (required && !text) throw new Error(`${label} is required.`);
  if (text.length > max) throw new Error(`${label} is too long.`);
  return text;
}

const listAdminArticles = createServerFn({ method: "GET" })
  .middleware([requireLocalAdmin])
  .handler(async (): Promise<AdminArticle[]> => {
    return withArticles(async (db) => {
      const { data, error } = await db
        .from("articles")
        .select("id, title, slug, category, excerpt, cover_image, body_html, video_url, author, published, published_at, updated_at")
        .order("updated_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data ?? [];
    });
  });

const saveArticle = createServerFn({ method: "POST" })
  .middleware([requireLocalAdmin])
  .validator((input: {
    id?: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    coverImage: string;
    videoUrl: string;
    author: string;
    body: string;
    published: boolean;
  }) => {
    const title = cleanText(input?.title, "Title", 180, true);
    const requestedSlug = cleanText(input?.slug, "Address", 80) || slugifyTitle(title);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(requestedSlug)) {
      throw new Error("Use a simple address made of lowercase words, such as walking-in-holiness.");
    }
    const category = cleanText(input?.category, "Category", 60, true);
    const excerpt = cleanText(input?.excerpt, "Summary", 400);
    const coverImage = cleanText(input?.coverImage, "Cover image", 500);
    if (coverImage && !/^https?:\/\//i.test(coverImage)) throw new Error("Cover image must be a web address.");
    const videoUrl = cleanText(input?.videoUrl, "YouTube video", 300);
    if (videoUrl && !youtubeEmbedUrl(videoUrl)) throw new Error("Use a YouTube link, such as https://www.youtube.com/watch?v=xxxxxxxxxxx");
    const author = cleanText(input?.author, "Author", 120);
    const body = typeof input?.body === "string" ? input.body : "";
    if (body.length > 100_000) throw new Error("The article is too long.");
    const published = Boolean(input?.published);
    const bodyHtml = cleanArticleHtml(articleBodyToHtml(body));
    if (published && !bodyHtml && !videoUrl) throw new Error("Write the article or add a YouTube video before publishing.");
    return {
      id: typeof input?.id === "string" && input.id ? input.id : undefined,
      title,
      slug: requestedSlug,
      category,
      excerpt,
      coverImage,
      videoUrl,
      author,
      bodyHtml,
      published,
    };
  })
  .handler(async ({ data }) => {
    return withArticles(async (db) => {
      const now = new Date().toISOString();
      let publishedAt: string | null = data.published ? now : null;
      if (data.id) {
        const { data: existing, error: existingError } = await db.from("articles").select("published_at").eq("id", data.id).maybeSingle();
        if (existingError) throw new Error(existingError.message);
        if (!existing) throw new Error("That article could not be found.");
        publishedAt = data.published ? existing.published_at ?? now : existing.published_at;
      }
      const row = {
        title: data.title,
        slug: data.slug,
        category: data.category,
        excerpt: data.excerpt,
        cover_image: data.coverImage,
        body_html: data.bodyHtml,
        video_url: data.videoUrl || null,
        author: data.author || null,
        published: data.published,
        published_at: publishedAt,
        updated_at: now,
      };
      const query = data.id
        ? db.from("articles").update(row).eq("id", data.id).select("id").single()
        : db.from("articles").insert(row).select("id").single();
      const { data: saved, error } = await query;
      if (error) {
        if (error.code === "23505") throw new Error("That address is already used. Choose another one.");
        throw new Error(error.message);
      }
      return { id: saved.id };
    });
  });

const deleteArticle = createServerFn({ method: "POST" })
  .middleware([requireLocalAdmin])
  .validator((input: { id: string }) => {
    const id = cleanText(input?.id, "Article", 80, true);
    return { id };
  })
  .handler(async ({ data }) => {
    await withArticles(async (db) => {
      const { error } = await db.from("articles").delete().eq("id", data.id);
      if (error) throw new Error(error.message);
    });
    return { ok: true };
  });

export { listAdminArticles, saveArticle, deleteArticle };
