import DOMPurify from "dompurify";

const ALLOWED_TAGS = ["a", "blockquote", "br", "caption", "code", "em", "figcaption", "figure", "h2", "h3", "h4", "hr", "iframe", "img", "li", "ol", "p", "pre", "strong", "table", "tbody", "td", "th", "thead", "tr", "ul", "div"];
const ALLOWED_ATTR = ["alt", "class", "colspan", "controls", "height", "href", "loading", "rel", "rowspan", "src", "target", "title", "width", "allow", "allowfullscreen", "frameborder", "referrerpolicy"];

export function sanitizeArticleHtml(value: string) {
  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ADD_ATTR: ["loading"],
    FORBID_ATTR: ["style", "onerror", "onclick"],
    ADD_URI_SAFE_ATTR: ["src"],
    CUSTOM_ELEMENT_HANDLING: {
      tagNameCheck: null,
      attributeNameCheck: null,
      allowCustomizedBuiltInElements: false,
    },
    hooks: undefined,
    ALLOW_UNKNOWN_PROTOCOLS: false,
    RETURN_TRUSTED_TYPE: false,
  }).replace(/<iframe\b[^>]*\bsrc=["'](?!https:\/\/(?:www\.)?(?:youtube\.com|youtube-nocookie\.com)\/)[^"']*["'][^>]*>[\s\S]*?<\/iframe>/gi, "");
}
