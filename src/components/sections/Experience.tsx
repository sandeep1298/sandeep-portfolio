import { memo, useCallback, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaRegCalendarAlt } from "react-icons/fa";
import { experiences } from "../../constants";
import type { Experience as ExperienceItem } from "../../types";
import { fadeIn } from "../../utils/motion";
import Section from "../layout/Section";
import SectionHeading from "../ui/SectionHeading";
import StackTags from "../ui/StackTags";

// Newest first
const ORDERED_EXPERIENCES = [...experiences].reverse();
const PANEL_VARIANTS = fadeIn("up", "tween", 0.15, 0.6);
const INDICATOR_TRANSITION = { type: "spring", stiffness: 400, damping: 34 };
const CONTENT_TRANSITION = { duration: 0.25, ease: "easeOut" };

const NEXT_KEYS = new Set(["ArrowDown", "ArrowRight"]);
const PREVIOUS_KEYS = new Set(["ArrowUp", "ArrowLeft"]);

const tabId = (index: number) => `experience-tab-${index}`;
const PANEL_ID = "experience-panel";

interface CompanyLogoProps {
  src: string;
  alt: string;
  /** Tailwind size classes for the badge. */
  size?: string;
}

const CompanyLogo = memo(function CompanyLogo({ src, alt, size = "h-10 w-10" }: CompanyLogoProps) {
  return (
    <span className={`flex ${size} shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-black/5`}>
      <img src={src} alt={alt} loading="lazy" className="max-h-full max-w-full object-contain" />
    </span>
  );
});

interface CompanyTabProps {
  experience: ExperienceItem;
  index: number;
  selected: boolean;
  onSelect: (index: number) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  tabRef: (node: HTMLButtonElement | null) => void;
}

const CompanyTab = memo(function CompanyTab({
  experience,
  index,
  selected,
  onSelect,
  onKeyDown,
  tabRef,
}: CompanyTabProps) {
  return (
    <button
      ref={tabRef}
      type="button"
      role="tab"
      id={tabId(index)}
      aria-selected={selected}
      aria-controls={PANEL_ID}
      tabIndex={selected ? 0 : -1}
      onClick={() => onSelect(index)}
      onKeyDown={onKeyDown}
      className={`relative flex shrink-0 snap-start items-center gap-3 rounded-2xl border px-4 py-3 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-common_voilet_color lg:w-full ${
        selected
          ? "border-common_voilet_color/50 bg-common_voilet_color/10"
          : "border-black/10 bg-white/70 hover:border-common_voilet_color/40 dark:border-white/10 dark:bg-tertiary/60"
      }`}
    >
      {selected ? (
        <motion.span
          layoutId="experience-indicator"
          transition={INDICATOR_TRANSITION}
          aria-hidden="true"
          className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 lg:inset-x-auto lg:inset-y-3 lg:left-0 lg:h-auto lg:w-1 lg:bg-gradient-to-b"
        />
      ) : null}
      <CompanyLogo src={experience.icon} alt="" />
      <span className="min-w-0">
        <span className="block whitespace-nowrap text-sm font-semibold text-black lg:whitespace-normal dark:text-white">
          {experience.company_name}
        </span>
        <span className="block whitespace-nowrap font-mono text-[11px] text-text2 dark:text-secondary">
          {experience.date}
        </span>
      </span>
    </button>
  );
});

const RoleDetails = memo(function RoleDetails({ experience }: { experience: ExperienceItem }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-common_voilet_color/30 bg-common_voilet_color/10 px-3 py-1 font-mono text-xs font-medium text-tertiary sm:text-sm dark:text-secondary">
          <FaRegCalendarAlt aria-hidden="true" />
          {experience.date}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-bold text-black sm:text-2xl lg:text-3xl dark:text-white">
        {experience.title}
      </h3>
      <div className="mt-3 flex items-center gap-3">
        <CompanyLogo src={experience.icon} alt="" size="h-8 w-8" />
        <p className="text-sm font-semibold text-gray-700 sm:text-base dark:text-gray-300">
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="flex gap-3 text-sm leading-relaxed text-gray-700 sm:text-[15px] dark:text-gray-300"
          >
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-common_voilet_color"
            />
            {point}
          </li>
        ))}
      </ul>

      {experience.skills?.length ? (
        <div className="mt-6 border-t border-black/10 pt-5 dark:border-white/10">
          <p className="font-mono text-xs font-medium uppercase tracking-wide text-text2 dark:text-secondary">
            Tech used
          </p>
          <StackTags items={experience.skills} className="mt-3" />
        </div>
      ) : null}
    </>
  );
});

const Experience = () => {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectTab = useCallback((index: number) => {
    setSelected(index);
    tabRefs.current[index]?.focus();
  }, []);

  // Arrow keys move between tabs (both orientations, since the list is horizontal on mobile)
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      const count = ORDERED_EXPERIENCES.length;
      let next: number | null = null;

      if (NEXT_KEYS.has(event.key)) next = (selected + 1) % count;
      else if (PREVIOUS_KEYS.has(event.key)) next = (selected - 1 + count) % count;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = count - 1;

      if (next !== null) {
        event.preventDefault();
        selectTab(next);
      }
    },
    [selectTab, selected],
  );

  const experience = ORDERED_EXPERIENCES[selected];

  return (
    <Section id="experience">
      <SectionHeading subtitle="What I have done so far" title="Work Experience." />

      <motion.div
        variants={PANEL_VARIANTS}
        className="mt-12 grid gap-4 sm:mt-16 lg:mt-20 lg:grid-cols-[minmax(260px,320px)_1fr] lg:gap-8"
      >
        <div
          role="tablist"
          aria-label="Companies"
          className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {ORDERED_EXPERIENCES.map((item, index) => (
            <CompanyTab
              key={`${item.company_name}-${item.date}`}
              experience={item}
              index={index}
              selected={index === selected}
              onSelect={setSelected}
              onKeyDown={handleKeyDown}
              tabRef={(node) => {
                tabRefs.current[index] = node;
              }}
            />
          ))}
        </div>

        <div
          role="tabpanel"
          id={PANEL_ID}
          aria-labelledby={tabId(selected)}
          className="rounded-3xl border border-black/10 bg-white/90 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:p-8 lg:min-h-[440px] dark:border-white/10 dark:bg-tertiary/80 dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={CONTENT_TRANSITION}
            >
              <RoleDetails experience={experience} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </Section>
  );
};

export default Experience;
