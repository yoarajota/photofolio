import type { Metadata } from "next"
import CursorEffect from "@/components/paths/CursorEffect"
import HalftoneWavesBackground from "@/components/paths/HalftoneWavesBackground"
import PhotosCarousel from "@/components/paths/PhotosCarousel"

export const metadata: Metadata = {
  title: "Event Photography Gallery",
  description: "Freelance event photography portfolio with interactive elements",
}

export default function Page() {
  return (
    <main className="min-h-screen bg-background relative scroll-smooth overflow-y-auto cursor-none">
      <CursorEffect />
      <PhotosCarousel />
      <HalftoneWavesBackground />
    </main>
  )
}

