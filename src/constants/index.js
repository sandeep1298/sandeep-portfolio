import {
    javascript,
    html,
    css,
    reactjs,
    redux,
    nodejs,
    mongodb,
    git,
    nextjs,
   jireh,
    threejs,
    bootstrap,
    sass,
    nginx,
    sweng,
    connect,
    stethup1,
    stethup2,
    stethup3,
    aloy1,
    aloy2,
    aloy3,
    hmo,
    hmo1,
    hmo2,
    framer
  } from "../assets";
  
  export const navLinks = [
    {
      id: "experience",
      title: "Experience",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
    
  ];
  
 
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
   
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux",
      icon: redux,
    },
    {
      name: "NextJS",
      icon: nextjs,
    },
    {
      name: "Bootstrap",
      icon: bootstrap,
    },
    {
      name: "Sass",
      icon: sass,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Framer Motion",
      icon: framer,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "Nginx",
      icon: nginx,
    },
   
  ];
  
  const experiences = [
    {
      title: "Student Trainee",
      company_name: "SWENG Solutions, Bangalore",
      icon: sweng,
      iconBg: "#383E56",
      date: "September 2020 - July 2021",
      points: [
        "Worked extensively with frontend technologies, specializing in web design and development.",
      "Developed a Progressive Web Application to assist medical aid and natural disaster relief, including donations for individuals affected by COVID-19."
      ],
    },
    {
      title: "Software Engineer",
      company_name: "KonnectzIT, Bangalore",
      icon: connect,
      iconBg: "#E6DEDD",
      date: "November 2021 - April 2022",
      points: [
        "Developed an automation platform using Google Cloud Text-to-Speech, allowing users to input text, set delays, and adjust pitch, volume, and rate with input sliders.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
      ],
    },
    {
      title: "Software Developer",
      company_name: "Jireh Software Solutions",
      icon: jireh,
      iconBg: "#ffff",
      date: "Feb 2023 - Mar 2024",
      points: [
        "Developed a healthcare platform for B2C and B2B, allowing users to create and sell courses, with individual dashboards for instructors and learners, and the ability to organize online or offline events.",
        "Collaborating with cross-functional teams including designers, and other developers to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Implemented a chat interface for health-related queries and solutions.",
        "Solved major challenges that occurred during development and assisted other team members during difficult times to resolve issues."
      ],
    },
    {
      title: "Team Lead",
      company_name: "Jireh Software Solutions",
      icon: jireh,
      iconBg: "#ffff",
      date: "Mar 2024 - Present",
      points: [
        "Proven ability to lead and motivate teams towards achieving goals while fostering collaboration and innovation.",
        "Collaborating with cross-functional teams including designers, and other developers to create high-quality products.",
        "Solved major challenges that occurred during development and assisted other team members during difficult times to resolve issues."
      ],
    },
    
  ];
  

  
  const projects = [
    {
      name: "stethUP",
      description:
        "stethUP is a revolutionary online platform designed to unify healthcare professionals, organizations,and institutions, facilitating seamless communication, collaboration, and knowledge sharing across the healthcare industry.",
      tags: [
        {
          name: "react js",
          color: "blue-text-gradient",
        },
        {
          name: "redux",
          color: "green-text-gradient",
        },
        {
          name: "bootstrap",
          color: "orange-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
      ],
      images: [
        {
          id: "1",
          name: stethup1,
         
        },
        {
          id: "2",
          name: stethup2,
        
        },
        {
          id: "3",
          name: stethup3,
         
        },
      ],
      source_code_link: "https://www.stethup.ai/",
    },
    {
      name: "Aloy",
      description:
        "With Aloy.ai, you can humanize your entire customer journey by adding a personal touch to it without having to sit in front of a camera and record every single video.",
      tags: [
        {
          name: "react js",
          color: "blue-text-gradient",
        },
        {
          name: "node js",
          color: "green-text-gradient",
        },
        {
          name: "react-bootstrap",
          color: "pink-text-gradient",
        },
      ],
      images: [
        {
          id: "4",
          name: aloy1,
         
        },
        {
          id: "5",
          name: aloy2,
        
        },
        {
          id: "6",
          name: aloy3,
         
        },
      ],
      source_code_link: "https://aloy.ai/",
    },
    {
      name: "Help Me Online",
      description:
        "Help Me Online(HMO) is a online Crowd Funding Platform across the India to raise the funds and donate for the people who are in need.",
      tags: [
        {
          name: "react js",
          color: "blue-text-gradient",
        },
        {
          name: "bootstrap",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      images: [
        {
          id: "7",
          name: hmo,
         
        },
        {
          id: "8",
          name: hmo1,
        
        },
        {
          id: "9",
          name: hmo2,
         
        },
      ],
      source_code_link: "https://api-dot-swengsolutions-282915.df.r.appspot.com/",
    },
  ];
  
  export {  technologies, experiences, projects };