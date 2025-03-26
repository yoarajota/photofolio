"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "motion/react";

const transition = {
  duration: 0.4,
  ease: [0, 0.71, 0.2, 1.01],
};


// #FF0066;
// #BB004B;

const SVGFull = () => {
  return (
    <g
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M87.5 -21.8C101.4 14.4 92.4 64.6 64.8 83.3C37.3 101.9 -8.9 88.9 -46.6 62C-84.3 35.1 -113.5 -5.6 -104.3 -35.3C-95.1 -64.9 -47.6 -83.5 -5.4 -81.7C36.8 -79.9 73.5 -57.9 87.5 -21.8"
        fill="#BB004B"
      />
    </g>
  );
}

const SVGOutlined = () => {
  return (
    <g
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M87.5 -21.8C101.4 14.4 92.4 64.6 64.8 83.3C37.3 101.9 -8.9 88.9 -46.6 62C-84.3 35.1 -113.5 -5.6 -104.3 -35.3C-95.1 -64.9 -47.6 -83.5 -5.4 -81.7C36.8 -79.9 73.5 -57.9 87.5 -21.8"
        fill="none"
        stroke="#BB004B"
        strokeWidth="6"
      />
    </g>
  );
}

export default function CursorEffect() {
  const cursorRef = useRef(null);
  const controls = useAnimation();
  const [hasMoved, setHasMoved] = useState(false);
  const [isHovering, setIsHovering] = useState(false); // New state for hover

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        controls.set({
          left: e.clientX - 15,
          top: e.clientY - 10,
        });

        controls.start({
          scale: 1,
          transition,
        });
        setHasMoved(true);
      } else {
        controls.start({
          left: e.clientX - 15,
          top: e.clientY - 10,
          transition: { duration: 0 },
        });
      }
    };

    const isPressable = (element: HTMLElement) => {
      return (
        element.style.cursor === "pointer" ||
        element.classList.contains("cursor-pointer") ||
        element.tagName === "A" ||
        element.tagName === "BUTTON"
      );
    };

    const onMouseOver = (e: MouseEvent) => {
      if (isPressable(e.target as HTMLElement)) {
        setIsHovering(true); 
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if (isPressable(e.target as HTMLElement)) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, [controls, hasMoved]);

  return (
    <motion.div
      ref={cursorRef}
      className="w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference cursor-none"
      initial={{ left: 0, top: 0 }}
      animate={controls}
      style={{
        position: "absolute",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
      >
        {isHovering ? <SVGOutlined /> : <SVGFull />}
      </svg>
    </motion.div>
  );
}
