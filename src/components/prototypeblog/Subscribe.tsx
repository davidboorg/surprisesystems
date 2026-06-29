"use client";

import { useState } from "react";
import { ArrowLink, Highlight } from "./ui";

/**
 * Buttondown email subscribe. Posts directly to the embed endpoint, no server
 * route, no API key. Works without JS as a plain POST into a popup; with JS it
 * opens the popup and shows an inline confirmation without leaving the page.
 */
export function Subscribe({ showRss = true }: { showRss?: boolean }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div>
      <p className="m-0 mb-1 text-[18px] font-normal leading-[1.4]">
        Subscribe · The Prototype Blog
      </p>
      <p className="m-0 mb-5 max-w-[520px] text-[15px] font-light leading-[1.5] text-grey-5">
        New prototypes and essays when they ship. No schedule. No&nbsp;noise.
      </p>

      {subscribed ? (
        <p className="m-0 text-[16px]">
          → You are on the list. <Highlight>We will send the next one.</Highlight>
        </p>
      ) : (
        <>
          <form
            action="https://buttondown.com/api/emails/embed-subscribe/borg"
            method="post"
            target="popupwindow"
            onSubmit={(e) => {
              if (!email.trim()) {
                e.preventDefault();
                return;
              }
              window.open("https://buttondown.com/borg", "popupwindow");
              setSubscribed(true);
            }}
            className="flex max-w-[460px] gap-0"
          >
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organization.com"
              className="min-w-0 flex-1 border-[0.5px] border-r-0 border-black bg-white px-3.5 py-3 text-[14px] text-black outline-none"
            />
            <button
              type="submit"
              className="shrink-0 border-[0.5px] border-black bg-yellow px-5 py-3 text-[13px] font-medium uppercase tracking-[0.06em] text-black transition-transform active:translate-y-px"
            >
              Subscribe
            </button>
          </form>
          <p className="m-0 mt-2 text-[9px] uppercase tracking-[0.06em] text-grey-3">
            Powered by Buttondown
          </p>
        </>
      )}

      {showRss && !subscribed && (
        <div className="mt-4 text-[14px]">
          <ArrowLink href="/prototypeblog/rss.xml">Or follow the RSS feed</ArrowLink>
        </div>
      )}
    </div>
  );
}
