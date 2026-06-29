# The Prototype Blog — publishing

Every post here is a prototype, or the idea behind one. Not essays, not articles:
small things we build with AI and release early. Posts are MDX files in this
folder. To publish, add one file and push. Vercel builds, the post is live, the
RSS feed updates.

## Publish a post

1. Create `content/prototypeblog/<slug>.mdx`. The file name is the slug, so the
   post lives at `/prototypeblog/<slug>`.
2. Fill the frontmatter (validated with zod at build, a broken post fails the build):

   ```yaml
   ---
   title: "Bygg en egen AI-skill på två minuter"
   dek: "En rad som säger vad prototypen är och varför den är intressant."
   date: 2026-06-28          # ISO, drives sorting
   lang: sv                  # "sv" | "en", sets <article lang> and the language tag
   type: prototype           # "prototype" | "code" | "essay" (prototype is the norm)
   featured: false           # at most one post true; otherwise the newest is featured
   author: "Surprise Systems"
   readingMinutes: 2         # optional, otherwise estimated from word count
   # type-specific:
   prototype: "https://www.surprisesystems.io/<path>"   # required when type: prototype
   download: "/prototypeblog/files/<file>"              # required when type: code
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

- **prototype** — the default. Set `prototype` to the URL the prototype is
  served at, then embed it with `<Prototype>`. If it lives on its own deploy,
  serve it under a path on surprisesystems.io with a `rewrites` rule in the root
  `vercel.json` (see `/postalmedalen`). Same-origin pages like `/skills` need no
  rewrite. CTA verb `Open`.
- **code** — put the file in `public/prototypeblog/files/` and point `download`
  at it. CTA verb `Download`.
- **essay** — available if a post is pure text, but the blog leads with
  prototypes and ideas, not essays. CTA verb `Read`.

## Hosting a prototype on its own deploy

Mirror the `/postalmedalen` pattern:

1. In the prototype's repo, set the framework `base` to the subpath and add a
   `vercel.json` rewrite (`/<subpath>/*` → `/*`) so base-pathed assets resolve.
2. Deploy it (`vercel deploy --prod`).
3. In the root site `vercel.json`, rewrite `/<subpath>` and `/<subpath>/:path*`
   to that deploy's public domain.
4. Embed `src="/<subpath>"` so it serves same-origin on surprisesystems.io.

The site RSS feed at `/prototypeblog/rss.xml` covers all posts.
