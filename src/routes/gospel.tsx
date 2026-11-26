import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMinistryData } from "@/components/ArticleDataProvider";
import { ArticleCard, EmptyState, PageHeader, PostSkeletons, ScriptureBlock } from "@/components/MinistryUI";
import { gospelIntroduction } from "@/lib/ministry-content";
import { pageMeta } from "@/lib/seo";
import { byCategory, formatDate, youtubeEmbedUrl } from "@/lib/posts";

export const Route = createFileRoute("/gospel")({
  beforeLoad: () => {
    throw notFound();
  },
  head: () => pageMeta("Hymns and Gospel Songs", gospelIntroduction),
  component: GospelPage,
});

function GospelPage() {
  const { articles, loading } = useMinistryData();
  const songs = byCategory(articles, "Gospel Songs");
  const hymns = byCategory(articles, "Hymns and Their Stories");

  return (
    <div className="page-enter">
      <PageHeader title="Hymns and Gospel Songs" />
      <section className="content-band">
        <div className="container">
          <ScriptureBlock>{gospelIntroduction}</ScriptureBlock>
          <section className="content-section">
            <h2>Listen & Be Blessed</h2>
            {loading ? <PostSkeletons /> : songs.length === 0 ? <EmptyState>Songs will be added soon.</EmptyState> : (
              <div className="post-grid">
                {songs.map((song) => {
                  const embed = youtubeEmbedUrl(song.video_url);
                  return (
                    <article className="post-card" key={song.id}>
                      {embed ? (
                        <div className="video-frame">
                          <iframe src={embed} title={song.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </div>
                      ) : song.cover_image ? (
                        <img className="post-image" src={song.cover_image} alt={song.title} loading="lazy" style={{ height: "13rem" }} />
                      ) : null}
                      <div className="post-copy">
                        <p className="post-date">{formatDate(song.published_at)}</p>
                        <h3>{song.title}</h3>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
          <section className="content-section">
            <h2>Hymns and their Stories</h2>
            {loading ? <PostSkeletons /> : hymns.length === 0 ? <EmptyState>Stories will be added soon.</EmptyState> : (
              <div className="post-grid">
                {hymns.map((article) => (
                  <ArticleCard key={article.id} article={article} authorLabel={article.author || "Admin"} action="Read More" />
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
