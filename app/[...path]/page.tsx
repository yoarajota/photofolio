import type { Metadata } from "next"
import { PhotoGallery } from "@/components/paths/PhotoGallery"
import PhotosHighlight from "@/components/paths/PhotosHighlight"
import CursorEffect from "@/components/paths/CursorEffect"

export const metadata: Metadata = {
  title: "Event Photography Gallery",
  description: "Freelance event photography portfolio with interactive elements",
}

export default function Page() {
  return (
    <main className="min-h-screen bg-background relative scroll-smooth overflow-y-scroll cursor-none">
      <CursorEffect />
      <PhotosHighlight />
      <br />
      <PhotoGallery />
    </main>
  )
}

