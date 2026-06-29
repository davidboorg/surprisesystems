import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { frontmatterSchema, type Frontmatter, type Post } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "prototypeblog");

export interface NativePost {
  slug: string;
  frontmatter: Frontmatter;
  content: string; // raw MDX body
  readingMinutes: number;
}

function readDir(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"));
}

function estimateReadingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function parseFile(file: string): NativePost {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const result = frontmatterSchema.safeParse(data);
  if (!result.success) {
    // Fail loud: a broken post must never deploy silently.
    throw new Error(
      `Invalid frontmatter in content/prototypeblog/${file}:\n` +
        result.error.issues
          .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
          .join("\n")
    );
  }

  const fm = result.data;
  if (fm.type === "prototype" && !fm.prototype) {
    throw new Error(`content/prototypeblog/${file}: type "prototype" requires a "prototype" URL.`);
  }
  if (fm.type === "code" && !fm.download) {
    throw new Error(`content/prototypeblog/${file}: type "code" requires a "download" path.`);
  }

  return {
    slug,
    frontmatter: fm,
    content,
    readingMinutes: fm.readingMinutes ?? estimateReadingMinutes(content),
  };
}

/** All native posts as parsed records, newest first. */
export function getNativePosts(): NativePost[] {
  return readDir()
    .map(parseFile)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

/** A single native post by slug, or null. */
export function getNativePost(slug: string): NativePost | null {
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(CONTENT_DIR, file))) return null;
  return parseFile(file);
}

/** Native posts mapped to the unified Post shape for the index. */
export function getNativeFeedPosts(): Post[] {
  return getNativePosts().map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    dek: p.frontmatter.dek,
    date: p.frontmatter.date.slice(0, 10),
    lang: p.frontmatter.lang,
    type: p.frontmatter.type,
    featured: p.frontmatter.featured,
    author: p.frontmatter.author,
    readingMinutes: p.readingMinutes,
    source: "native" as const,
    href: `/prototypeblog/${p.slug}`,
    external: false,
    prototype: p.frontmatter.prototype,
    download: p.frontmatter.download,
  }));
}
