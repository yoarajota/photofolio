"use client";

import { useRef } from "react";
import GridImages from "@/components/pages/landing-page/GridImages";
import AnimatedCityModel from "@/components/pages/landing-page/AnimatedCityModel";

export default function Web() {
  const sectionRef = useRef(null);

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full h-screen items-center justify-center bg-background opacity-80 relative"
      >
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl absolute left-[5%] top-[15%] transform-gpu">
          Taxing Laughter: The Joke Tax Chronicles
        </h1>
        <AnimatedCityModel sectionRef={sectionRef} />
      </section>
      <GridImages sectionRef={sectionRef} />
    </>
  );
}
