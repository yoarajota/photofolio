"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

// Sample highlight images - replace with your actual images
const highlightImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Highlight image 1",
    direction: "left" as const,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Highlight image 2",
    direction: "right" as const,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Highlight image 3",
    direction: "left" as const,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Highlight image 4",
    direction: "right" as const,
  },
]

export default function PhotosHighlight() {
  return (
    <div className="w-full">
      {highlightImages.map((image) => (
        <HighlightImage key={image.id} image={image} />
      ))}
    </div>
  )
}

interface HighlightImageProps {
  image: {
    id: number
    src: string
    alt: string
    direction: "left" | "right"
  }
}

function HighlightImage({ image }: HighlightImageProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
    margin: "0px 0px -10% 0px",
  })

  const variants = {
    hidden: {
      x: image.direction === "left" ? -100 : 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth entry
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className="w-full h-screen relative"
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
    </motion.div>
  )
}

