import { useState, useEffect, useCallback } from "react";

export function useScrollChrome() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showanim, setShowanim] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);

  useEffect(() => {
    let frameId = null;

    const updateScrollState = () => {
      const scrollY =
        window.scrollY || document.documentElement.scrollTop || 0;
      const nextNavbarScrolled = scrollY > 50;
      const nextBackToTopVisible = scrollY > 500;

      setNavbarScrolled((previous) =>
        previous === nextNavbarScrolled ? previous : nextNavbarScrolled,
      );
      setShowBackToTop((previous) =>
        previous === nextBackToTopVisible ? previous : nextBackToTopVisible,
      );

      frameId = null;
    };

    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateScrollState);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    if (!showBackToTop && showanim) {
      setShowanim(false);
    }
  }, [showBackToTop, showanim]);

  const handleBackToTop = useCallback(() => {
    setShowanim(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return {
    navbarScrolled,
    showBackToTop,
    showanim,
    handleBackToTop,
  };
}
