"use client";

import {
  motion,
  useScroll,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "motion/react";
import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, PositionalAudio } from "@react-three/drei";
import * as THREE from "three";

const images = [
  "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Item = ({ src, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  return (
    <motion.div
      key={index}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      style={{
        height: 180,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src={src}
        alt={`image-${index}`}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </motion.div>
  );
};

function Model() {
  const group = useRef();
  const { nodes, materials } = useGLTF("/scene-draco.glb");

  useFrame(() => (group.current.rotation.y += 0.003));

  return (
    <group ref={group} scale={0.001} position={[0, -4, -60]} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[-162253.52, -210688.86, -17050.52]}>
          <mesh
            material={materials.Scene_Root}
            geometry={nodes.mesh_0.geometry}
          />
          <mesh
            material={materials.Scene_Root}
            geometry={nodes.mesh_1.geometry}
          />
          <mesh
            material={materials.Scene_Root}
            geometry={nodes.mesh_2.geometry}
          />
          <mesh
            material={materials.Scene_Root}
            geometry={nodes.mesh_3.geometry}
          />
        </group>
        <group position={[100000, 120000, 2000]}></group>
        <mesh position={[250000, -200000, 50000]}>
          <sphereGeometry args={[30000, 32, 32]} />
          <meshBasicMaterial color="#4d080c" />
        </mesh>
      </group>
    </group>
  );
}

export default function Web() {
  const { scrollY } = useScroll();

  const minFov = 80;
  const maxFov = 125;
  const differenceOfFovs = maxFov - minFov;

  const minY = 4;
  const maxY = 0;
  const differenceOfY = maxY - minY;

  const sectionRef = useRef(null);
  const camera = useRef(new THREE.PerspectiveCamera(minFov));
  camera.current.position.set(0, minY, 20);

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    const handleScroll = () => {
      const scrollYValue = window.scrollY;
      const sectionHeight = sectionRef.current?.clientHeight || 1;

      if (scrollYValue > sectionHeight) {
        return;
      }

      const scrollRatio = scrollYValue / sectionHeight;

      const newFov = minFov + scrollRatio * differenceOfFovs;
      const newY = minY + scrollRatio * differenceOfY;

      camera.current.fov = newFov;
      camera.current.position.setY(newY);
      camera.current.updateProjectionMatrix();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const y = useSpring(50);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const startSpaceToScroll = sectionRef.current?.clientHeight * 0.2;
    const endSpaceToScroll = sectionRef.current?.clientHeight * 0.4;

    if (latest > startSpaceToScroll && latest < endSpaceToScroll) {
      const scrollRatio =
        (latest - startSpaceToScroll) / (endSpaceToScroll - startSpaceToScroll);
      y.set(50 - scrollRatio * 200);
    }
  });

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full h-screen flex items-center justify-center"
        style={{ background: "#000" }}
      >
        <Canvas camera={camera.current}>
          <fog attach="fog" args={["#4d080c", 0, 500]} />
          <Model />
        </Canvas>
      </section>
      <motion.section
        style={{ y }}
        className="flex flex-wrap items-center justify-center gap-4 max-w-[720px] mx-auto"
      >
        {images.map((src, index) => {
          return <Item key={index} src={src} index={index} />;
        })}
      </motion.section>
    </>
  );
}
