import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { projects } from "../../constants";
import type { Project } from "../../types";
import { fadeIn } from "../../utils/motion";
import { useSpotlight } from "../../hooks/useSpotlight";
import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";

/** "Help Me Online" → "HM", "stethUP" → "ST". */
function getInitials(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2);
  return letters.toUpperCase();
}

// Full class names so Tailwind can see them
const MD_SPAN: Record<number, string> = { 1: "md:col-span-1", 2: "md:col-span-2" };
const LG_SPAN: Record<number, string> = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3" };

/**
 * Bento packing: fill rows left to right (featured cards take 2 columns) and stretch the
 * last card of any row that would otherwise leave a gap, so every row is full.
 */
function packSpans(items: Pick<Project, "featured">[], columns: number): number[] {
  const spans: number[] = [];
  let rowFill = 0;

  items.forEach((item, index) => {
    const span = Math.min(item.featured ? 2 : 1, columns);
    if (rowFill + span > columns) {
      spans[index - 1] += columns - rowFill;
      rowFill = 0;
    }
    spans.push(span);
    rowFill = (rowFill + span) % columns;
  });

  if (rowFill > 0) spans[spans.length - 1] += columns - rowFill;
  return spans;
}

const MD_SPANS = packSpans(projects, 2);
const LG_SPANS = packSpans(projects, 3);

const ProjectCard = memo(function ProjectCard({ index, name, description, featured }: Project & { index: number }) {
  const variants = useMemo(() => fadeIn("up", "spring", index * 0.12, 0.75), [index]);
  const { ref, onPointerMove } = useSpotlight();
  const initials = getInitials(name);

  return (
    <motion.article
      variants={variants}
      className={`h-full ${MD_SPAN[MD_SPANS[index]]} ${LG_SPAN[LG_SPANS[index]]}`}
    >
      <div
        ref={ref}
        tabIndex={0}
        onPointerMove={onPointerMove}
        className={`project-card flex h-full flex-col p-6 sm:p-8 ${featured ? "is-featured" : ""}`}
      >
        <div className="relative z-[1] flex items-start justify-between gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 via-purple-500 to-orange-500 font-display text-base font-bold text-white shadow-lg shadow-purple-500/20">
            {initials}
          </span>
          <span
            aria-hidden="true"
            className="font-mono text-3xl font-medium leading-none text-black/10 sm:text-4xl dark:text-white/10"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          className={`relative z-[1] mt-6 font-bold text-[#1f1f2e] dark:text-white ${
            featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          }`}
        >
          {name}
        </h3>
        <p
          className={`relative z-[1] mt-3 text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-300 ${
            featured ? "max-w-2xl sm:pr-40" : ""
          }`}
        >
          {description}
        </p>

        {featured ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 right-4 hidden select-none font-display text-[160px] font-extrabold leading-none text-black/[0.04] sm:block dark:text-white/[0.04]"
          >
            {initials}
          </span>
        ) : null}
      </div>
    </motion.article>
  );
});

const Works = () => (
  <Section id="work">
    <SectionHeading subtitle="Contributions & Collaborations" title="Projects." />

    <div className="mb-10 mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard key={project.name} index={index} {...project} />
      ))}
    </div>
  </Section>
);

export default Works;
