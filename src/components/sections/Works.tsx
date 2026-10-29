import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { independentBuilds, projects } from "../../constants";
import type { IndependentBuild, Project } from "../../types";
import { fadeIn } from "../../utils/motion";
import { useSpotlight } from "../../hooks/useSpotlight";
import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import StackTags from "../ui/StackTags";

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

const BuildCard = memo(function BuildCard({
  index,
  name,
  description,
  highlight,
  stack,
  href,
  image,
  imageAlt,
}: IndependentBuild & { index: number }) {
  const variants = useMemo(() => fadeIn("up", "spring", index * 0.12, 0.75), [index]);
  const { ref, onPointerMove } = useSpotlight();

  return (
    <motion.article variants={variants} className="h-full">
      <div ref={ref} onPointerMove={onPointerMove} className="project-card group flex h-full flex-col p-4 sm:p-5">
        <div className="relative z-[1] aspect-[1200/630] overflow-hidden rounded-xl border border-black/5 dark:border-white/5">
          <img
            src={image}
            alt={imageAlt}
            width={1200}
            height={630}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>

        <div className="relative z-[1] flex flex-1 flex-col px-1 pb-1 pt-5 sm:px-2">
          <span className="w-fit rounded-full border border-common_voilet_color/30 bg-common_voilet_color/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-tertiary dark:text-secondary">
            {highlight}
          </span>
          <h3 className="mt-3 text-xl font-bold text-[#1f1f2e] sm:text-2xl dark:text-white">{name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-300">{description}</p>

          <StackTags items={stack} className="mt-4" />

          {/* mt-auto pins the link to the bottom so both cards line up */}
          <div className="mt-auto pt-6">
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${name} (opens in a new tab)`}
              className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-common_voilet_color transition-colors hover:text-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-common_voilet_color focus-visible:ring-offset-4 focus-visible:ring-offset-transparent sm:text-base"
            >
              Visit live site
              <FaArrowRight aria-hidden="true" className="-rotate-45 text-xs" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

const Works = () => (
  <Section id="work">
    <SectionHeading subtitle="Contributions & Collaborations" title="Projects." />

    <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard key={project.name} index={index} {...project} />
      ))}
    </div>

    <div className="mb-10 mt-16 sm:mt-20">
      <div className="flex items-center gap-4">
        <p className="font-mono text-xs font-medium uppercase tracking-wide text-text2 sm:text-sm dark:text-secondary">
          Recent builds
        </p>
        <span aria-hidden="true" className="h-px flex-1 bg-black/10 dark:bg-white/10" />
      </div>
      <p className="mt-2 text-sm text-gray-600 sm:text-base dark:text-gray-300">
        My latest work: live, in use, and built from scratch.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {independentBuilds.map((build, index) => (
          <BuildCard key={build.name} index={index} {...build} />
        ))}
      </div>
    </div>
  </Section>
);

export default Works;
