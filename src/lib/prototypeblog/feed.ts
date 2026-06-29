import { getNativeFeedPosts } from "./native";
import { getSubstackPosts } from "./substack";
import type { Post } from "./types";

export interface Feed {
  featured: Post | null;
  rest: Post[];
  all: Post[];
  /** True while Substack still carries the feed; drives the masthead note. */
  showSubstackNote: boolean;
}

/**
 * Merge native MDX posts and the Substack feed into one list, newest first.
 * Featured is an explicit native `featured: true`, otherwise the newest post.
 */
export async function getFeed(): Promise<Feed> {
  const [native, substack] = await Promise.all([
    Promise.resolve(getNativeFeedPosts()),
    getSubstackPosts(),
  ]);

  const all = [...native, ...substack].sort((a, b) => (a.date < b.date ? 1 : -1));

  const featured =
    all.find((p) => p.source === "native" && p.featured) ?? all[0] ?? null;
  const rest = featured ? all.filter((p) => p !== featured) : all;

  // Show the note while in-house posts do not yet dominate the list.
  const nativeCount = native.length;
  const showSubstackNote = substack.length > 0 && nativeCount < substack.length;

  return { featured, rest, all, showSubstackNote };
}
