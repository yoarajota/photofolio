/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { GLTFResult } from "@/types/three";

function Model() {
  const group = useRef<THREE.Group>(null);

  const { nodes, materials }: GLTFResult = useGLTF("/scene-draco.glb");

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.003;
    }
  });

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

export default function AnimatedCityModel({ sectionRef }: {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollY } = useScroll();

  const minFov = 80;
  const maxFov = 125;
  const differenceOfFovs = maxFov - minFov;

  const minY = 4;
  const maxY = 0;
  const differenceOfY = maxY - minY;

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
    const startSpaceToScroll = (sectionRef.current?.clientHeight ?? 0) * 0.2;
    const endSpaceToScroll = (sectionRef.current?.clientHeight ?? 0) * 0.4;

    if (latest > startSpaceToScroll && latest < endSpaceToScroll) {
      const scrollRatio =
        (latest - startSpaceToScroll) / (endSpaceToScroll - startSpaceToScroll);
      y.set(50 - scrollRatio * 200);
    }
  });

  return (
    <>
        <Canvas camera={camera.current}>
            <fog attach="fog" args={["#4d080c", 0, 200]} />
            <Model />
        </Canvas>
    </>
  );
}
