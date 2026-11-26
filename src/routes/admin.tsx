import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/MinistryUI";
import { getAdminSession, signInAdmin, signOutAdmin } from "@/lib/admin-auth.functions";
import { appendArticleImage, ARTICLES_CHANGED, slugifyTitle } from "@/lib/article-admin";
import { deleteArticle, listAdminArticles, saveArticle, type AdminArticle } from "@/lib/articles.functions";
import { cloudinaryReady, uploadToCloudinary } from "@/lib/cloudinary";
import { formatDate } from "@/lib/posts";
import { youtubeEmbedUrl } from "@/lib/youtube";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [...pageMeta("Admin", "Sign in to write and publish articles.").meta, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

const emptyForm = {
  id: "",
  title: "",
  slug: "",
  category: "Teaching",
  excerpt: "",
  coverImage: "",
  videoUrl: "",
  author: "",
  body: "",
  published: true,
};

function messageFrom(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "object" && error && "message" in error) return String((error as { message: unknown }).message);
  return "Something went wrong. Please try again.";
}

function AdminPage() {
  const [ready, setReady] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sessionUser, setSessionUser] = useState<string | null>(null);
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [slugEdited, setSlugEdited] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState<"cover" | "body" | "">("");

  useEffect(() => {
    let active = true;
    getAdminSession()
      .then((session) => {
        if (!active) return;
        setSessionUser(session.username);
        setReady(true);
      })
      .catch((reason) => {
        if (!active) return;
        setError(messageFrom(reason));
        setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!sessionUser) return;
    let active = true;
    setError("");
    listAdminArticles()
      .then((rows) => {
        if (active) setArticles(rows);
      })
      .catch((reason) => {
        if (!active) return;
        const message = messageFrom(reason);
        if (message.includes("Sign in as an administrator")) {
          setSessionUser(null);
        }
        setError(message);
      });
    return () => {
      active = false;
    };
  }, [sessionUser]);

  function updateTitle(title: string) {
    setForm((current) => ({ ...current, title, slug: slugEdited ? current.slug : slugifyTitle(title) }));
  }

  function editArticle(article: AdminArticle) {
    setSlugEdited(true);
    setStatus("");
    setError("");
    setForm({
      id: article.id,
      title: article.title,
      slug: article.slug,
      category: article.category,
      excerpt: article.excerpt,
      coverImage: article.cover_image,
      videoUrl: article.video_url ?? "",
      author: article.author ?? "",
      body: article.body_html,
      published: article.published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSignIn(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setStatus("");
    try {
      const session = await signInAdmin({ data: { username, password } });
      setSessionUser(session.username);
      setPassword("");
    } catch (reason) {
      setError(messageFrom(reason));
    } finally {
      setBusy(false);
    }
  }

  async function onUpload(kind: "cover" | "body", file: File | undefined) {
    if (!file) return;
    setUploading(kind);
    setError("");
    try {
      const url = await uploadToCloudinary(file);
      setForm((current) => kind === "cover" ? { ...current, coverImage: url } : { ...current, body: appendArticleImage(current.body, url) });
    } catch (reason) {
      setError(messageFrom(reason));
    } finally {
      setUploading("");
    }
  }

  async function onSave(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setStatus("");
    try {
      await saveArticle({ data: form });
      const rows = await listAdminArticles();
      setArticles(rows);
      setForm(emptyForm);
      setSlugEdited(false);
      setStatus("Saved. Published articles show on the website.");
      window.dispatchEvent(new Event(ARTICLES_CHANGED));
    } catch (reason) {
      setError(messageFrom(reason));
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(article: AdminArticle) {
    if (!window.confirm(`Delete “${article.title}”?`)) return;
    setBusy(true);
    setError("");
    try {
      await deleteArticle({ data: { id: article.id } });
      setArticles((current) => current.filter((item) => item.id !== article.id));
      if (form.id === article.id) setForm(emptyForm);
      window.dispatchEvent(new Event(ARTICLES_CHANGED));
    } catch (reason) {
      setError(messageFrom(reason));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page-enter">
      <PageHeader title="Admin" />
      <section className="content-band">
        <div className="container admin-shell">
          {!ready ? <p className="content-note">Loading…</p> : !sessionUser ? (
            <form className="report-card admin-form" onSubmit={onSignIn}>
              <h2>Sign in</h2>
              <p className="content-note">Administrators sign in here to write and publish articles.</p>
              <label>Username<Input type="text" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required /></label>
              <label>Password<Input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
              {error && <p className="admin-error">{error}</p>}
              <Button type="submit" disabled={busy}>{busy ? "Please wait…" : "Sign in"}</Button>
            </form>
          ) : (
            <>
              <div className="admin-bar">
                <p>Signed in as {sessionUser}</p>
                <Button type="button" variant="outline" onClick={() => { signOutAdmin().finally(() => { setSessionUser(null); setArticles([]); setForm(emptyForm); setSlugEdited(false); }); }}>Sign out</Button>
              </div>
              {error && !articles.length ? <p className="admin-error">{error}</p> : (
                <>
                  <form className="report-card admin-form" onSubmit={onSave}>
                    <h2>{form.id ? "Edit article" : "New article"}</h2>
                    <label>Title<Input value={form.title} onChange={(event) => updateTitle(event.target.value)} required /></label>
                    <label>Address<Input value={form.slug} onChange={(event) => { setSlugEdited(true); setForm({ ...form, slug: slugifyTitle(event.target.value) }); }} required /><span>The page will be /articles/{form.slug || "your-address"}</span></label>
                    <label>Category<Input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} required /></label>
                    <label>Summary<Textarea value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} /></label>
                    <div>
                      <label>Cover image<input type="file" accept="image/*" disabled={uploading !== ""} onChange={(event) => { onUpload("cover", event.target.files?.[0]); event.target.value = ""; }} /></label>
                      <p className="content-note">{cloudinaryReady() ? "The picture is uploaded to Cloudinary." : "Add the Cloudinary cloud name and upload preset before uploading."}{uploading === "cover" ? " Uploading…" : ""}</p>
                      {form.coverImage && <div className="admin-preview"><img src={form.coverImage} alt="" /></div>}
                    </div>
                    <label>YouTube video<Input value={form.videoUrl} onChange={(event) => setForm({ ...form, videoUrl: event.target.value })} placeholder="https://www.youtube.com/watch?v=" /><span>Paste a YouTube link. A link on its own line in the article is embedded there too.</span></label>
                    {youtubeEmbedUrl(form.videoUrl) && <div className="admin-preview"><iframe src={youtubeEmbedUrl(form.videoUrl) ?? undefined} title="YouTube preview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>}
                    <label>Author<Input value={form.author} onChange={(event) => setForm({ ...form, author: event.target.value })} /></label>
                    <label>Article<Textarea className="admin-body" value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} placeholder="Write the article. Leave a blank line between paragraphs." /></label>
                    <label>Add an image<input type="file" accept="image/*" disabled={uploading !== ""} onChange={(event) => { onUpload("body", event.target.files?.[0]); event.target.value = ""; }} />{uploading === "body" ? <span>Uploading…</span> : <span>The picture is placed at the end of the article.</span>}</label>
                    <label className="admin-check"><input type="checkbox" checked={form.published} onChange={(event) => setForm({ ...form, published: event.target.checked })} /> Publish on the website</label>
                    {error && <p className="admin-error">{error}</p>}
                    {status && <p className="content-note">{status}</p>}
                    <div className="admin-actions">
                      <Button type="submit" disabled={busy}>{busy ? "Saving…" : form.id ? "Save changes" : "Save article"}</Button>
                      {form.id && <Button type="button" variant="outline" onClick={() => { setForm(emptyForm); setSlugEdited(false); }}>Cancel edit</Button>}
                    </div>
                  </form>
                  <div className="admin-list">
                    <h2>Articles</h2>
                    {articles.length === 0 ? <p className="content-note">No articles yet.</p> : articles.map((article) => (
                      <article className="admin-row" key={article.id}>
                        <div>
                          <h3>{article.title}</h3>
                          <p>{article.published ? "Published" : "Draft"}{article.published_at ? ` · ${formatDate(article.published_at)}` : ""} · {article.category}</p>
                        </div>
                        <div className="admin-actions">
                          <Button type="button" variant="outline" onClick={() => editArticle(article)}>Edit</Button>
                          <Button type="button" variant="outline" onClick={() => onDelete(article)}>Delete</Button>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
