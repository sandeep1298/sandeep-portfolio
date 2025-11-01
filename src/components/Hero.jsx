import { motion } from "framer-motion";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
 

  const [text, count] = useTypewriter({
    words: [
      "Software Developer",
      "with 4+ years of experience",
      "in Developing, and Maintaining Software Web Applications.",
    ],
    loop: true,
    delaySpeed: 900,
  });
  return (
    <section className={`relative w-full height_small_screen_adjust h-screen mx-auto`}>
      <div
        className={` ${styles.paddingX} absolute inset-0 top-[120px]  max-w-8xl  mx-auto flex flex-wrap flex-row items-start gap-5 `}
      >
        <div className="flex second_height h-full gap-5 width_medium">
        <div className='flex flex-col   justify-center items-center mt-5 self-start '>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-36 h-64 violet-gradient' />
        </div>
        
        <div >
          <h1 className={` ${styles.heroHeadText} `}>
            Hi, I'm <br /> <span className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black">Sandeep M</span>
          </h1>
          <p
                className={`${styles.heroSubText} mt-2 max-w-lg `}
              >
                {text}
                <Cursor cursorColor="#915eff" />
              </p>
        
        </div>
        </div>
        <div className="flex-grow small_grow_none"></div>
        <div className='   width_in_pixels h-full  height_small_screen  lg:block'>
        <ComputersCanvas />
      </div>
      </div>
   
      
    
     
      <div className='absolute xs:bottom-10 bottom-5 w-full flex display_none justify-center items-center cursor-pointer '>
        <a href='#tech' aria-label="Scroll down to technology section">
          <div className='w-[35px] h-[64px] width_top_bottom rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 28, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full dark:bg-common_voilet_color bg-common_voilet_color'
            />
          </div>
        </a>
      </div>
     
    </section>
  );
};

export default Hero;