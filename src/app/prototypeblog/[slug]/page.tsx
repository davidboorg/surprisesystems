import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { getNativePost, getNativePosts } from "@/lib/prototypeblog/native";
import { typeLabel } from "@/lib/prototypeblog/types";
import {
  ArrowLink,
  Eyebrow,
  Footer,
  HeaderBar,
  Tag,
} from "@/components/prototypeblog/ui";
import { mdxComponents } from "@/components/prototypeblog/mdx";
import { Subscribe } from "@/components/prototypeblog/Subscribe";

export function generateStaticParams() {
  return getNativePosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getNativePost(slug);
  if (!post) return {};
  const url = `https://www.surprisesystems.io/prototypeblog/${slug}`;
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.dek,
    alternates: { canonical: url },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.dek,
      type: "article",
      url,
    },
  };
}

export default async function PrototypeBlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getNativePost(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  const { frontmatter: fm } = post;

  return (
    <main className="mx-auto max-w-[880px]">
      <HeaderBar
        right={
          <ArrowLink href="/prototypeblog">
            <span className="text-[11px] uppercase tracking-[0.06em]">
              <span className="sm:hidden">Back</span>
              <span className="hidden sm:inline">Back to all posts</span>
            </span>
          </ArrowLink>
        }
      />

      <article lang={fm.lang}>
        {/* header */}
        <div className="max-w-[720px] px-6 pt-14 md:px-14">
          <div className="mb-6 flex gap-2">
            <Tag>{typeLabel(fm.type)}</Tag>
            <Tag>{fm.lang.toUpperCase()}</Tag>
          </div>
          <h1 className="m-0 mb-5 text-[36px] font-bold uppercase leading-[1.03] tracking-[-0.025em] text-balance md:text-[46px]">
            {fm.title}
          </h1>
          <p className="m-0 mb-6 max-w-[600px] text-[22px] font-light leading-[1.4] text-grey-5">
            {fm.dek}
          </p>
          <div className="flex gap-5 border-b-[0.5px] border-b-grey-2 border-t-[0.5px] border-t-black py-4">
            <Eyebrow>{fm.author}</Eyebrow>
            <Eyebrow>{post.frontmatter.date.slice(0, 10)}</Eyebrow>
            <Eyebrow>{post.readingMinutes} min</Eyebrow>
          </div>
        </div>

        {/* body */}
        <div className="max-w-[680px] px-6 pt-9 md:px-14">{content}</div>
      </article>

      {/* subscribe */}
      <div className="mt-14 border-t-[0.5px] border-black bg-grey-1">
        <div className="px-6 py-10 md:px-14">
          <Subscribe showRss={false} />
        </div>
      </div>

      <Footer>
        <span className="font-medium">© Surprise Systems</span>. Published early and unfinished, on
        purpose.
      </Footer>
    </main>
  );
}
