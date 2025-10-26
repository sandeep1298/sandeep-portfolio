import React, { useContext } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { ThemeContext } from "../context/ThemeContext";



const ProjectCard = ({
  index,
  name,
  description,
 
}) => {

    const { darkTheme } = useContext(ThemeContext);

  return (
    <div className="w-96">
 <motion.div
  variants={fadeIn("up", "spring", index * 0.5, 0.75)}
  className="w-full"
>
  <div className="w-full rounded-2xl flex justify-center flex-wrap transition-all duration-300">
    <div
      className={`p-3 card_custom ${
        darkTheme ? "dark" : ""
      }`}
    >
      <div className="mt-2 content_custom">
        <h3
          className={`font-bold aling_hei text-[24px] text-center ${
            darkTheme ? "text-white" : "text-black"
          }`}
        >
          {name}
        </h3>
        <div className="hover_content">
          <p
            className={`mt-2 text-[14px] text-center ${
              darkTheme ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  </div>
</motion.div>

    </div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>My work</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Projects.</h2>
      </motion.div>


      <div className='mt-10 mb-10 w-full  flex  flex-wrap   gap-10 justify-center  '>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "work");