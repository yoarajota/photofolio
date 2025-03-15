"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"
import { Image, Html } from "@react-three/drei"
import { motion } from "framer-motion"
import type * as THREE from "three"

const images = [
  {
    url: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=60&h=60&fit=crop&q=80",
    title: "Neon Camera",
  },
  {
    url: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1552168324-d612d77725e3?h=60&w=60&fit=crop&q=80",
    title: "Image 2",
  },
  {
    url: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1552168324-d612d77725e3?h=60&w=60&fit=crop&q=80",
    title: "Image 3",
  },
  {
    url: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1552168324-d612d77725e3?h=60&w=60&fit=crop&q=80",
    title: "Image 4",
  },
  {
    url: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1552168324-d612d77725e3?h=60&w=60&fit=crop&q=80",
    title: "Image 5",
  },
]

// Types for better type safety
interface ImageData {
  url: string
  thumbnail: string
  title: string
}

interface CarouselImagesProps {
  images: ImageData[]
  activeIndex: number
  imagesToPreload: number[]
}

interface AnimatedImageProps {
  url: string
  index: number
  activeIndex: number
  total: number
}

interface ImagePlaceholderProps {
  width: number
  height: number
}

export default function PhotosCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [loadedThumbnails, setLoadedThumbnails] = useState<Record<number, boolean>>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const transitionTime = 800 // ms

  // Preload the active image and adjacent images for better performance
  const imagesToPreload = [
    activeIndex,
    (activeIndex + 1) % images.length,
    (activeIndex - 1 + images.length) % images.length,
  ]

  // Handle slide change with debounce to prevent rapid transitions
  const changeSlide = (newIndex: number) => {
    if (newIndex !== activeIndex && !isTransitioning) {
      setIsTransitioning(true)
      setActiveIndex(newIndex)
      setTimeout(() => setIsTransitioning(false), transitionTime)
    }
  }

  const handleThumbnailClick = (index: number) => {
    changeSlide(index)
  }

  const handleThumbnailLoad = (index: number) => {
    setLoadedThumbnails((prev) => ({
      ...prev,
      [index]: true,
    }))
  }

  // Handle scroll wheel navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return
      e.preventDefault()

      // Determine scroll direction
      if (e.deltaY > 0) {
        // Scrolling down - next slide
        changeSlide((activeIndex + 1) % images.length)
      } else if (e.deltaY < 0) {
        // Scrolling up - previous slide
        changeSlide((activeIndex - 1 + images.length) % images.length)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [activeIndex, isTransitioning])

  return (
    <div ref={containerRef} className="relative flex h-screen w-full bg-transparent">
      {/* Thumbnails sidebar */}
      <ThumbnailSidebar
        images={images}
        activeIndex={activeIndex}
        loadedThumbnails={loadedThumbnails}
        onThumbnailClick={handleThumbnailClick}
        onThumbnailLoad={handleThumbnailLoad}
      />

      {/* Main 3D canvas */}
      <div className="h-full w-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 0 }}>
          <color attach="background" args={["#000"]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} color="#0ff" intensity={5} />
          <pointLight position={[10, -10, -10]} color="#f00" intensity={5} />
          <Suspense fallback={<LoadingFallback />}>
            <CarouselImages images={images} activeIndex={activeIndex} imagesToPreload={imagesToPreload} />
          </Suspense>
        </Canvas>
      </div>

      {/* Image title */}
      <ImageTitle title={images[activeIndex].title} />
    </div>
  )
}

// Extracted thumbnail sidebar component
function ThumbnailSidebar({
  images,
  activeIndex,
  loadedThumbnails,
  onThumbnailClick,
  onThumbnailLoad,
}: {
  images: ImageData[]
  activeIndex: number
  loadedThumbnails: Record<number, boolean>
  onThumbnailClick: (index: number) => void
  onThumbnailLoad: (index: number) => void
}) {
  return (
    <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 space-y-3">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className={`cursor-pointer overflow-hidden rounded-full border transition-all ${
            activeIndex === index
              ? "border-primary ring-1 ring-primary shadow-lg scale-110"
              : "border-transparent opacity-70"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onThumbnailClick(index)}
        >
          <div className="h-6 w-6 relative">
            {/* Placeholder while thumbnail loads */}
            {!loadedThumbnails[index] && <div className="absolute inset-0 bg-gray-800 animate-pulse" />}
            <img
              src={image.thumbnail || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
              onLoad={() => onThumbnailLoad(index)}
              style={{ opacity: loadedThumbnails[index] ? 1 : 0 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Extracted image title component
function ImageTitle({ title }: { title: string }) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
      <motion.h2
        key={title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-2xl font-bold text-white"
      >
        {title}
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} className="mt-2 text-sm text-gray-400">
        Scroll to navigate
      </motion.p>
    </div>
  )
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="h-16 w-16 rounded-full border-4 border-t-transparent border-primary animate-spin" />
      </div>
    </Html>
  )
}

function CarouselImages({ images, activeIndex, imagesToPreload }: CarouselImagesProps) {
  return (
    <group>
      {images.map(
        (image, index) =>
          imagesToPreload.includes(index) && (
            <AnimatedImage key={index} url={image.url} index={index} activeIndex={activeIndex} total={images.length} />
          ),
      )}
    </group>
  )
}

function AnimatedImage({ url, index, activeIndex, total }: AnimatedImageProps) {
  const { viewport } = useThree()
  const imageRef = useRef<THREE.Mesh>(null)
  const [loaded, setLoaded] = useState(false)

  // Calculate the target position based on the active index
  const getTargetPosition = () => {
    if (index === activeIndex) {
      return [0, 0, 0] // Center position
    }

    const diff = index - activeIndex

    // Handle wrapping for carousel effect
    let adjustedDiff = diff
    if (diff > total / 2) adjustedDiff = diff - total
    if (diff < -total / 2) adjustedDiff = diff + total

    return [adjustedDiff * 5, 0, -3] // Offset to the side and back
  }

  // Spring animation for position
  const { position, scale, rotation, opacity } = useSpring({
    position: getTargetPosition(),
    scale: index === activeIndex ? [1.5, 1.5, 1] : [0.7, 0.7, 1],
    rotation: index === activeIndex ? [0, 0, 0] : [0, -0.3 * Math.sign(index - activeIndex), 0],
    opacity: loaded ? (index === activeIndex ? 1 : 0.5) : 0,
    config: { mass: 1, tension: 170, friction: 26 },
  })

  // Add subtle floating animation to the active image
  useFrame(({ clock }) => {
    if (index === activeIndex && imageRef.current) {
      // Subtle floating effect
      imageRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.05
      imageRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.02
    }
  })

  // Adjust aspect ratio based on viewport
  const aspectRatio = viewport.width / viewport.height
  const imageWidth = 3
  const imageHeight = imageWidth / aspectRatio

  return (
    <animated.group position={position} scale={scale} rotation={rotation}>
      <animated.mesh ref={imageRef} opacity={opacity}>
        <Suspense fallback={<ImagePlaceholder width={imageWidth} height={imageHeight} />}>
          <Image
            url={url}
            transparent
            opacity={opacity}
            scale={[imageWidth, imageHeight, 1]}
            onLoad={() => setLoaded(true)}
          />
        </Suspense>
      </animated.mesh>
    </animated.group>
  )
}

function ImagePlaceholder({ width, height }: ImagePlaceholderProps) {
  return (
    <mesh scale={[width, height, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="#222" transparent opacity={0.5} />
    </mesh>
  )
}

