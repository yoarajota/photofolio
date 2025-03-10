"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useMotionValue, useTransform } from "framer-motion"

// Sample event photos - replace with actual photos
const eventPhotos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Corporate event",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Wedding celebration",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Birthday party",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Music festival",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Fashion show",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Product launch",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Graduation ceremony",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Sports event",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Conference",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Charity gala",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Art exhibition",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    alt: "Food festival",
  },
]

export function PhotoGallery() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {eventPhotos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} cursorPosition={cursorPosition} />
      ))}
    </div>
  )
}

interface PhotoCardProps {
  photo: {
    id: number
    src: string
    alt: string
  }
  cursorPosition: { x: number; y: number }
}

function PhotoCard({ photo, cursorPosition }: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0, width: 0, height: 0 })

  // Calculate distance between cursor and card center
  const distanceFromCursor = useMotionValue(1000)

  // Transform values based on cursor proximity
  const scale = useTransform(distanceFromCursor, [0, 300], [1.05, 1])
  const brightness = useTransform(distanceFromCursor, [0, 300], [1.2, 1])

  // Update card position on resize
  useEffect(() => {
    if (!cardRef.current) return

    const updateCardPosition = () => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (rect) {
        setCardPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        })
      }
    }

    updateCardPosition()
    window.addEventListener("resize", updateCardPosition)
    window.addEventListener("scroll", updateCardPosition)

    return () => {
      window.removeEventListener("resize", updateCardPosition)
      window.removeEventListener("scroll", updateCardPosition)
    }
  }, [isInView])

  // Calculate distance from cursor to card center
  useEffect(() => {
    if (!isInView) return

    const dx = cursorPosition.x - cardPosition.x
    const dy = cursorPosition.y - cardPosition.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    distanceFromCursor.set(distance)
  }, [cursorPosition, cardPosition, isInView, distanceFromCursor])

  // Intersection observer for lazy loading
  useEffect(() => {
    if (!cardRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "200px",
      },
    )

    observer.observe(cardRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Calculate rotation based on cursor position relative to card center
  const rotateXValue = useTransform(distanceFromCursor, [0, 300], [(cursorPosition.y - cardPosition.y) / 15, 0])
  const rotateYValue = useTransform(distanceFromCursor, [0, 300], [-(cursorPosition.x - cardPosition.x) / 15, 0])

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale: isInView ? scale : 1,
        filter: `brightness(${isInView ? brightness.get() : 1})`,
        rotateX: isInView ? rotateXValue : 0,
        rotateY: isInView ? rotateYValue : 0,
        transformPerspective: 1000,
      }}
      whileHover={{ z: 10 }}
      className="relative aspect-[4/3] overflow-hidden rounded-lg"
    >
      {isInView && (
        <>
          <div
            className={`absolute inset-0 bg-slate-200 ${isLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-300 z-10`}
          />
          <Image
            src={photo.src || "/placeholder.svg"}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-300"
            onLoadingComplete={() => setIsLoaded(true)}
            loading="lazy"
          />
        </>
      )}
    </motion.div>
  )
}

