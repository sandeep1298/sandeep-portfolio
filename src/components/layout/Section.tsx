import { memo, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { staggerContainer } from "../../utils/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useRegisterSection } from "../../hooks/useActiveSection";

const SECTION_VARIANTS = staggerContainer(0.08, 0.05);
const VIEWPORT = { once: true, amount: 0.15 };
const REVEAL_PROPS = {
  variants: SECTION_VARIANTS,
  initial: "hidden",
  whileInView: "show",
  viewport: VIEWPORT,
};

/**
 * Page section with shared padding, an anchor target (`id`), a staggered reveal, and
 * registration with the navbar scroll-spy.
 */
interface SectionProps {
  /** Anchor id used by the nav links and the scroll-spy. */
  id: string;
  children: ReactNode;
}

function Section({ id, children }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  useRegisterSection(id, ref);

  return (
    <motion.section
      ref={ref}
      {...(prefersReducedMotion ? {} : REVEAL_PROPS)}
      className={`${styles.padding} relative z-0 mx-auto max-w-7xl`}
    >
      <span className="hash-span" id={id} aria-hidden="true">
        &nbsp;
      </span>
      {children}
    </motion.section>
  );
}

export default memo(Section);
