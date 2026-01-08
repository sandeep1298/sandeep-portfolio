import React, { useContext } from "react"
import { Tilt } from "react-tilt";
import {  bounceInRandom, fadeIn, textVariant } from "../utils/motion"
import { SectionWrapper } from "../hoc"
import { technologies } from "../constants"
import { styles } from "../styles"
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { ThemeContext } from "../context/ThemeContext";
import { nextjswhite } from "../assets";


const TechCard = ({ index, icon,name ,alt }) => {
  const { darkTheme } = useContext(ThemeContext);
    const displayIcon =
    name === "NextJS" && darkTheme ? nextjswhite : icon;

  return (
    <>
    <Tilt className="w-28 h-28 sm:w-20 sm:h-20 md:w-24 md:h-24 text-center place-content-center place-items-center justify-center flex ">
      
      <motion.div
        data-tooltip-id="icons"
        data-tooltip-content={name}
      variants={bounceInRandom(0.3, 1)}
        className=" w-28 h-28  sm:w-20 sm:h-20 md:w-24 md:h-24 bg-common_voilet_color rounded-full shadow-card transition-all duration-300 select-none">
        <div
          options={{ max: 45, scale: 1, speed: 450 }}
          className="dark:bg-tertiary bg-white rounded-full py-5 flex justify-center items-center flex-row place-items-center">
          <img alt={alt}
           loading="lazy"
           src={displayIcon} className="w-16 h-16 sm:w-10 sm:h-10 md:w-14 md:h-14 object-contain" />
        </div>
        
      </motion.div>
     
    </Tilt>
   <Tooltip id="icons" className="tooltip_custom_tech" />
   </>
  )
}

const Tech = () => {
  return (
  <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>My tools</p>
        <h2 className={`${styles.sectionHeadText} text-center  `}>
          Technologies.
        </h2>
      </motion.div>

      <div className="flex flex-row flex-wrap justify-center gap-10 mt-20 sm:mt-12 sm:mb-10">
        {technologies.map((technology) => (
          <TechCard icon={technology.icon} key={technology.name} name={technology.name} alt={technology.name} />
        ))}
      </div>
      </>
  
  )
}

export default SectionWrapper(Tech, "tech")

