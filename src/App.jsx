import { BrowserRouter } from "react-router-dom";

import {  Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import { useState, useEffect } from "react";
import { rocket } from "./assets";
import Footer from "./components/Footer";
import { Tooltip } from "react-tooltip";
import Loader from "./utils/Loader";
import {Toaster} from 'react-hot-toast'

function App() {
  
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false)
  }, []) 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
        
      } else {
        setShowBackToTop(false);
        setShowanim(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [showanim, setShowanim] = useState(false)

  const handleBackToTop = () => {
    setShowanim(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  
  };

  return (
    <>
     {isLoading ? <Loader/>:(
    <div className=" w-full overflow-hidden">
     <BrowserRouter>
        <div className="relative z-0 bg-primary w-full ">
          <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <div className='relative z-0'>
          <Hero />
          <StarsCanvas />
          </div>
        </div>
       <div className="mt-12">
        <Tech />
        <Experience />
        <Works />
       
        </div>
         <div className='relative z-0 mb-10 '>
          <Contact />
          <StarsCanvas />
        </div>  
        <hr className="line_custom"/>
        <Footer />
        </div>
     </BrowserRouter>
     {showBackToTop && (
      <>
        <button
        className={`fixed bottom-4 right-4 p-2  cursor-pointer backToTop ${showanim ? "backToTopchange" : "backToTop"}`}
        
          onClick={handleBackToTop}
          data-tooltip-id="scroll-to-top"
                  data-tooltip-content="Go To Top"
        >
         
          <img src={rocket} />
         
        </button>
        {showanim === false ?
         <Tooltip id="scroll-to-top" className="tooltip_custom" place="top-end" />
         : null
        }
         </>
      )}
      </div>
     )
    }
    <Toaster
        position="top-center"
        reverseOrder={false}
       
        containerClassName=""
       
        toastOptions={{
          // Define default options
          className: "w-100",
          duration: 5000,
          style: {
            background: "#ffff",
            color: "black",
         
        },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 3000,
            theme: {
              primary: "red",
              secondary: "blue",
            },
          },
        }}
      />
    </>
  )
}

export default App
