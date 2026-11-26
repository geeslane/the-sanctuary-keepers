export function youtubeEmbedUrl(url: string | null | undefined) {
  if (!url) return null;
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, "");
    let id = "";
    if (host === "youtu.be") id = parsed.pathname.slice(1);
    else if (host === "youtube.com" || host === "youtube-nocookie.com" || host === "m.youtube.com") {
      if (parsed.pathname.startsWith("/embed/")) id = parsed.pathname.split("/")[2] ?? "";
      else if (parsed.pathname.startsWith("/shorts/")) id = parsed.pathname.split("/")[2] ?? "";
      else id = parsed.searchParams.get("v") ?? "";
    }
    id = id.split("?")[0]?.split("/")[0] ?? "";
    if (!/^[\w-]{11}$/.test(id)) return null;
    return `https://www.youtube-nocookie.com/embed/${id}`;
  } catch {
    return null;
  }
}

export function youtubeFrame(url: string) {
  const embed = youtubeEmbedUrl(url);
  if (!embed) return "";
  return `<iframe src="${embed}" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}
