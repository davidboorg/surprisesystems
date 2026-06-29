import { z } from "zod";

/**
 * Frontmatter schema for native MDX posts in content/prototypeblog/<slug>.mdx.
 * Validated at build with zod; a malformed post throws so it never deploys silently.
 */
export const frontmatterSchema = z.object({
  title: z.string().min(1),
  dek: z.string().min(1),
  // YAML parses unquoted ISO dates into Date objects; coerce back to a yyyy-mm-dd string.
  date: z.preprocess(
    (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
    z.string().regex(/^\d{4}-\d{2}-\d{2}/, "date must be ISO, e.g. 2026-06-18")
  ),
  lang: z.enum(["sv", "en"]),
  type: z.enum(["essay", "prototype", "code"]),
  featured: z.boolean().optional().default(false),
  author: z.string().optional().default("Surprise Systems"),
  readingMinutes: z.number().int().positive().optional(),
  // type-specific
  prototype: z.string().url().optional(), // type: prototype, external URL under same domain
  download: z.string().optional(), // type: code, path under /public
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export type PostType = "essay" | "prototype" | "code";
export type PostLang = "sv" | "en";
export type PostSource = "native" | "substack";

/** Unified post shape the index renders, shared by native MDX and Substack items. */
export interface Post {
  slug: string;
  title: string;
  dek: string;
  date: string; // ISO yyyy-mm-dd, drives sort
  lang: PostLang;
  type: PostType;
  featured: boolean;
  author: string;
  readingMinutes?: number;
  source: PostSource;
  /** Internal route for native posts; external Substack URL for substack posts. */
  href: string;
  external: boolean;
  prototype?: string;
  download?: string;
}

/** CTA verb per post type. Framework copy is English. */
export function ctaVerb(type: PostType): string {
  switch (type) {
    case "prototype":
      return "Open";
    case "code":
      return "Download";
    case "essay":
    default:
      return "Read";
  }
}

/** Tag label per type, capitalised for the chip. */
export function typeLabel(type: PostType): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}
