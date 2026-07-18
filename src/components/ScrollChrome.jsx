import { createContext, useContext } from "react";
import { rocket } from "../assets";
import Navbar from "./Navbar";
import { Tooltip } from "react-tooltip";
import { useScrollChrome } from "../hooks/useScrollChrome";

const ScrollChromeContext = createContext(null);

export function ScrollChromeProvider({ children }) {
  const scrollChrome = useScrollChrome();

  return (
    <ScrollChromeContext.Provider value={scrollChrome}>
      {children}
    </ScrollChromeContext.Provider>
  );
}

export function ScrollChromeNavbar() {
  const scrollChrome = useContext(ScrollChromeContext);
  if (!scrollChrome) return null;

  return <Navbar scrolled={scrollChrome.navbarScrolled} />;
}

/** Render after main page content so the fixed button stacks above sections. */
export function ScrollChromeBackToTop() {
  const scrollChrome = useContext(ScrollChromeContext);
  if (!scrollChrome) return null;

  const { showBackToTop, showanim, handleBackToTop } = scrollChrome;

  if (!showBackToTop) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        aria-label="Back to top"
        className={`fixed bottom-4 right-4 p-2 cursor-pointer backToTop ${showanim ? "backToTopchange" : "backToTop"}`}
        onClick={handleBackToTop}
        data-tooltip-id="scroll-to-top"
        data-tooltip-content="Go To Top"
      >
        <img src={rocket} alt="Back To Top" loading="lazy" />
      </button>
      {showanim === false ? (
        <Tooltip
          id="scroll-to-top"
          className="tooltip_custom"
          place="top-end"
        />
      ) : null}
    </>
  );
}
