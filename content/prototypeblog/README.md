# The Prototype Blog — publishing

Posts that live on surprisesystems.io are MDX files in this folder. The index at
`/prototypeblog` merges these with the latest Substack posts (Hope in Hell) and
sorts newest first. To publish, add one file and push. Vercel builds, the post
is live, the RSS feed updates.

## Publish a post

1. Create `content/prototypeblog/<slug>.mdx`. The file name is the slug, so the
   post lives at `/prototypeblog/<slug>`.
2. Fill the frontmatter (validated with zod at build, a broken post fails the build):

   ```yaml
   ---
   title: "Varför vi bygger före vi vet"
   dek: "Strategidokument beskriver framtiden. Prototyper möter den."
   date: 2026-06-18          # ISO, drives sorting
   lang: sv                  # "sv" | "en", sets <article lang> and the language tag
   type: essay               # "essay" | "prototype" | "code"
   featured: false           # at most one post true; otherwise the newest is featured
   author: "Surprise Systems"
   readingMinutes: 4         # optional, otherwise estimated from word count
   # type-specific:
   prototype: "https://www.surprisesystems.io/prototypeblog/<name>"   # required when type: prototype
   download: "/prototypeblog/files/<file>"                            # required when type: code
   ---
   ```

3. Write the body in MDX. Available components (no styling needed):
   - `<Prototype src="..." title="..." height={520} />` — embedded, sandboxed iframe.
   - `<Download href="/prototypeblog/files/x.js" label="Ladda ner x.js" />`
   - `<Pull>...</Pull>` — pullquote (the only place italics are allowed).
   - `<Highlight>...</Highlight>` — the yellow markörsvep. Max ONE per post.
   - Code fences ` ```js ` render as a brand code block with a Copy link.

4. Commit and push.

## Post types

- **essay** — prose. Links internally, CTA verb `Read`.
- **prototype** — set `prototype` to the URL the prototype is hosted at, under
  `/prototypeblog/<name>`. Hosting lives outside this repo (separate deploy, own
  route, or a `rewrites` rule in `next.config`). The post body embeds it with
  `<Prototype>`. CTA verb `Open`.
- **code** — put the file in `public/prototypeblog/files/` and point `download`
  at it. CTA verb `Download`.

## Code and downloads

- Downloadable files: `public/prototypeblog/files/`.
- Self-hosted prototype pages can live in `public/prototypeblog/` (see
  `notebook.html`) or on their own deploy. If hosted on another origin but served
  under `/prototypeblog/...`, add a `rewrites` rule in `next.config` so the path
  stays stable and on-brand.

## Substack

The five newest Hope in Hell posts are pulled server-side at build (ISR, hourly)
from `https://hopeinhell.substack.com/feed`, link out in a new tab, and never
break the page if the feed is down. Remove the masthead note once in-house posts
dominate (it hides automatically when native posts outnumber the Substack ones).
The site RSS feed at `/prototypeblog/rss.xml` covers native posts only.
