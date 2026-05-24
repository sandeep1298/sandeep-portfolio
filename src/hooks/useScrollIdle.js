import { useEffect, useState } from "react";

/** True while the user is scrolling; false shortly after scroll stops. */
export function useScrollIdle(idleMs = 160) {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      setIsScrolling((previous) => (previous ? previous : true));
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setIsScrolling(false);
      }, idleMs);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      window.clearTimeout(timeoutId);
    };
  }, [idleMs]);

  return isScrolling;
}
