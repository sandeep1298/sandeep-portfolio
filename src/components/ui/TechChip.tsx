import { memo, type HTMLAttributes } from "react";
import type { Technology } from "../../types";

const SIZES = {
  // Tech section marquee
  md: {
    chip: "gap-3 rounded-2xl px-4 py-3 sm:px-5",
    icon: "h-7 w-7 sm:h-8 sm:w-8",
    label: "text-sm font-semibold sm:text-base",
  },
  // Hero "Core stack" row
  sm: {
    chip: "gap-2 rounded-full px-3 py-1.5",
    icon: "h-5 w-5",
    label: "text-xs font-medium sm:text-sm",
  },
};

type TechChipProps = Technology &
  HTMLAttributes<HTMLElement> & {
    as?: "span" | "li";
    size?: keyof typeof SIZES;
  };

/** Technology logo + name. Pass `as="li"` inside lists; extra props go to the root element. */
function TechChip({ as: Tag = "span", name, icon, darkIcon, size = "md", className = "", ...props }: TechChipProps) {
  const { chip, icon: iconSize, label } = SIZES[size];
  const iconClasses = `${iconSize} shrink-0 object-contain`;

  return (
    <Tag
      className={`tech-pill flex shrink-0 items-center border border-black/10 bg-white/90 dark:border-white/10 dark:bg-tertiary/80 ${chip} ${className}`}
      {...props}
    >
      {/* Theme swap is pure CSS, so toggling the theme doesn't re-render the chip */}
      <img
        src={icon}
        alt=""
        loading="lazy"
        decoding="async"
        className={`${iconClasses} ${darkIcon ? "dark:hidden" : ""}`}
      />
      {darkIcon ? (
        <img
          src={darkIcon}
          alt=""
          loading="lazy"
          decoding="async"
          className={`${iconClasses} hidden dark:block`}
        />
      ) : null}
      <span className={`whitespace-nowrap text-black dark:text-white ${label}`}>{name}</span>
    </Tag>
  );
}

export default memo(TechChip);
