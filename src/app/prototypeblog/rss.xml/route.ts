import { getNativeFeedPosts } from "@/lib/prototypeblog/native";

const SITE = "https://www.surprisesystems.io";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Our own feed, generated from the native MDX posts that live on
 * surprisesystems.io. Substack posts are excluded; they have their own feed.
 */
export function GET() {
  const posts = getNativeFeedPosts();

  const items = posts
    .map((p) => {
      const url = `${SITE}${p.href}`;
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(p.dek)}</description>
      <pubDate>${new Date(p.date + "T08:00:00Z").toUTCString()}</pubDate>
      <language>${p.lang}</language>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Surprise Systems · The Prototype Blog</title>
    <link>${SITE}/prototypeblog</link>
    <description>Early ideas, published before they are safe. Essays, prototypes you can click, and code you are free to take.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
