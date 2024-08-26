import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";



const ProjectCard = ({
  index,
  name,
  description,
 
}) => {


  return (
    <div className="w-96">
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}
    className="w-full"
    >
      <div className='bg-primary  w-full rounded-2xl  justify-center flex  flex-wrap '>
      
         <div className="p-3 card_custom ">
        <div className='mt-2 content_custom'>
          <h3 className='text-white font-bold aling_hei text-[24px] text-center'>{name}</h3>
          <div className="hover_content">
          <p className='mt-2 text-secondary text-[14px] text-center'>{description}</p>
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