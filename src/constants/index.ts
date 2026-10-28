import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import type { Experience, NavLink, Project, SocialLink, Technology } from "../types";
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
  nextjswhite,
  jireh,
  bootstrap,
  tailwind,
  sass,
  sweng,
  connect,
  docker,
  leader,
  jest,
  ec2,
} from "../assets";

// Shown in the Hero typewriter (also update index.html meta + manifest)
export const yearsOfExperience = 4.3;

// Shown as the Hero "Core stack" row; names must match entries in `technologies`
export const coreStack = ["React JS", "NextJS", "TypeScript", "Node JS", "MongoDB"];

export const navLinks: NavLink[] = [
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
  
 
  const technologies: Technology[] = [
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
      darkIcon: nextjswhite,
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
  
  const experiences: Experience[] = [
    {
      title: "Software Intern",
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
        "Built an AI healthcare chat interface with RAG and LangChain, improving user engagement and support efficiency.",
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
        "Built an in-app AI chatbot for Automax 3.0 with RAG and LangChain, giving users instant answers inside the platform.",
        "Designed and developed data visualization dashboards using advanced charting techniques, introducing new visual formats that accelerated insights delivery for BI developers.",
        "Implemented browser-based real-time voice and video calling using SIP and WebSocket integration, enabling seamless communication directly within the product and eliminating the need for third-party tools.",
        "Delivered hybrid mobile applications by serving web views within Android (APK) and iOS builds, ensuring consistent cross-platform functionality.",
      ],
    }
  ];
  

  
  const projects: Project[] = [
    {
      name: "stethUP",
      featured: true,
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
      featured: true,
      description:
        "Automax is a low-code platform that helps organizations automate workflows and incident management to enable faster resolutions, improved collaboration, and scalable operations.",
     
    },
  ];
  
  const socialLinks: SocialLink[] = [
    {
      name: "Email",
      label: "Send an email",
      href: "mailto:sandeepm1298@gmail.com",
      icon: FaEnvelope,
      className: "text-[#EA4335]",
    },
    {
      name: "LinkedIn",
      label: "Visit LinkedIn",
      href: "https://www.linkedin.com/in/sandeep-m-4129ab172/",
      icon: FaLinkedinIn,
      className: "text-[#0072b1]",
    },
    {
      name: "GitHub",
      label: "View GitHub profile",
      href: "https://github.com/sandeep1298",
      icon: FaGithub,
      className: "text-black dark:text-white",
    },
    {
      name: "WhatsApp",
      label: "Chat on WhatsApp",
      href: "https://wa.me/9481068352",
      icon: IoLogoWhatsapp,
      className: "text-[#25d366]",
    },
  ];

  export { technologies, experiences, projects, socialLinks };