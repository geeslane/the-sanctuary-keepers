import type { Article } from "@/components/ArticleDataProvider";

export function formatDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric" });
}

export function readingLabel(article: Pick<Article, "body_html" | "excerpt">) {
  const text = `${article.excerpt} ${article.body_html}`.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export { youtubeEmbedUrl } from "@/lib/youtube";

export function byCategory(articles: Article[], category: string) {
  return articles.filter((article) => article.category === category);
}
