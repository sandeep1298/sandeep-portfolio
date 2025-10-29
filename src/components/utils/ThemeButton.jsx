import { motion, AnimatePresence } from "framer-motion";
import React, {  useContext} from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";



export default function ThemeButton() {
    const { darkTheme, toggleTheme } = useContext(ThemeContext);
return (
<>
 <button
    onClick={toggleTheme}
    className="group p-2 rounded-full bg-text3 dark:bg-gray-200 text-black dark:text-white 
               transition-colors duration-300 "
    
  >
    <AnimatePresence mode="wait" initial={false}>
      {darkTheme ? (
        <motion.div
          key="sun"
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FaSun size={18} className="text-red-500 " />
        </motion.div>
      ) : (
        <motion.div
          key="moon"
          initial={{ rotate: 180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -180, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FaMoon size={18} className="text-white " />
        </motion.div>
      )}
    </AnimatePresence>
  </button>
</>

)

}