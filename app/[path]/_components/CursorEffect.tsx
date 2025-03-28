"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useSpring } from "motion/react";

const SVGFull = ({ color }: { color: string}) => {
  return (
    <g
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M87.5 -21.8C101.4 14.4 92.4 64.6 64.8 83.3C37.3 101.9 -8.9 88.9 -46.6 62C-84.3 35.1 -113.5 -5.6 -104.3 -35.3C-95.1 -64.9 -47.6 -83.5 -5.4 -81.7C36.8 -79.9 73.5 -57.9 87.5 -21.8"
        fill={color}
      />
    </g>
  );
}

const SVGOutlined = ({ color }: { color: string}) => {
  return (
    <g
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M87.5 -21.8C101.4 14.4 92.4 64.6 64.8 83.3C37.3 101.9 -8.9 88.9 -46.6 62C-84.3 35.1 -113.5 -5.6 -104.3 -35.3C-95.1 -64.9 -47.6 -83.5 -5.4 -81.7C36.8 -79.9 73.5 -57.9 87.5 -21.8"
        fill="none"
        stroke={color}
        strokeWidth="6"
      />
    </g>
  );
}

export default function CursorEffect() {
  const cursorRef = useRef(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const scale = useSpring(0, { stiffness: 300, damping: 20 });

  const isPressable = useCallback((element: HTMLElement) => {
    return (
      element.style.cursor === "pointer" ||
      element.classList.contains("cursor-pointer") ||
      element.tagName === "A" ||
      element.tagName === "BUTTON"
    );
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX - 15, y: e.clientY - 10 });

      if (!hasMoved) {
        scale.set(1);
        setHasMoved(true);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      if (isPressable(e.target as HTMLElement)) {
        setIsHovering(true);
        scale.set(1.2);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if (isPressable(e.target as HTMLElement)) {
        setIsHovering(false);
        scale.set(1);
      }
    };

    const onOutOfDocument = () => {
      scale.set(0);
      setHasMoved(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseleave", onOutOfDocument);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseleave", onOutOfDocument);
    };
  }, [scale, hasMoved, isPressable]);

  return (
    <motion.div
      ref={cursorRef}
      className="w-8 h-8 fixed rounded-full pointer-events-none z-50 mix-blend-difference cursor-none"
      style={{
        left: position.x,
        top: position.y,
        scale,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="-120 -120 240 240"
      >
        {isHovering ? (
          <SVGOutlined color={"#BB004B"} />
        ) : (
          <SVGFull color={"#BB004B"} />
        )}
      </svg>
    </motion.div>
  );
}
