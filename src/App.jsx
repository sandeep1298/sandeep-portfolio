import { BrowserRouter } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { rocket } from "./assets";
import Footer from "./components/Footer";
import { Tooltip } from "react-tooltip";
import Loader from "./utils/Loader";
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { useGLTF } from "@react-three/drei";
// Lazy loading components
const Contact = lazy(() => import("./components/Contact"));
const Experience = lazy(() => import("./components/Experience"));
const Hero = lazy(() => import("./components/Hero"));
const Navbar = lazy(() => import("./components/Navbar"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars.jsx"));

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useGLTF.preload("./drone/drone_concept-superopt.glb");
  useGLTF.preload("./desktop_pc/wall-e_and_eve-opt.glb");
  
  useEffect(() => {
    setIsLoading(false);
  }, []);

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

  const [showanim, setShowanim] = useState(false);

  const handleBackToTop = () => {
    setShowanim(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isLoading ? <Loader /> : (
        <div className="w-full overflow-hidden">
          <SpeedInsights />
          <BrowserRouter>
            <div className="relative z-0 w-full">
              <div className='bg-cover bg-no-repeat bg-center'>
                <Suspense fallback={<Loader />}>
                  <Navbar />
                  <div className='relative z-0'>
                    <Hero />
                    <StarsCanvas />
                  </div>
                </Suspense>
              </div>
              <div className="mt-12">
                <Suspense fallback={<Loader />}>
                  <Tech />
                  <Experience />
                  <Works />
                </Suspense>
              </div>
              <div className='relative z-0 mb-10'>
                <Suspense fallback={<Loader />}>
                  <Contact />
                  <div className="sm:hidden">
                  <StarsCanvas />
                  </div>
                </Suspense>
              </div>
              <hr className="line_custom" />
              <Suspense fallback={<Loader />}>
                <Footer />
              </Suspense>
            </div>
          </BrowserRouter>
          {showBackToTop && (
            <>
              <button
                className={`fixed bottom-4 right-4 p-2 cursor-pointer backToTop ${showanim ? "backToTopchange" : "backToTop"}`}
                onClick={handleBackToTop}
                data-tooltip-id="scroll-to-top"
                data-tooltip-content="Go To Top"
              >
                <img src={rocket} alt="Back To Top" />
              </button>
              {showanim === false ? <Tooltip id="scroll-to-top" className="tooltip_custom" place="top-end" /> : null}
            </>
          )}
        </div>
      )}

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "w-100",
          duration: 5000,
          style: {
            background: "#ffff",
            color: "black",
          },
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
  );
}

export default App;
