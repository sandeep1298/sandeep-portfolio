import { memo } from "react";
import { motion } from "framer-motion";
import { technologies } from "../../constants";
import type { Technology } from "../../types";
import { fadeIn } from "../../utils/motion";
import { useInViewport } from "../../hooks/useInViewport";
import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import TechChip from "../ui/TechChip";

const MARQUEE_VARIANTS = fadeIn("up", "tween", 0.2, 0.6);
const HALF = Math.ceil(technologies.length / 2);
const ROWS = [
  { id: "row-1", items: technologies.slice(0, HALF), reverse: false },
  { id: "row-2", items: technologies.slice(HALF), reverse: true },
];

/** One row: the list is rendered twice and slid by -50% for a seamless loop. */
const MarqueeRow = memo(function MarqueeRow({ items, reverse }: { items: Technology[]; reverse: boolean }) {
  return (
    <div className="marquee">
      <ul className={`marquee__track ${reverse ? "is-reverse" : ""}`}>
        {items.map((tech) => (
          <TechChip as="li" key={tech.name} {...tech} className="mr-3 sm:mr-4" />
        ))}
        {items.map((tech) => (
          <TechChip as="li" key={`${tech.name}-copy`} {...tech} className="mr-3 sm:mr-4" aria-hidden="true" />
        ))}
      </ul>
    </div>
  );
});

const Tech = () => {
  // Pause the (otherwise endless) marquee animation while it's off-screen
  const { ref, isVisible } = useInViewport({ threshold: 0 });

  return (
    <Section id="tech">
      <SectionHeading subtitle="My tools" title="Technologies." />

      <motion.div
        ref={ref}
        variants={MARQUEE_VARIANTS}
        data-paused={isVisible ? undefined : "true"}
        className="marquee-group mt-12 flex flex-col gap-4 sm:mt-16 lg:mt-20"
      >
        {ROWS.map((row) => (
          <MarqueeRow key={row.id} items={row.items} reverse={row.reverse} />
        ))}
      </motion.div>
    </Section>
  );
};

export default Tech;
