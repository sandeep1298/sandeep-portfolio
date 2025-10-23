import React from "react"
import { Tilt } from "react-tilt";
import {  bounceInRandom, fadeIn, textVariant } from "../utils/motion"
import { SectionWrapper } from "../hoc"
import { technologies } from "../constants"
import { styles } from "../styles"
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";


const TechCard = ({ index, icon,name ,alt }) => {
  return (
    <>
    <Tilt className="w-28 h-28 sm:w-20 sm:h-20 md:w-24 md:h-24 text-center place-content-center place-items-center justify-center flex ">
      
      <motion.div
        data-tooltip-id="icons"
        data-tooltip-content={name}
      variants={bounceInRandom(0.3, 1)}
        className=" w-28 h-28  sm:w-20 sm:h-20 md:w-24 md:h-24 bg-button rounded-full shadow-card select-none">
        <div
          options={{ max: 45, scale: 1, speed: 450 }}
          className="bg-tertiary rounded-full py-5 flex justify-center items-center flex-row place-items-center">
          <img alt={alt}
           loading="lazy"
          src={icon} className="w-16 h-16 sm:w-10 sm:h-10 md:w-14 md:h-14 object-contain" />
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

      <div className="flex flex-row flex-wrap justify-center gap-10 mt-20">
        {technologies.map((technology) => (
          <TechCard icon={technology.icon} key={technology.name} name={technology.name} alt={technology.name} />
        ))}
      </div>
      </>
  
  )
}

export default SectionWrapper(Tech, "tech")

