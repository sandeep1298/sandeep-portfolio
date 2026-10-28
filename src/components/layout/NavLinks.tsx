import { memo } from "react";
import { motion } from "framer-motion";
import { navLinks } from "../../constants";

const INDICATOR_TRANSITION = { type: "spring", stiffness: 380, damping: 32 };

/**
 * Section links, shared by the navbar, the mobile menu and the footer.
 * Pass `indicatorId` to show a sliding pill behind the active link.
 */
interface NavLinksProps {
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
  activeId?: string | null;
  /** framer-motion layoutId for the sliding active pill; omit to hide it. */
  indicatorId?: string;
  onNavigate?: () => void;
}

function NavLinks({
  className = "",
  linkClassName = "",
  activeClassName = "",
  activeId,
  indicatorId,
  onNavigate,
}: NavLinksProps) {
  return (
    <ul className={`list-none ${className}`}>
      {navLinks.map((nav) => {
        const isActive = nav.id === activeId;

        return (
          <li key={nav.id}>
            <a
              href={`#${nav.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`relative block ${linkClassName} ${isActive ? activeClassName : ""}`}
              onClick={onNavigate}
            >
              {isActive && indicatorId ? (
                <motion.span
                  layoutId={indicatorId}
                  transition={INDICATOR_TRANSITION}
                  className="absolute inset-0 rounded-full bg-common_voilet_color/15 ring-1 ring-common_voilet_color/30"
                />
              ) : null}
              <span className="relative">{nav.title}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default memo(NavLinks);
