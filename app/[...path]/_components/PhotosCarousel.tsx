"use client"

import { useState, useRef, useMemo } from "react"
import { motion, AnimatePresence, useAnimate } from "framer-motion" // Updated import
import Image from "next/image"
import { Dot, MoveRight } from "lucide-react"

const previewSize = 48
interface CarouselImage {
  id: number
  src: string
  alt: string
}

const images: CarouselImage[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&h=600&fit=crop&q=80", alt: "Image 1" },
  { id: 2, src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&h=600&fit=crop&q=80", alt: "Image 2" },
  { id: 3, src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&h=600&fit=crop&q=80", alt: "Image 3" },
  { id: 4, src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&h=600&fit=crop&q=80", alt: "Image 4" },
  { id: 5, src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&h=600&fit=crop&q=80", alt: "Image 5" },
  { id: 6, src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&h=600&fit=crop&q=80", alt: "Image 6" },
  { id: 7, src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&h=600&fit=crop&q=80", alt: "Image 7" },
  { id: 7, src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&h=600&fit=crop&q=80", alt: "Image 7" },
  { id: 7, src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&h=600&fit=crop&q=80", alt: "Image 7" },
  { id: 7, src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&h=600&fit=crop&q=80", alt: "Image 7" },
  { id: 7, src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&h=600&fit=crop&q=80", alt: "Image 7" },
  { id: 7, src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&h=600&fit=crop&q=80", alt: "Image 7" },
  { id: 7, src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&h=600&fit=crop&q=80", alt: "Image 7" },
  { id: 7, src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&h=600&fit=crop&q=80", alt: "Image 7" },
  { id: 7, src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&h=600&fit=crop&q=80", alt: "Image 7" },
]

export default function CarouselWithSelector({ children }: { children?: React.ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const wrappper = useRef<HTMLDivElement>(null)
  const [miniaturesWrapper, animateMiniaturesWrapper] = useAnimate()
  const [scrollPosition, setScrollPosition] = useState(-24)

  const getMaxScroll = () => {
    if (!miniaturesWrapper.current) {
      return 0
    }

    return -(miniaturesWrapper.current.scrollHeight - previewSize / 2)
  }

  const imagesMap = useMemo(() => {
    // should store the position of the most hight part of the item and the most low part of the item
    const imagesMap = new Map<number, { top: number, bottom: number }>()
    let top = -previewSize
    let bottom = 0

    images.forEach((_, index) => {
      imagesMap.set(index, { top, bottom })

      top -= previewSize
      bottom -= previewSize
    })

    return imagesMap
  }, [images])

  const handleWheel = async (event: React.WheelEvent) => {
    const miniaturesContainer = miniaturesWrapper.current
    const wrapperContainer = wrappper.current

    if (!miniaturesContainer || !wrapperContainer) {
      return
    }

    const scrollAmount = event.deltaY * 0.3
    
    const minScroll = -previewSize / 2
    const maxScroll = getMaxScroll()

    console.log(minScroll, maxScroll)

    let newPosition

    const sum = scrollPosition + scrollAmount

    if (Math.abs(sum) > Math.abs(maxScroll)) {
      newPosition = maxScroll
    } else if (Math.abs(minScroll) > Math.abs(sum)) {
      newPosition = minScroll
    } else {
      newPosition = sum
    }

    if (newPosition === scrollPosition || newPosition > 0) { 
      return
    }

    setScrollPosition(newPosition)
    
    // with the map, set the selected image
    // iterate the map
    // if the current image is in the range of the current scroll position
    // set the current image as the active image
    // and break the loop
    let activeIndex = 0
    console.log(imagesMap, newPosition)
    imagesMap.forEach((position, index) => {
      if (newPosition >= position.top && newPosition <= position.bottom) {
        activeIndex = index
      }
    })

    setActiveIndex(activeIndex)

    await animateMiniaturesWrapper(
      miniaturesContainer,
      { y: newPosition },
      { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1
      }
    )
  }

  return (
    <div
      className={`h-screen w-screen ${activeIndex === images.length-1 ? 'overflow-y-scroll' : 'overflow-hidden'}`}
      onWheel={handleWheel}
    >
      <div 
        ref={wrappper}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="relative flex gap-8">
          <div className="flex-shrink-0 flex">
            <MoveRight 
              className="absolute top-1/2 -translate-y-1/2 -left-16"
              size={24}
            />
   
            <Dot 
              className="absolute top-1/2 -translate-y-1/2 left-3"
              size={24}
            />

            <motion.div 
              ref={miniaturesWrapper}
              className={`flex flex-col absolute top-1/2 -translate-y-6 -left-8`}
            >
              {images.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-12 h-12 border-2 cursor-pointer border-collapse ${index ? '-mt-[1px]' : ''}`}
                  initial={{ opacity: index === activeIndex ? 1 : 0.3 }}
                  animate={{
                    opacity: index === activeIndex ? 1 : 0.6,
                    scale: index === activeIndex ? 1.05 : 1,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    opacity: { duration: 0.3 },
                    scale: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </motion.div>
          </div>

          <div
            className="flex-1 overflow-hidden rounded-lg"
          >
            <div
              className="w-full h-[600px] relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="w-full h-full absolute"
                >
                  <Image
                    src={images[activeIndex].src}
                    alt={images[activeIndex].alt}
                    fill
                    className="object-cover"
                    priority={activeIndex === 0}
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}