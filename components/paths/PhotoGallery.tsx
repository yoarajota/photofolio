"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

// Sample gallery items with only images
const galleryItems = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 7,
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 8,
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: 9,
    image: "/placeholder.svg?height=600&width=600",
  },
]

export function PhotoGallery() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Lock body scroll when an item is selected
  useEffect(() => {
    if (selectedItem !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedItem])

  // Handle item selection
  const handleItemClick = (id: number) => {
    setSelectedItem(id)
  }

  // Close the expanded view
  const handleClose = () => {
    setSelectedItem(null)
  }

  return (
    <div className="relative">
      {/* Gallery Grid - Always 3 columns */}
      <div ref={galleryRef} className="grid grid-cols-3 gap-4">
        {galleryItems.map((item) => (
          <motion.div
            key={item.id}
            data-item-id={item.id}
            layoutId={`item-container-${item.id}`}
            className={`rounded-xl overflow-hidden bg-white shadow-md cursor-pointer
                      transition-shadow hover:shadow-lg ${selectedItem === item.id ? "invisible" : "visible"}`}
            onClick={() => handleItemClick(item.id)}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div layoutId={`item-image-${item.id}`} className="relative aspect-square w-full">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={`Gallery item ${item.id}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 33vw"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Item View */}
      <AnimatePresence>
        {selectedItem !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={handleClose}
            />

            {/* Expanded Item */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId={`item-container-${selectedItem}`}
                className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-lg pointer-events-auto"
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 300,
                }}
              >
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-4 right-4 z-10 bg-black/30 backdrop-blur-md rounded-full p-2 text-white"
                  onClick={handleClose}
                >
                  <X size={20} />
                </motion.button>

                {/* Image Only */}
                <motion.div layoutId={`item-image-${selectedItem}`} className="relative aspect-square w-full">
                  <Image
                    src={galleryItems.find((item) => item.id === selectedItem)?.image || ""}
                    alt={`Gallery item ${selectedItem}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 640px"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

