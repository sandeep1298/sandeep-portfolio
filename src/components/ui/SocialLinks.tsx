import { memo } from "react";
import { socialLinks } from "../../constants";

const LINK_CLASSES = {
  // Icon only
  icon: "block text-[23px] transition-opacity hover:opacity-80",
  // Icon + name in a pill
  pill: "flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-2 text-sm font-medium sm:px-4 text-black transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-common_voilet_color dark:border-white/10 dark:bg-white/5 dark:text-white motion-reduce:transition-none motion-reduce:hover:translate-y-0",
};

interface SocialLinksProps {
  className?: string;
  variant?: keyof typeof LINK_CLASSES;
}

function SocialLinks({ className = "", variant = "icon" }: SocialLinksProps) {
  return (
    // Pills sit in an even 2-column grid so 4 links never leave one orphaned on its own row
    <ul
      className={`${variant === "pill" ? "grid grid-cols-2 gap-3" : "flex flex-wrap items-center gap-6"} ${className}`}
    >
      {socialLinks.map(({ name, label, href, icon: Icon, className: colorClass }) => (
        <li key={name}>
          <a
            href={href}
            // Web profiles open in a new tab; mailto: opens the mail app in place
            {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            aria-label={label}
            className={LINK_CLASSES[variant]}
          >
            <Icon aria-hidden="true" className={`shrink-0 ${colorClass} ${variant === "pill" ? "text-lg" : ""}`} />
            {variant === "pill" ? name : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default memo(SocialLinks);
