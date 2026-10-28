import { memo, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-[transform,box-shadow,border-color,color,background-color] duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0 sm:text-base motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const VARIANTS = {
  primary:
    "bg-gradient-to-r from-purple-600 via-common_voilet_color to-fuchsia-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40",
  outline:
    "border border-black/15 text-black hover:border-common_voilet_color hover:text-common_voilet_color dark:border-white/20 dark:text-white dark:hover:border-common_voilet_color dark:hover:text-white",
};

interface SharedProps {
  variant?: keyof typeof VARIANTS;
  className?: string;
  children: ReactNode;
}

type LinkButtonProps = SharedProps & { as?: "a" } & AnchorHTMLAttributes<HTMLAnchorElement>;
type NativeButtonProps = SharedProps & { as: "button" } & ButtonHTMLAttributes<HTMLButtonElement>;
export type ButtonProps = LinkButtonProps | NativeButtonProps;

/** Pill-shaped call to action; renders an <a> by default, pass `as="button"` for forms. */
function Button(props: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[props.variant ?? "primary"]} ${props.className ?? ""}`;

  if (props.as === "button") {
    const { as, variant, className, children, ...buttonProps } = props;
    return (
      <button className={classes} {...buttonProps}>
        {children}
      </button>
    );
  }

  const { as, variant, className, children, ...linkProps } = props;
  return (
    <a className={classes} {...linkProps}>
      {children}
    </a>
  );
}

export default memo(Button);
