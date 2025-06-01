import type { Metadata } from "next";
import CursorEffect from "@/app/[path]/_components/CursorEffect";
import HalftoneWavesBackground from "@/app/[path]/_components/HalftoneWavesBackground";
import PhotosCarousel from "@/app/[path]/_components/PhotosCarousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Event Photography Gallery",
  description:
    "Freelance event photography portfolio with interactive elements",
};

export default async function Page(props: {
  params: Promise<{ path: string }>;
}) {
  const params: {
    path: string;
  } = await props.params;

  return (
    <main className="relative min-h-screen has-cursor-effect">
      <CursorEffect />

      <HalftoneWavesBackground>
        <PhotosCarousel />
      </HalftoneWavesBackground>

      <Link href={`${params.path}/all`}>
        <Button className="z-30 fixed bottom-4 right-4">Comprar fotos</Button>
      </Link>
    </main>
  );
}
