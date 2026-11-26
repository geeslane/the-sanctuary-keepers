import { useEffect, useState } from "react";
import { sanitizeArticleHtml } from "@/lib/article-sanitizer";

export function ArticleBody({ html }: { html: string }) {
  const [safe, setSafe] = useState("");

  useEffect(() => {
    setSafe(sanitizeArticleHtml(html));
  }, [html]);

  if (!safe) return null;
  return <div className="prose" dangerouslySetInnerHTML={{ __html: safe }} />;
}
