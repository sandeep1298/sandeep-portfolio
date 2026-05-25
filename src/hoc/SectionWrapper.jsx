import { memo } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const SECTION_VARIANTS = staggerContainer(0.08, 0.05);
const VIEWPORT = { once: true, amount: 0.15 };

const SectionWrapper = (Component, idName) => {
  const WrappedSection = () => {
    const prefersReducedMotion = usePrefersReducedMotion();

    if (prefersReducedMotion) {
      return (
        <section
          className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        >
          <span className="hash-span" id={idName}>
            &nbsp;
          </span>
          <Component />
        </section>
      );
    }

    return (
      <motion.section
        variants={SECTION_VARIANTS}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </motion.section>
    );
  };

  WrappedSection.displayName = `Section(${Component.displayName || Component.name || idName})`;

  return memo(WrappedSection);
};

export default SectionWrapper;
