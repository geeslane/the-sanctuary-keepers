import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMinistryData } from "@/components/ArticleDataProvider";
import { ArticleCard, EmptyState, PageHeader, PostSkeletons } from "@/components/MinistryUI";
import { pageMeta } from "@/lib/seo";
import { readingLabel } from "@/lib/posts";

export const Route = createFileRoute("/articles/")({
  head: () => pageMeta("Articles", "Articles from The Sanctuary Keepers."),
  component: ArticlesPage,
});

const PAGE_SIZE = 6;

function ArticlesPage() {
  const { articles, loading } = useMinistryData();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const categories = useMemo(() => ["All", ...Array.from(new Set(articles.map((article) => article.category)))], [articles]);
  const filtered = articles.filter((article) => {
    const matchesCategory = category === "All" || article.category === category;
    const haystack = `${article.title} ${article.excerpt} ${article.author ?? ""}`.toLowerCase();
    return matchesCategory && haystack.includes(query.trim().toLowerCase());
  });
  const shown = filtered.slice(0, visible);

  return (
    <div className="page-enter">
      <PageHeader title="Articles" />
      <section className="content-band">
        <div className="container">
          <div className="filter-bar">
            <div className="category-filters" role="toolbar" aria-label="Filter by category">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="filter-pill"
                  aria-pressed={category === item}
                  onClick={() => { setCategory(item); setVisible(PAGE_SIZE); }}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="sr-only" htmlFor="article-search">Search articles</label>
            <input
              id="article-search"
              className="article-search"
              type="search"
              value={query}
              placeholder="Search articles"
              onChange={(event) => { setQuery(event.target.value); setVisible(PAGE_SIZE); }}
            />
          </div>
          {loading ? <PostSkeletons /> : shown.length === 0 ? (
            <EmptyState>{articles.length === 0 ? "Articles will be published soon." : "No articles match your search."}</EmptyState>
          ) : (
            <div className="post-grid">
              {shown.map((article) => <ArticleCard key={article.id} article={article} readingTime={readingLabel(article)} />)}
            </div>
          )}
          {shown.length < filtered.length && (
            <div className="objectives-action">
              <button type="button" className="filter-pill" onClick={() => setVisible((count) => count + PAGE_SIZE)}>Load more</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
