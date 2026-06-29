"use client";

import { useState, type ReactNode } from "react";

/** Extract the raw text out of MDX <pre><code> children for the Copy button. */
function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node === "object" && "props" in (node as object)) {
    return textOf((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

/**
 * Brand code block: black surface, light monospace, hairline, straight corners,
 * horizontal scroll, with a discreet Copy → link below. Maps MDX code fences.
 */
export function CodeBlock({ children }: { children?: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const code = textOf(children).replace(/\n$/, "");

  return (
    <div className="my-6">
      <pre className="m-0 overflow-x-auto border-[0.5px] border-black bg-black px-6 py-5 text-[13px] leading-[1.7]">
        <code className="font-mono text-[#F3F3F1]">{code}</code>
      </pre>
      <div className="mt-2 text-[13px]">
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            } catch {
              /* clipboard blocked; no-op */
            }
          }}
          className="group inline-flex items-baseline gap-2 text-grey-4 hover:text-black"
        >
          <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
            →
          </span>
          <span className="uppercase tracking-[0.06em]">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
      </div>
    </div>
  );
}
