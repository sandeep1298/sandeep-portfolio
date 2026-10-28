import type React from "react";

/** Click handler for logo links: smooth-scroll to the top instead of jumping to "#". */
export function scrollToTop(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
