import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/theme";

const ICON_TRANSITION = { duration: 0.4 };

function ThemeButton() {
  const { darkTheme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={darkTheme ? "Switch to light theme" : "Switch to dark theme"}
      className="rounded-full bg-text3 p-2 text-black transition-colors duration-300 dark:bg-gray-200 dark:text-white"
    >
      <AnimatePresence mode="wait" initial={false}>
        {darkTheme ? (
          <motion.div
            key="sun"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={ICON_TRANSITION}
          >
            <FaSun size={18} className="text-red-500" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -180, opacity: 0 }}
            transition={ICON_TRANSITION}
          >
            <FaMoon size={18} className="text-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export default memo(ThemeButton);
