import { getFeed } from "@/lib/prototypeblog/feed";
import { ctaVerb, typeLabel, type Post } from "@/lib/prototypeblog/types";
import {
  ArrowLink,
  Eyebrow,
  Footer,
  HeaderBar,
  Highlight,
  MetaRow,
  Tag,
} from "@/components/prototypeblog/ui";
import { Subscribe } from "@/components/prototypeblog/Subscribe";

// Editorial flourish; bump by hand when an issue ships.
const EDITION = "No. 12 / 2026";

export const revalidate = 3600;

function PostTags({ post }: { post: Post }) {
  return (
    <div className="flex gap-1.5">
      <Tag variant={post.featured ? "solid" : "outline"}>{typeLabel(post.type)}</Tag>
      <Tag>{post.lang.toUpperCase()}</Tag>
    </div>
  );
}

function Featured({ post }: { post: Post }) {
  const verb = ctaVerb(post.type);
  const ctaLabel = post.source === "substack" ? `${verb} on Substack` : verb;
  const sourceLabel = post.source === "substack" ? "Hope in Hell · Substack" : "Surprise Systems";

  return (
    <MetaRow
      className="px-6 pb-12 pt-14 md:px-14"
      meta={
        <div className="flex flex-col gap-3.5">
          <Eyebrow>Latest · {post.date}</Eyebrow>
          <PostTags post={post} />
        </div>
      }
    >
      <div className="reveal max-w-[820px]">
        {post.external ? (
          <a
            href={post.href}
            target="_blank"
            rel="noopener"
            className="mb-4 inline-block text-[32px] font-bold uppercase leading-[1.04] tracking-[-0.02em] hover:underline hover:decoration-[1px] hover:underline-offset-4 md:text-[38px]"
          >
            {post.title}
          </a>
        ) : (
          <a
            href={post.href}
            className="mb-4 inline-block text-[32px] font-bold uppercase leading-[1.04] tracking-[-0.02em] hover:underline hover:decoration-[1px] hover:underline-offset-4 md:text-[38px]"
          >
            {post.title}
          </a>
        )}

        {/* statement box */}
        <div className="max-w-[680px] border-[0.5px] border-black bg-white">
          <div className="flex items-center gap-2 border-b-[0.5px] border-black px-3.5 py-2.5">
            <span className="inline-block h-2 w-2 bg-black" />
            <span className="inline-block h-2 w-2 border-[0.5px] border-black" />
            <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.08em] text-grey-4">
              {sourceLabel}
            </span>
          </div>
          <div className="px-7 py-8">
            <p className="m-0 text-[23px] font-normal leading-[1.25]">{post.dek}</p>
          </div>
        </div>

        <div className="mt-5 text-[16px]">
          <ArrowLink href={post.href} external={post.external} strong>
            {ctaLabel}
          </ArrowLink>
        </div>
      </div>
    </MetaRow>
  );
}

function Row({ post, last }: { post: Post; last: boolean }) {
  const verb = ctaVerb(post.type);
  return (
    <div
      className={`grid grid-cols-1 items-start gap-4 border-t-[0.5px] border-grey-2 py-7 md:grid-cols-[150px_1fr_130px] md:gap-8 ${
        last ? "border-b-[0.5px] border-b-black" : ""
      }`}
    >
      <div className="flex flex-col gap-3">
        <Eyebrow>{post.date}</Eyebrow>
        <PostTags post={post} />
      </div>
      <div className="max-w-[560px]">
        {post.external ? (
          <a
            href={post.href}
            target="_blank"
            rel="noopener"
            className="mb-2 inline-block text-[22px] font-bold uppercase leading-[1.1] tracking-[-0.01em] hover:underline hover:decoration-[1px] hover:underline-offset-4 md:text-[24px]"
          >
            {post.title}
          </a>
        ) : (
          <a
            href={post.href}
            className="mb-2 inline-block text-[22px] font-bold uppercase leading-[1.1] tracking-[-0.01em] hover:underline hover:decoration-[1px] hover:underline-offset-4 md:text-[24px]"
          >
            {post.title}
          </a>
        )}
        <p className="m-0 text-[17px] font-light leading-[1.5] text-grey-5">{post.dek}</p>
      </div>
      <div className="text-[13px] font-medium uppercase tracking-[0.04em] md:pt-0.5">
        <ArrowLink href={post.href} external={post.external}>
          {verb}
        </ArrowLink>
      </div>
    </div>
  );
}

export default async function PrototypeBlogIndex() {
  const { featured, rest } = await getFeed();

  return (
    <main className="mx-auto max-w-[1160px]">
      <HeaderBar
        right={
          <>
            <span className="text-grey-4">SURPRISE.SYSTEMS™</span>
            <ArrowLink href="https://www.surprisesystems.io" external>
              <span className="text-[11px] uppercase tracking-[0.06em]">surprisesystems.io</span>
            </ArrowLink>
          </>
        }
      />

      {/* masthead */}
      <MetaRow
        className="px-6 pb-12 pt-16 md:px-14"
        meta={<Eyebrow>{EDITION}</Eyebrow>}
      >
        <div className="reveal max-w-[760px]">
          <Eyebrow>The Prototype Blog</Eyebrow>
          <h1 className="mb-6 mt-3.5 text-[40px] font-bold uppercase leading-[1.02] tracking-[-0.025em] text-balance md:text-[52px]">
            Early ideas, published before they are <Highlight>safe.</Highlight>
          </h1>
          <p className="m-0 mb-3.5 max-w-[600px] text-[20px] font-light leading-[1.55]">
            We build small things with AI to think in public. Essays, prototypes you can click, and
            code you are free to take.
          </p>
          <p className="m-0 max-w-[600px] text-[20px] font-light leading-[1.55]">
            Some posts are in Swedish, some in English. None of it is finished. That is the&nbsp;point.
          </p>
        </div>
      </MetaRow>

      {/* subscribe */}
      <div className="border-y-[0.5px] border-black bg-grey-1">
        <MetaRow
          className="px-6 py-10 md:px-14"
          meta={<Eyebrow>Subscribe</Eyebrow>}
        >
          <div className="max-w-[600px]">
            <Subscribe />
          </div>
        </MetaRow>
      </div>

      {/* featured */}
      {featured && <Featured post={featured} />}

      {/* list */}
      {rest.length > 0 && (
        <div className="px-6 pb-2 md:px-14">
          <div className="border-t-[0.5px] border-black py-3.5">
            <Eyebrow>More from the blog</Eyebrow>
          </div>
          {rest.map((post, i) => (
            <Row key={post.slug} post={post} last={i === rest.length - 1} />
          ))}
        </div>
      )}

      <Footer>
        <span className="font-medium">© Surprise Systems</span>. The Prototype Blog publishes early,
        unfinished work for thinking in the open. Take what is useful. All intellectual property
        remains with Surprise&nbsp;Systems.
      </Footer>
    </main>
  );
}
