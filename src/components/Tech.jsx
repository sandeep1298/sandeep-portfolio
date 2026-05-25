import { useContext, useMemo, memo } from "react";
import { bounceInRandom, textVariant, staggerContainer } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { ThemeContext } from "../context/ThemeContext";
import { nextjswhite } from "../assets";
import { useTilt } from "../hooks/useTilt";

/** Pause before the grid animates; per-card delay lives in bounceInRandom. */
const TECH_GRID_VARIANTS = staggerContainer(0, 0.5);

const TechCard = memo(({ index, icon, name, alt }) => {
  const { darkTheme } = useContext(ThemeContext);
  const { ref, onMouseMove, onMouseLeave, tiltStyle } = useTilt({
    max: 45,
    scale: 1,
    speed: 450,
  });

  const displayIcon = name === "NextJS" && darkTheme ? nextjswhite : icon;
  const variants = useMemo(
    () => bounceInRandom(0, 0.5, index, 0.18),
    [index],
  );

  return (
    <motion.div
      variants={variants}
      className="w-28 h-28 sm:w-20 sm:h-20 md:w-24 md:h-24 flex justify-center items-center"
      data-tooltip-id="icons"
          data-tooltip-content={name}
        
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={tiltStyle}
        data-tooltip-id="icons"
        data-tooltip-content={name}
        className="w-28 h-28 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-common_voilet_color rounded-full tech-card-glow select-none"
      >
        <div className="dark:bg-tertiary bg-white rounded-full py-5 flex justify-center items-center">
          <img
            alt={alt}
            loading="lazy"
            decoding="async"
            src={displayIcon}
            className="w-16 h-16 sm:w-10 sm:h-10 md:w-14 md:h-14 object-contain pointer-events-none"
          />
        </div>
      </div>
    </motion.div>
  );
});

TechCard.displayName = "TechCard";

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>My tools</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Technologies.</h2>
      </motion.div>

      <motion.div
        variants={TECH_GRID_VARIANTS}
        className="flex flex-row flex-wrap justify-center gap-10 mt-20 sm:mt-12 sm:mb-10"
      >
        {technologies.map((technology, index) => (
          <TechCard
            icon={technology.icon}
            key={technology.name}
            name={technology.name}
            alt={technology.name}
            index={index}
          />
        ))}
      </motion.div>
      <Tooltip id="icons" className="tooltip_custom_tech" />
    </>
  );
};

export default SectionWrapper(Tech, "tech");
