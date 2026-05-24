import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense, memo, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Loader from "./utils/Loader";
import {
  ScrollChromeProvider,
  ScrollChromeNavbar,
  ScrollChromeBackToTop,
} from "./components/ScrollChrome";

const Contact = lazy(() => import("./components/Contact"));
const Experience = lazy(() => import("./components/Experience"));
const Hero = lazy(() => import("./components/Hero"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));

const Toaster = lazy(() =>
  import("react-hot-toast").then((module) => ({ default: module.Toaster })),
);

const SpeedInsights = lazy(() =>
  import("@vercel/speed-insights/react").then((module) => ({
    default: module.SpeedInsights,
  })),
);

const MainContent = memo(function MainContent() {
  return (
    <div className="relative z-0 w-full">
      <div className="bg-cover bg-no-repeat bg-center">
        <Suspense fallback={<Loader />}>
          <Hero />
        </Suspense>
      </div>

      <div className="mt-12">
        <Suspense fallback={<Loader />}>
          <Tech />
        </Suspense>
        <Suspense fallback={null}>
          <Experience />
          <Works />
        </Suspense>
      </div>

      <div className="relative z-0 mb-10">
        <Suspense fallback={<Loader />}>
          <Contact />
        </Suspense>
      </div>

      <hr className="line_custom" />
      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </div>
  );
});

function App() {
  const [isBootstrapped, setIsBootstrapped] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Preload the first screen chunk so Navbar/ThemeButton don't show over Loader
    Promise.all([import("./components/Hero")]).finally(() => {
      if (!cancelled) {
        setIsBootstrapped(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!isBootstrapped) {
    return <Loader />;
  }

  return (
    <div className="w-full overflow-hidden">
      <Suspense fallback={null}>
        <SpeedInsights />
      </Suspense>
      <ScrollChromeProvider>
        <BrowserRouter>
          <ScrollChromeNavbar />
          <MainContent />
          <ScrollChromeBackToTop />
        </BrowserRouter>
      </ScrollChromeProvider>
      <Suspense fallback={null}>
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
      </Suspense>
    </div>
  );
}

export default App;
