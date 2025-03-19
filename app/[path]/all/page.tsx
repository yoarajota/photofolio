import type { Metadata } from "next"
import HalftoneWavesBackground from "@/app/[path]/_components/HalftoneWavesBackground"
import { PhotoGallery } from "../_components/PhotoGallery"

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

