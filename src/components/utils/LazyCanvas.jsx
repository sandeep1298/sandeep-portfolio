// LazyCanvas.jsx
import { useEffect, useRef, useState } from "react";

export default function LazyCanvas({ children, height = "500px" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        height,      // <-- FIXED HEIGHT = Canvas gets correct layout
        width: "100%",
      }}
    >
      {visible ? children : null}
    </div>
  );
}
