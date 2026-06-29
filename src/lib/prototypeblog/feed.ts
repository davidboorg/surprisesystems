import { getNativeFeedPosts } from "./native";
import type { Post } from "./types";

export interface Feed {
  featured: Post | null;
  rest: Post[];
  all: Post[];
}

/**
 * The Prototype Blog feed: native MDX posts only, newest first. Every post is a
 * prototype or the idea behind one. Featured is an explicit `featured: true`,
 * otherwise the newest post.
 */
export async function getFeed(): Promise<Feed> {
  const all = getNativeFeedPosts(); // already sorted newest-first
  const featured = all.find((p) => p.featured) ?? all[0] ?? null;
  const rest = featured ? all.filter((p) => p !== featured) : all;
  return { featured, rest, all };
}
