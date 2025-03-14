"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export default function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX - 15}px`
      cursor.style.top = `${e.clientY - 10}px`
    }

    window.addEventListener("mousemove", onMouseMove)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  return (
    <motion.div
      ref={cursorRef}
      className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(4px)",
        transform: "translate(-50%, -50%)",
      }}
    />
  )
}

