import React, { useContext } from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { ThemeContext } from '../context/ThemeContext';


const ExperienceCard = React.memo(({ experience,darkTheme }) => {
  return (
  <VerticalTimelineElement
  contentStyle={{
    background: darkTheme ? "#1d1836" : "#f9f9f9",
    color: darkTheme ? "#fff" : "#000",
    boxShadow: darkTheme
      ? "0 3px 10px rgba(255, 255, 255, 0.1)"
      : "0 3px 10px rgba(0, 0, 0, 0.1)",
    borderBottom: 
 "3px solid #915EFF",
     
    borderRadius: "12px",
    transition: "all 0.3s ease-in-out",
    padding: "20px",
  }}
  contentArrowStyle={{
    borderRight: darkTheme
      ? "7px solid #fff"
      : "7px solid #000",
  }}
  date={experience.date}
 iconStyle={{
  background: experience.iconBg,
  border: darkTheme
    ? "3px solid #ffffff" // white border in dark mode
    : "3px solid #915EFF", // black border in light mode
  boxShadow: darkTheme
    ? "0 0 10px rgba(255,255,255,0.3)"
    : "0 0 10px rgba(0,0,0,0.1)",
  borderRadius: "50%",
  transition: "all 0.3s ease-in-out",
}}
  icon={
    <div className="flex justify-center items-center w-full h-full">
      <img
        src={experience.icon}
        loading="lazy"
        alt={experience.company_name}
        className="w-[60%] h-[60%] object-contain"
      />
    </div>
  }
>
  <div>
    <h3
      className={`text-[24px] font-bold ${
        darkTheme ? "text-white" : "text-black"
      }`}
    >
      {experience.title}
    </h3>
    <p
      className={`text-[16px] font-semibold ${
        darkTheme ? "text-gray-300" : "text-gray-700"
      }`}
      style={{ margin: 0 }}
    >
      {experience.company_name}
    </p>
  </div>

  <ul className="mt-5 list-disc ml-5 space-y-2">
    {experience.points.map((point, index) => (
      <li
        key={`experience-point-${index}`}
        className={`text-[14px] pl-1 tracking-wider ${
          darkTheme ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {point}
      </li>
    ))}
  </ul>
</VerticalTimelineElement>

  );
});

ExperienceCard.displayName = "ExperienceCard";

const Experience = () => {
    const { darkTheme } = useContext(ThemeContext);
  
  return (
    <>
   
      <motion.div >
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
       <VerticalTimeline lineColor={darkTheme ? "#fff" : "#000"}>
          {[...experiences].reverse().map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              darkTheme={darkTheme}
            />
          ))}
        </VerticalTimeline>
      </div>
     
    </>
  );
};

export default SectionWrapper(Experience, "experience");