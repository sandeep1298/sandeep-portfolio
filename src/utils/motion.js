const springTransition = (delay = 0) => ({
  type: "spring",
  duration: 1.25,
  delay,
});

export const textVariant = (delay = 0) => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: springTransition(delay),
  },
});

export const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const zoomIn = (delay, duration) => ({
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const slideIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

const BOUNCE_OFFSETS = [
  [-30, 20],
  [25, -35],
  [-15, -25],
  [40, 15],
  [-20, 40],
  [10, -10],
  [-35, -15],
  [30, 30],
  [-10, 25],
  [20, -20],
  [-25, 10],
  [15, -30],
  [-40, -5],
  [5, 35],
  [-5, -40],
  [35, -25],
  [-30, -30],
  [25, 5],
];

/**
 * @param {number} baseDelay - delay before this card starts (seconds)
 * @param {number} duration - spring duration (seconds)
 * @param {number} index - card index for staggered delay
 * @param {number} staggerStep - extra delay per index (seconds)
 */
export const bounceInRandom = (
  baseDelay = 0.35,
  duration = 1.35,
  index = 0,
  staggerStep = 0.18,
) => {
  const [offsetX, offsetY] =
    BOUNCE_OFFSETS[Math.abs(index) % BOUNCE_OFFSETS.length];
  const delay = baseDelay + index * staggerStep;

  return {
    hidden: {
      x: `${offsetX}%`,
      y: `${offsetY}%`,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration,
        delay,
        stiffness: 65,
        damping: 18,
      },
    },
  };
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
