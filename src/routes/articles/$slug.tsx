import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Facebook, Link2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ArticleBody } from "@/components/ArticleBody";
import { ArticleCard, PageHeader } from "@/components/MinistryUI";
import { Button } from "@/components/ui/button";
import { SITE_NAME, WHATSAPP_URL } from "@/config/site";
import { formatDate, readingLabel } from "@/lib/posts";
import { youtubeEmbedUrl } from "@/lib/youtube";

export const Route = createFileRoute("/articles/$slug")({
  loader: async ({ params }) => {
    const { data } = await supabase.from("articles").select("*").eq("slug", params.slug).eq("published", true).maybeSingle();
    if (!data) throw notFound();
    const { data: published } = await supabase.from("articles").select("*").eq("published", true).order("published_at", { ascending: true });
    return { article: data, published: published ?? [] };
  },
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    const title = article ? `${article.title} | ${SITE_NAME}` : SITE_NAME;
    const description = article?.excerpt ?? "";
    const image = article?.cover_image;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article, published } = Route.useLoaderData();
  const index = published.findIndex((item) => item.slug === article.slug);
  const previous = index > 0 ? published[index - 1] : undefined;
  const next = index >= 0 ? published[index + 1] : undefined;
  const related = published.filter((item) => item.category === article.category && item.slug !== article.slug).slice(0, 3);
  const video = youtubeEmbedUrl(article.video_url);
  const author = article.author ?? "";
  const initials = author.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => { setShareUrl(window.location.href); }, []);

  return (
    <div className="page-enter">
      <PageHeader title={article.title} crumb="Articles" />
      <article className="content-band">
        <div className="container">
          {article.cover_image && <img className="article-cover" src={article.cover_image} alt={article.title} />}
          <header className="article-heading">
            <span className="article-tags">{article.category}</span>
            <h1>{article.title}</h1>
            <p className="article-meta">
              {author && <span className="team-avatar" style={{ width: "2rem", height: "2rem", margin: 0, fontSize: "0.8rem" }} aria-hidden="true">{initials}</span>}
              {author && <span>{author}</span>}
              <span>{formatDate(article.published_at)}</span>
              <span>{readingLabel(article)}</span>
            </p>
          </header>
          {video && (
            <div className="article-video">
              <iframe src={video} title={article.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          )}
          <ArticleBody html={article.body_html} />
          <div className="share-actions">
            <Button asChild variant="outline">
              <a href={`https://wa.me/?text=${encodeURIComponent(`${article.title} ${shareUrl || WHATSAPP_URL}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </Button>
            <Button asChild variant="outline">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"><Facebook size={16} /> Facebook</a>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                const url = window.location.href;
                await navigator.clipboard.writeText(url);
                setCopied(true);
              }}
            >
              {copied ? <Check size={16} /> : <Link2 size={16} />}
              {copied ? "Copied" : "Copy link"}
            </Button>
          </div>
          {related.length > 0 && (
            <section>
              <h2>Related articles</h2>
              <div className="post-grid">
                {related.map((item) => <ArticleCard key={item.id} article={item} readingTime={readingLabel(item)} />)}
              </div>
            </section>
          )}
          <nav className="article-cta" aria-label="More articles">
            {previous && <Button asChild variant="outline"><Link to="/articles/$slug" params={{ slug: previous.slug }}>Previous: {previous.title}</Link></Button>}
            {next && <Button asChild variant="outline"><Link to="/articles/$slug" params={{ slug: next.slug }}>Next: {next.title}</Link></Button>}
          </nav>
        </div>
      </article>
    </div>
  );
}
