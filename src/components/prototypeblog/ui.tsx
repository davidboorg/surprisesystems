import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Brand primitives for The Prototype Blog. Hairlines, straight corners,
 * one rationed yellow accent, → on every link. Presentational only.
 * ------------------------------------------------------------------ */

export function Logo({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/symbol-black.png"
      alt="Surprise Systems"
      className={`h-[26px] w-auto object-contain ${className}`}
    />
  );
}

export function Eyebrow({
  children,
  tone = "muted",
  className = "",
}: {
  children: ReactNode;
  tone?: "muted" | "strong";
  className?: string;
}) {
  return (
    <span
      className={`block text-[11px] font-medium uppercase tracking-[0.06em] ${
        tone === "strong" ? "text-black" : "text-grey-4"
      } ${className}`}
    >
      {children}
    </span>
  );
}

export function Tag({
  children,
  variant = "outline",
}: {
  children: ReactNode;
  variant?: "outline" | "solid";
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-[3px] text-[10px] font-medium uppercase tracking-[0.08em] leading-none border-[0.5px] border-black ${
        variant === "solid" ? "bg-yellow text-black" : "bg-white text-black"
      }`}
    >
      {children}
    </span>
  );
}

/** The signature → link. Arrow slides 4px right on hover; underlines the label. */
export function ArrowLink({
  href,
  children,
  external = false,
  strong = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  strong?: boolean;
  className?: string;
}) {
  const inner = (
    <span className="group inline-flex items-baseline gap-2">
      <span className="pb-arrow inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
        →
      </span>
      <span className="underline decoration-[1px] underline-offset-[3px] decoration-transparent transition-colors group-hover:decoration-current">
        {children}
      </span>
    </span>
  );
  const classes = `inline-flex text-black ${
    strong ? "text-[16px] font-medium" : ""
  } ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

/** Yellow filled action with a hairline. Straight corners, no shadow. */
export function Button({
  children,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center border-[0.5px] border-black bg-yellow px-5 py-3 text-[13px] font-medium uppercase tracking-[0.06em] text-black transition-transform active:translate-y-px ${className}`}
    >
      {children}
    </button>
  );
}

/** The yellow markörsvep, sitting on the lower band of the line. Max one per post. */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span
      className="text-black"
      style={{
        backgroundImage:
          "linear-gradient(to bottom,transparent 0,transparent 56%,var(--color-accent) 56%,var(--color-accent) 92%,transparent 92%)",
        padding: "0 0.06em",
        WebkitBoxDecorationBreak: "clone",
        boxDecorationBreak: "clone",
      }}
    >
      {children}
    </span>
  );
}

/** The editorial 150px / 1fr meta-column layout used throughout. */
export function MetaRow({
  meta,
  children,
  className = "",
}: {
  meta: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 md:grid-cols-[150px_1fr] md:gap-8 ${className}`}
    >
      <div>{meta}</div>
      <div>{children}</div>
    </div>
  );
}

/** Header bar shared by index and article. */
export function HeaderBar({ right }: { right: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b-[0.5px] border-black px-6 py-5 md:px-14">
      <div className="flex items-center gap-3.5">
        <Link href="/prototypeblog" className="flex items-center">
          <Logo />
        </Link>
        <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-black">
          The Prototype Blog
        </span>
      </div>
      <div className="flex items-baseline gap-7 text-[11px] font-bold uppercase tracking-[0.06em]">
        {right}
      </div>
    </div>
  );
}

export function Footer({ children }: { children: ReactNode }) {
  return (
    <div className="px-6 pb-12 pt-10 md:px-14">
      <p className="m-0 max-w-[560px] text-[10px] uppercase leading-[1.7] tracking-[0.1em] text-grey-4">
        {children}
      </p>
    </div>
  );
}
