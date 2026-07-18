import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo } from "../assets";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeButton from "./utils/ThemeButton";

const Navbar = ({ scrolled }) => {

  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav
    aria-label="Primary navigation"
    className={`${
      styles.paddingX
    } w-full flex items-center py-5 fixed top-0 z-20  ${
      scrolled ? "bg-white dark:bg-black" : "bg-transparent"
    }`}
  >
    <div className='w-full flex justify-between items-center max-w-8xl mx-auto'>
      <Link
        to='/'
        className='flex items-center gap-2'
        onClick={() => {
          setActive("");
          window.scrollTo(0, 0);
        }}
      >
        <img src={logo} alt='Sandeep M logo' className='w-15 h-12 object-contain' loading="eager" />
        <p className='text-black  dark:text-white text-[18px] font-bold cursor-pointer flex sm:hidden'>
          Sandeep &nbsp;
          <span className='sm:block hidden'> | Software Developer</span>
        </p>
      </Link>

    <ul className="list-none sm:hidden flex items-center flex-row gap-10">
    <ThemeButton/>

  {/* <Tooltip id="icons" className="tooltip_custom_tech" /> */}

  {navLinks.map((nav) => (
    <li
      key={nav.id}
      className={`${
        active === nav.title ? "text-black dark:text-white" : "text-black dark:text-white"
      } hover:text-text2 dark:hover:text-secondary text-[18px] font-medium cursor-pointer`}
      onClick={() => setActive(nav.title)}
    >
      <a href={`#${nav.id}`}>{nav.title}</a>
    </li>
  ))}
</ul>

      <div className='sm:flex flex flex-1 gap-6 justify-end lg:hidden xl:hidden md:hidden items-center'>
       <ThemeButton/>
        <button
    type="button"
    aria-label={toggle ? "Close navigation menu" : "Open navigation menu"}
    aria-expanded={toggle}
    onClick={() => setToggle(!toggle)}
    className="p-2 rounded-full transition-colors duration-300 
               bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700"
  >
    {toggle ? (
      <FaTimes size={22} className="text-black dark:text-white" />
    ) : (
      <FaBars size={22} className="text-black dark:text-white" />
    )}
  </button>
       <div
    className={`${
      !toggle ? "hidden" : "flex"
    } p-6 absolute top-20 right-0 mx-4 my-2 min-w-[160px] z-10 rounded-xl 
       bg-white dark:bg-[#1a1a1a] shadow-lg transition-colors duration-300`}
  >
    <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
      {navLinks.map((nav) => (
        <li
          key={nav.id}
          className={`font-poppins font-medium cursor-pointer text-[16px] 
            ${
              active === nav.title
                ? "text-primary dark:text-white"
                : "text-gray-800 dark:text-gray-300"
            } hover:text-text2 dark:hover:text-secondary transition-colors duration-200`}
          onClick={() => {
            setToggle(!toggle);
            setActive(nav.title);
          }}
        >
          <a href={`#${nav.id}`}>{nav.title}</a>
        </li>
      ))}
    </ul>
  </div>
      </div>
    </div>
  </nav>
  )
}

Navbar.displayName = "Navbar";

export default React.memo(Navbar);
