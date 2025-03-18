import type { Metadata } from "next"
import CursorEffect from "@/app/[...path]/_components/CursorEffect"
import HalftoneWavesBackground from "@/app/[...path]/_components/HalftoneWavesBackground"
import PhotosCarousel from "@/app/[...path]/_components/PhotosCarousel"
import { PhotoGallery } from "./_components/PhotoGallery"

export const metadata: Metadata = {
  title: "Event Photography Gallery",
  description: "Freelance event photography portfolio with interactive elements",
}

export default function Page() {
  return (
      <main className="min-h-screen bg-background relative scroll-smooth">
        <PhotoGallery />
        <HalftoneWavesBackground />
      </main>
  )
}

