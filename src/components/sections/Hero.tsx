import { lazy, Suspense, memo } from "react";
import { motion } from "framer-motion";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { FaArrowRight } from "react-icons/fa";
import { styles } from "../../styles";
import { coreStack, technologies, yearsOfExperience } from "../../constants";
import type { Technology } from "../../types";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import Button from "../ui/Button";
import GradientText from "../ui/GradientText";
import SocialLinks from "../ui/SocialLinks";
import TechChip from "../ui/TechChip";
import LazyCanvas from "../canvas/LazyCanvas";

const ComputersCanvas = lazy(() => import("../canvas/Computers"));

const TYPEWRITER_WORDS = [
  "Full Stack Engineer",
  `with ${yearsOfExperience}+ years of experience`,
  "building scalable web apps and AI-powered features.",
];

// Icons come from the Technologies list, so the chips always match the Tech section
const CORE_STACK = coreStack
  .map((name) => technologies.find((tech) => tech.name === name))
  .filter((tech): tech is Technology => tech !== undefined);

const SCROLL_DOT_ANIMATION = { y: [0, 28, 0] };
const SCROLL_DOT_TRANSITION = { duration: 3.5, repeat: Infinity, repeatType: "loop" as const };

const TypewriterText = memo(function TypewriterText() {
  const [text] = useTypewriter({
    words: TYPEWRITER_WORDS,
    loop: true,
    delaySpeed: 900,
  });

  // min-height reserves room for the longest phrase so the layout doesn't jump while typing
  return (
    <p className={`${styles.heroSubText} mt-2 min-h-[3em] max-w-lg`}>
      {text}
      <Cursor cursorColor="#915eff" />
    </p>
  );
});

const ScrollIndicator = memo(function ScrollIndicator() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const dotClasses = "h-3 w-3 rounded-full bg-common_voilet_color";

  return (
    <div className="absolute bottom-5 flex w-full items-center justify-center">
      <a href="#tech" aria-label="Scroll down to technology section">
        <div className="flex h-14 w-[35px] items-start justify-center rounded-3xl border-4 border-secondary p-2 sm:h-16">
          {prefersReducedMotion ? (
            <div className={dotClasses} />
          ) : (
            <motion.div
              animate={SCROLL_DOT_ANIMATION}
              transition={SCROLL_DOT_TRANSITION}
              className={dotClasses}
            />
          )}
        </div>
      </a>
    </div>
  );
});

const Hero = () => (
  <section className="relative mx-auto min-h-[85svh] w-full md:min-h-[100svh]">
    <div
      className={`${styles.paddingX} mx-auto flex max-w-7xl flex-col gap-8 pb-28 pt-28 sm:pt-36 lg:flex-row lg:items-center lg:pt-32`}
    >
      <div className="flex gap-4 sm:gap-5 lg:w-[55%]">
        <div className="mt-14 flex flex-col items-center sm:mt-16">
          <div className="h-5 w-5 rounded-full bg-[#915EFF]" />
          <div className="violet-gradient h-40 w-1 sm:h-64" />
        </div>

        <div className="min-w-0">
          <p className={styles.sectionSubText}>
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-common_voilet_color" />
            Full Stack Engineer
          </p>

          <h1 className={`${styles.heroHeadText} mt-4`}>
            Hi, I&apos;m <br /> <GradientText>Sandeep M</GradientText>
          </h1>
          <TypewriterText />

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <Button href="#work">
              View my work <FaArrowRight aria-hidden="true" className="text-sm" />
            </Button>
            <Button href="#contact" variant="outline">
              Get in touch
            </Button>
            <SocialLinks className="ml-1" />
          </div>

          <div className="mt-8 animate-fade-up border-t border-black/10 pt-6 motion-reduce:animate-none dark:border-white/10">
            <p className="font-mono text-xs font-medium uppercase tracking-wide text-text2 dark:text-secondary">
              Core stack
            </p>
            <ul className="mt-3 flex flex-wrap gap-2 sm:gap-3">
              {CORE_STACK.map((tech) => (
                <TechChip as="li" key={tech.name} size="sm" {...tech} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* The 4 MB model is skipped entirely on phones */}
      <LazyCanvas className="hidden h-[420px] w-full md:block lg:h-[550px] lg:w-[45%]">
        {({ visible }) => (
          <Suspense fallback={null}>
            <ComputersCanvas visible={visible} />
          </Suspense>
        )}
      </LazyCanvas>
    </div>

    <ScrollIndicator />
  </section>
);

export default memo(Hero);
