export const pageMeta = (title: string, description: string, type = "website") => ({
  meta: [
    { title: `${title} | The Sanctuary Keepers` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | The Sanctuary Keepers` },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
