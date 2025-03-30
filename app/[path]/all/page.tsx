import type { Metadata } from "next";
import CursorEffect from "@/app/[path]/_components/CursorEffect";
import HalftoneWavesBackground from "@/app/[path]/_components/HalftoneWavesBackground";
import PhotoGallery from "@/app/[path]/_components/PhotoGallery";

export const metadata: Metadata = {
  title: "Event Photography Gallery",
  description:
    "Freelance event photography portfolio with interactive elements",
};

export default function Page() {
  return (
    <main className="relative min-h-screen has-cursor-effect">
      <CursorEffect />
      
      <HalftoneWavesBackground>
        <PhotoGallery />
      </HalftoneWavesBackground>
    </main>
  );
}
