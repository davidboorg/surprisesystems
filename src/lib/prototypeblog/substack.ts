import { XMLParser } from "fast-xml-parser";
import type { Post } from "./types";

const FEED_URL = "https://hopeinhell.substack.com/feed";
const MAX_ITEMS = 5;

/** Strip HTML tags and decode the entities Substack emits (named + numeric). */
function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, " ")
    // numeric entities: &#229; (å), hex &#xE5;
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;|&lsquo;|&apos;/g, "'")
    .replace(/&ldquo;|&rdquo;|&quot;/g, '"')
    .replace(/&ndash;|&mdash;/g, ",")
    .replace(/&hellip;/g, "…")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    // decode &amp; last so a literal "&amp;#229;" never double-decodes
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/** Truncate to ~140 chars on a word boundary. No em-dashes, no mid-word cuts. */
function toDek(description: string): string {
  const clean = stripHtml(description).replace(/[—–]/g, ",");
  if (clean.length <= 140) return clean;
  const cut = clean.slice(0, 140);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:]+$/, "") + "…";
}

function toIsoDate(pubDate: string): string | null {
  const t = Date.parse(pubDate);
  if (Number.isNaN(t)) return null;
  return new Date(t).toISOString().slice(0, 10);
}

function slugFromLink(link: string): string {
  const m = link.match(/\/p\/([^/?#]+)/);
  return m ? `substack-${m[1]}` : `substack-${link.replace(/\W+/g, "-")}`;
}

/**
 * Fetch the Hope in Hell feed server-side with ISR. Returns the five newest
 * items mapped to the unified Post shape. Never throws: on any failure it
 * logs and returns [] so the page still renders the native posts.
 */
export async function getSubstackPosts(): Promise<Post[]> {
  let xml: string;
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 3600 },
      headers: { "user-agent": "surprisesystems.io prototypeblog" },
    });
    if (!res.ok) throw new Error(`feed responded ${res.status}`);
    xml = await res.text();
  } catch (err) {
    console.error("[prototypeblog] Substack feed fetch failed:", err);
    return [];
  }

  try {
    const parser = new XMLParser({
      ignoreAttributes: true,
      cdataPropName: "__cdata",
      trimValues: true,
    });
    const parsed = parser.parse(xml);
    const rawItems = parsed?.rss?.channel?.item;
    const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

    const text = (v: unknown): string => {
      if (v == null) return "";
      if (typeof v === "string") return v;
      if (typeof v === "object" && "__cdata" in (v as object)) {
        return String((v as { __cdata: unknown }).__cdata ?? "");
      }
      return String(v);
    };

    const posts: Post[] = [];
    for (const item of items) {
      const title = text(item?.title).trim();
      const link = text(item?.link).trim();
      const date = toIsoDate(text(item?.pubDate));
      // Validate before display: title, link and date are all required.
      if (!title || !link || !date) continue;

      posts.push({
        slug: slugFromLink(link),
        title,
        dek: toDek(text(item?.description)),
        date,
        lang: "sv",
        type: "essay",
        featured: false,
        author: "Hope in Hell",
        source: "substack",
        href: link,
        external: true,
      });
    }

    posts.sort((a, b) => (a.date < b.date ? 1 : -1));
    return posts.slice(0, MAX_ITEMS);
  } catch (err) {
    console.error("[prototypeblog] Substack feed parse failed:", err);
    return [];
  }
}
