import { memo } from "react";

interface StackTagsProps {
  items: string[];
  className?: string;
}

/** Small mono pills listing the tech used on a project or in a role. */
function StackTags({ items, className = "" }: StackTagsProps) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-black/10 px-2.5 py-1 font-mono text-xs text-text3 dark:border-white/10 dark:text-secondary"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default memo(StackTags);
