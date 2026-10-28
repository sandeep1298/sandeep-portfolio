import { lazy, Suspense, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/layout/BackToTop";
import Hero from "./components/sections/Hero";
import StarsBackground from "./components/canvas/StarsBackground";
import PageLoader from "./components/ui/PageLoader";
import { preloadPortfolioAssets } from "./utils/preloadSceneAssets";

// Below-the-fold sections load as separate chunks
const Tech = lazy(() => import("./components/sections/Tech"));
const Experience = lazy(() => import("./components/sections/Experience"));
const Works = lazy(() => import("./components/sections/Works"));
const Contact = lazy(() => import("./components/sections/Contact"));

const Toaster = lazy(() =>
  import("react-hot-toast").then((module) => ({ default: module.Toaster })),
);

const SpeedInsights = lazy(() =>
  import("@vercel/speed-insights/react").then((module) => ({
    default: module.SpeedInsights,
  })),
);

const TOAST_OPTIONS = {
  duration: 5000,
  style: {
    background: "#ffff",
    color: "black",
  },
  success: {
    duration: 3000,
    iconTheme: { primary: "green", secondary: "white" },
  },
  error: {
    duration: 3000,
    iconTheme: { primary: "red", secondary: "white" },
  },
};

function App() {
  useEffect(() => preloadPortfolioAssets(), []);

  return (
    // reducedMotion="user": framer animations honour the OS "reduce motion" setting
    <MotionConfig reducedMotion="user">
      <div className="relative w-full overflow-x-clip">
        <StarsBackground />
        <Navbar />

        <main className="relative z-0 w-full">
          <Hero />
          {/* One boundary so the sections appear together and anchor links land correctly */}
          <Suspense fallback={<PageLoader />}>
            <div className="mt-12">
              <Tech />
              <Experience />
              <Works />
            </div>
            <div className="relative z-0 mb-10">
              <Contact />
            </div>
          </Suspense>
        </main>

        <Footer />
        <BackToTop />

        <Suspense fallback={null}>
          <Toaster position="top-center" toastOptions={TOAST_OPTIONS} />
          <SpeedInsights />
        </Suspense>
      </div>
    </MotionConfig>
  );
}

export default App;
