// "use client"

// import { useRef, useState } from "react"
// import Image from "next/image"
// import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react"

// const highlightImages = [
//   {
//     id: 1,
//     src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
//     alt: "Portrait of a woman",
//     direction: "left" as const,
//   },
//   {
//     id: 2,
//     src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
//     alt: "Artistic portrait",
//     direction: "right" as const,
//   },
//   {
//     id: 3,
//     src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80",
//     alt: "Creative portrait",
//     direction: "left" as const,
//   }
// ]

// export default function PhotosHighlight() {

//   return (
//       {/* Intro section */}
//       <div className="h-screen w-full flex items-center justify-center relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: "easeOut" }}
//           className="text-center px-4"
//         >
//           <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 mb-6">
//             Photo Gallery
//           </h1>
//           <p className="text-white/70 text-xl max-w-2xl mx-auto mb-12">
//             Scroll down to explore our collection of stunning photographs
//           </p>
//           <motion.div
//             animate={{ y: [0, 10, 0] }}
//             transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
//             className="text-white/50"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M12 5v14M5 12l7 7 7-7" />
//             </svg>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Photo sections */}
//       {highlightImages.map((image) => (
//         <HighlightImage key={image.id} image={image} />
//       ))}

//       {/* Footer section */}
//       <div className="h-screen w-full flex items-center justify-center relative z-10">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//           viewport={{ once: true, amount: 0.3 }}
//           className="text-center px-4"
//         >
//           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Thank you for viewing</h2>
//           <p className="text-white/70 text-lg max-w-xl mx-auto">
//             The perfect blend of interactive waves and stunning photography
//           </p>
//         </motion.div>
//       </div>
//   )
// }

// interface HighlightImageProps {
//   image: {
//     id: number
//     src: string
//     alt: string
//     direction: "left" | "right"
//   }
// }

// function HighlightImage({ image, containerRef }: HighlightImageProps) {
//   const imageRef = useRef(null)
//   const isInView = useInView(containerRef, { once: false, amount: 0.3 })

//   // Parallax effect for the image
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   })

//   const y = useTransform(scrollYProgress, [0, 1], [100, -100])
//   const springY = useSpring(y, { stiffness: 100, damping: 30 })

//   return (
//     <div ref={containerRef} className="h-screen w-full flex items-center justify-center relative z-10 overflow-hidden">
//       <div
//         className={`w-full max-w-5xl mx-auto px-4 flex ${image.direction === "left" ? "justify-start" : "justify-end"}`}
//       >
//         <motion.div
//           ref={imageRef}
//           initial={{
//             x: image.direction === "left" ? -100 : 100,
//             opacity: 0,
//           }}
//           animate={
//             isInView
//               ? {
//                   x: 0,
//                   opacity: 1,
//                 }
//               : {}
//           }
//           transition={{
//             duration: 1,
//             ease: [0.22, 1, 0.36, 1],
//           }}
//           className="w-full max-w-md 2xl:max-w-2xl relative"
//         >
//           <div className="aspect-[2/3] 2xl:aspect-[3/2] relative rounded-2xl overflow-hidden">
//             {/* Glow effect */}
//             <div className="absolute inset-0 z-20 mix-blend-overlay bg-gradient-to-tr from-purple-500/30 via-transparent to-cyan-500/30" />

//             {/* Image with parallax */}
//             <motion.div className="absolute z-30 inset-0 w-full h-full" style={{ y: springY }}>
//               <Image
//                 src={image.src || "/placeholder.svg?height=1200&width=800"}
//                 alt={image.alt}
//                 fill
//                 sizes="(max-width: 768px) 100vw, 800px"
//                 className="object-cover"
//                 priority
//               />
//             </motion.div>

//             {/* Halftone overlay */}
//             <div className="absolute inset-0 z-10 mix-blend-overlay opacity-30 pointer-events-none">
//               <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//                 <pattern
//                   id={`halftone-pattern-${image.id}`}
//                   x="0"
//                   y="0"
//                   width="8"
//                   height="8"
//                   patternUnits="userSpaceOnUse"
//                 >
//                   <circle cx="4" cy="4" r="1.5" fill="white" />
//                 </pattern>
//                 <rect x="0" y="0" width="100%" height="100%" fill={`url(#halftone-pattern-${image.id})`} />
//               </svg>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

