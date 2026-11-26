import { youtubeFrame } from "@/lib/youtube";

export const ARTICLES_CHANGED = "ministry-articles-changed";

export function slugifyTitle(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraphHtml(paragraph: string) {
  const frame = youtubeFrame(paragraph.trim());
  if (frame) return frame;
  return `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`;
}

export function articleBodyToHtml(value: string) {
  const text = value.trim();
  if (!text) return "";
  if (/<[a-z][\s\S]*>/i.test(text)) return cleanArticleHtml(text);
  return text.split(/\n{2,}/).map(paragraphHtml).join("");
}

export function appendArticleImage(body: string, url: string) {
  const html = articleBodyToHtml(body);
  const image = `<p><img src="${escapeHtml(url)}" alt=""></p>`;
  return html ? `${html}${image}` : image;
}

export function cleanArticleHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}
