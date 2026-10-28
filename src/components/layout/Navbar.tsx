import { memo, useCallback, useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { logo } from "../../assets";
import { useScrolledPast } from "../../hooks/useScroll";
import { useActiveSection } from "../../hooks/useActiveSection";
import { scrollToTop } from "../../utils/scroll";
import ThemeButton from "../ui/ThemeButton";
import NavLinks from "./NavLinks";

const LINK_CLASSES =
  "font-medium text-black/80 transition-colors hover:text-common_voilet_color dark:text-white/80 dark:hover:text-white";

/** Transparent at the top; a floating pill once the page scrolls. */
function Navbar() {
  const scrolled = useScrolledPast(50);
  const activeId = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close the mobile menu on Escape or a tap outside it
  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [menuOpen]);

  return (
    <nav aria-label="Primary navigation" className="fixed inset-x-0 top-0 z-20 px-3 sm:px-6">
      <div
        className={`relative mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-[transform,background-color,border-color,box-shadow] duration-300 sm:px-6 motion-reduce:transition-none ${
          scrolled
            ? "translate-y-3 border-black/10 bg-white/95 shadow-lg shadow-black/5 dark:border-white/10 dark:bg-[#0d0b1a]/95 dark:shadow-black/40"
            : "translate-y-2 border-transparent bg-transparent sm:translate-y-3"
        }`}
      >
        <a href="#" className="flex items-center gap-2" onClick={scrollToTop}>
          <img src={logo} alt="Sandeep M logo" className="h-9 w-9 object-contain sm:h-10 sm:w-10" />
          <span className="hidden font-display text-[17px] font-bold text-black sm:inline dark:text-white">
            Sandeep
          </span>
        </a>

        <div className="hidden items-center gap-4 sm:flex">
          <NavLinks
            className="flex flex-row items-center gap-1"
            linkClassName={`${LINK_CLASSES} rounded-full px-4 py-2 text-[15px] lg:text-base`}
            activeClassName="!text-common_voilet_color dark:!text-white"
            activeId={activeId}
            indicatorId="nav-active-pill"
          />
          <ThemeButton />
        </div>

        <div ref={menuRef} className="flex items-center gap-3 sm:hidden">
          <ThemeButton />
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
            className="rounded-full p-2 transition-colors duration-300 hover:bg-black/5 dark:hover:bg-white/10"
          >
            {menuOpen ? (
              <FaTimes size={20} className="text-black dark:text-white" />
            ) : (
              <FaBars size={20} className="text-black dark:text-white" />
            )}
          </button>

          <div
            id="mobile-menu"
            className={`${
              menuOpen ? "flex" : "hidden"
            } absolute right-0 top-full mt-3 min-w-[200px] rounded-2xl border border-black/10 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-[#0d0b1a]`}
          >
            <NavLinks
              className="flex w-full flex-col gap-1"
              linkClassName={`${LINK_CLASSES} rounded-xl px-4 py-2.5 text-[16px]`}
              activeClassName="bg-common_voilet_color/10 !text-common_voilet_color dark:!text-white"
              activeId={activeId}
              onNavigate={closeMenu}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default memo(Navbar);
