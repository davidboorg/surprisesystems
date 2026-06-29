import type { ReactNode } from "react";
import { Eyebrow, Highlight } from "./ui";
import { CodeBlock } from "./CodeBlock";

/* Components MDX authors can use directly. All inherit the brand typography. */

/** Embedded, clickable prototype: hairline container, toolbar row, sandboxed iframe. */
export function Prototype({
  src,
  title,
  height = 520,
}: {
  src: string;
  title: string;
  height?: number;
}) {
  return (
    <div className="my-8">
      <div className="mb-3">
        <Eyebrow tone="strong">Try it · embedded prototype</Eyebrow>
      </div>
      <div className="border-[0.5px] border-black bg-white">
        <div className="flex items-center gap-2 border-b-[0.5px] border-black px-3.5 py-2.5">
          <span className="inline-block h-2 w-2 bg-black" />
          <span className="inline-block h-2 w-2 border-[0.5px] border-black" />
          <span className="ml-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-grey-4">
            {title}
          </span>
        </div>
        <iframe
          src={src}
          title={title}
          height={height}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          className="block w-full border-0"
          style={{ height }}
        />
      </div>
      <div className="mt-3 text-[14px]">
        <a
          href={src}
          target="_blank"
          rel="noopener"
          className="group inline-flex items-baseline gap-2 text-black"
        >
          <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
            →
          </span>
          <span className="underline decoration-transparent underline-offset-[3px] group-hover:decoration-current">
            Open in full
          </span>
        </a>
      </div>
    </div>
  );
}

/** Download link with the → pattern and a real download attribute. */
export function Download({ href, label }: { href: string; label: string }) {
  return (
    <div className="my-4 text-[15px]">
      <a
        href={href}
        download
        className="group inline-flex items-baseline gap-2 text-[16px] font-medium text-black"
      >
        <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
          →
        </span>
        <span className="underline decoration-transparent underline-offset-[3px] transition-colors group-hover:decoration-yellow group-hover:decoration-2">
          {label}
        </span>
      </a>
    </div>
  );
}

/** Pullquote: large italic, 2px yellow left edge. Italic is reserved for these. */
export function Pull({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-9 border-l-2 border-yellow pl-6">
      <p className="m-0 text-[28px] font-normal italic leading-[1.2] tracking-[-0.01em]">
        {children}
      </p>
    </blockquote>
  );
}

/* Standard HTML in MDX, mapped to the brand typography. */
export const mdxComponents = {
  Prototype,
  Download,
  Pull,
  Highlight,
  h2: (props: { children?: ReactNode }) => (
    <h2
      className="mb-4 mt-12 text-[26px] font-bold uppercase leading-[1.1] tracking-[-0.02em]"
      {...props}
    />
  ),
  h3: (props: { children?: ReactNode }) => (
    <h3
      className="mb-3 mt-9 text-[20px] font-bold uppercase leading-[1.15] tracking-[-0.02em]"
      {...props}
    />
  ),
  p: (props: { children?: ReactNode }) => (
    <p className="my-5 text-[18px] font-light leading-[1.7]" {...props} />
  ),
  ul: (props: { children?: ReactNode }) => (
    <ul className="my-5 space-y-2.5 text-[18px] font-light leading-[1.6]" {...props} />
  ),
  li: (props: { children?: ReactNode }) => (
    <li className="flex gap-3 before:content-['→'] before:text-black">
      <span>{props.children}</span>
    </li>
  ),
  a: ({ href = "#", ...rest }: { href?: string; children?: ReactNode }) => (
    <a
      href={href}
      className="underline decoration-[1px] underline-offset-[3px] hover:decoration-yellow hover:decoration-2"
      {...rest}
    />
  ),
  pre: (props: { children?: ReactNode }) => <CodeBlock {...props} />,
  code: (props: { children?: ReactNode }) => (
    <code
      className="rounded-none bg-grey-1 px-1.5 py-0.5 font-mono text-[0.9em]"
      {...props}
    />
  ),
};
