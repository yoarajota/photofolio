"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "motion/react";

const transition = {
  duration: 0.4,
  ease: [0, 0.71, 0.2, 1.01],
};

export default function CursorEffect() {
  const cursorRef = useRef(null);
  const controls = useAnimation();
  const [hasMoved, setHasMoved] = useState(false);

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
          opacity: 1,
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
    }

    const onMouseOver = (e: MouseEvent) => {
      if (isPressable(e.target as HTMLElement)) {
        controls.start({
          opacity: 0.5,
          transition,
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if (isPressable(e.target as HTMLElement)) {
        controls.start({
          opacity: 1,
          transition,
        });
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
      initial={{ opacity: 0, scale: 0.5, left: 0, top: 0 }}
      animate={controls}
      style={{
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(4px)",
        position: "absolute",
      }}
    />
  );
}
