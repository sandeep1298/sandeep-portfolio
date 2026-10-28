import { useCallback, useState } from "react";
import { Tooltip } from "react-tooltip";
import { rocket } from "../../assets";
import { useScrolledPast } from "../../hooks/useScroll";

function RocketButton() {
  // Resets on its own: the button unmounts once the page is back at the top
  const [launching, setLaunching] = useState(false);

  const handleClick = useCallback(() => {
    setLaunching(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Back to top"
        className={`back-to-top fixed bottom-4 right-4 z-20 flex h-12 w-12 items-center justify-center p-2 sm:h-[60px] sm:w-[60px] ${
          launching ? "is-launching" : ""
        }`}
        onClick={handleClick}
        data-tooltip-id="scroll-to-top"
        data-tooltip-content="Go To Top"
      >
        <img src={rocket} alt="" />
      </button>
      {launching ? null : (
        <Tooltip id="scroll-to-top" className="tooltip_custom" place="top-end" />
      )}
    </>
  );
}

/** Render after the page content so the fixed button stacks above the sections. */
export default function BackToTop() {
  const visible = useScrolledPast(500);
  return visible ? <RocketButton /> : null;
}
