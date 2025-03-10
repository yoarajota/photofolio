import type { Metadata } from "next"
import { PhotoGallery } from "@/components/paths/PhotoGallery"

export const metadata: Metadata = {
  title: "Event Photography Gallery",
  description: "Freelance event photography portfolio with interactive elements",
}

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8 md:py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4 text-center">Event Photography</h1>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          A collection of moments captured during various events. Move your cursor over the images to interact with
          them.
        </p>

        <PhotoGallery />
      </div>
    </main>
  )
}

