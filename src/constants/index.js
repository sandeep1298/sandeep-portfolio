import {
    javascript,
    typescript,
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
    tailwind,
    sass,
    nginx,
    sweng,
    connect,
    framer,
    grafana,
    docker,
    leader,
    jest
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
      name: "TailWind Css",
      icon: tailwind,
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
      name: "git",
      icon: git,
    },
      {
      name: "Docker",
      icon: docker,
    },
    {
      name: "Jest",
      icon: jest,
    },
   {
      name: "TypeScript",
      icon: typescript,
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
      "Developed a Progressive Web Application to assist medical aid and natural disaster relief, including donations for individuals affected by COVID-19.",
      "Technologies: HTML5, CSS3, Bootstrap, React JS"
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
        "Technologies: React JS, Node JS, MongoDB, SCSS"
      ],
    },
    {
      title: "Software Developer → Team Lead",
      company_name: "Jireh Software Solutions",
      icon: jireh,
      iconBg: "#ffff",
      date: "Feb 2023 - Mar 2025",
      points: [
        "Developed a healthcare platform for B2C and B2B, allowing users to create and sell courses, with individual dashboards for instructors and learners, and the ability to organize online or offline events.",
        "Collaborating with cross-functional teams including designers, and other developers to create high-quality products.",
        "Implemented a healthcare chat interface, improving user engagement and support responsiveness.",
        "Led and mentored team members, improving collaboration, code quality, and timely delivery of project milestones.",
        "Technologies: React JS, Redux, JavaScript, TypeScript, Next JS, Bootstrap, Framer-motion, Node JS, Express JS, Jest"
      ],
    },
     {
      title: "Full Stack JavaScript Developer",
      company_name: "Leader IT Pvt Ltd",
      icon: leader,
      iconBg: "#ffff",
      date: "May 2025 - Dec 2025",
      points: [
        "Modernized the UI of a low-code enterprise platform by building configurable and customizable components, improving usability, performance, and workflow flexibility.",
        "Designed and developed innovative data visualization dashboards using advanced charting techniques, introducing new visual formats and supporting BI developers with scripting and integration.",
        "Implemented browser-based voice and video calling functionality integrated with SIP servers to enable real-time communication.",
        "Delivered hybrid mobile applications by serving web views within Android (APK) and iOS builds, ensuring consistent cross-platform functionality.",
        "Technologies: React JS, JavaScript, TypeScript, Docker, Vue JS, Expo"
      ],
    }
  ];
  

  
  const projects = [
    {
      name: "stethUP",
      description:
        "stethUP is a revolutionary online platform designed to unify healthcare professionals, organizations, and institutions, facilitating seamless communication, collaboration, and knowledge sharing across the healthcare industry.",
    
  
    },
    {
      name: "Aloy",
      description:
        "With Aloy.ai, you can humanize your entire customer journey by adding a personal touch to it without having to sit in front of a camera and record every single video.",
     
  
    },
    {
      name: "Help Me Online",
      description:
        "Help Me Online(HMO) is a online Crowd Funding Platform across the India to raise the funds and donate for the people who are in need.",
     
    },
    {
      name: "Infoore",
      description:
        "Infoore is a business intelligence platform that helps organizations analyze, visualize, and transform complex data into actionable insights for informed decision-making.",
     
    },
     {
      name: "Automax 3.0",
      description:
        "Automax is a low-code platform that helps organizations automate workflows and incident management to enable faster resolutions, improved collaboration, and scalable operations.",
     
    },
  ];
  
  export {  technologies, experiences, projects };