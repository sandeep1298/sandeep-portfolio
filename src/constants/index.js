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
    jest,
    ec2
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
      name: "JavaScript",
      icon: javascript,
    },
   {
      name: "TypeScript",
      icon: typescript,
    },
   
     {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
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
      name: "Jest",
      icon: jest,
    },
   
      {
      name: "Docker",
      icon: docker,
    },
     {
      name: "Aws Ec2",
      icon: ec2,
    },
     {
      name: "git",
      icon: git,
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
      "Developed a Progressive Web Application (PWA) to support medical aid and disaster relief, enabling streamlined donations for individuals affected by COVID-19 with a fast, mobile-friendly experience."
      ],
    },
    {
      title: "Software Engineer",
      company_name: "KonnectzIT, Bangalore",
      icon: connect,
      iconBg: "#E6DEDD",
      date: "November 2021 - April 2022",
      points: [
        "Developed an automation platform leveraging Google Cloud Text-to-Speech, enabling customizable audio output via interactive controls for delay, pitch, volume, and speech rate, reducing manual effort in content narration workflows."
      ],
    },
    {
      title: "Software Developer → Team Lead",
      company_name: "Jireh Software Solutions",
      icon: jireh,
      iconBg: "#ffff",
      date: "Feb 2023 - Mar 2025",
      points: [
        "Developed a healthcare learning platform for B2C and B2B users with course, sales, and event management features supported by dedicated dashboards, applying performance optimizations targeting Core Web Vitals and SEO improvements that reduced page load time by 35%.",
        "Collaborating with cross-functional teams including designers, and other developers to create high-quality products.",
        "Implemented a healthcare chat interface, improving user engagement and support responsiveness.",
        "Deployed and maintained React-based web applications on AWS EC2, configuring scalable infrastructure and load balancing to ensure high availability across production environments.",
        "Led and mentored 3 junior developers, improving collaboration, code quality, and timely delivery of project milestones.",
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
        "Designed and developed data visualization dashboards using advanced charting techniques, introducing new visual formats that accelerated insights delivery for BI developers.",
        "Implemented browser-based voice and video calling functionality integrated with SIP servers to enable real-time communication.",
        "Delivered hybrid mobile applications by serving web views within Android (APK) and iOS builds, ensuring consistent cross-platform functionality.",
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