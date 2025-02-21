"use client";

import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, extend, useLoader, useThree } from "@react-three/fiber";
import {
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Text,
  Preload,
} from "@react-three/drei";
import { easing, geometry } from "maath";
import { useDrag } from "@use-gesture/react";
import { useSpring, a } from "@react-spring/three";
import Background from "@/components/Background";

extend(geometry);

const imageUrl =
  "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function Grid({ spacingX = 4, spacingY = 4 }) {
  const frames = [
    { id: "01", author: "Omar Faruq Tawsif" },
    { id: "02", author: "Omar Faruq Tawsif" },
    { id: "03", author: "Omar Faruq Tawsif" },
    { id: "04", author: "Omar Faruq Tawsif" },
    { id: "05", author: "Omar Faruq Tawsif" },
    { id: "06", author: "Omar Faruq Tawsif" },
  ];

  const rows = 3;
  const cols = 2;

  return (
    <>
      {frames.map((frame, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const position = [
          col * spacingX - ((cols - 1) * spacingX) / 2,
          row * -spacingY + ((rows - 1) * spacingY) / 2,
          0,
        ];
        return <Frame key={frame.id} {...frame} position={position} />;
      })}
    </>
  );
}

// Uso do componente Grid com espaçamento configurável
export const App = () => (
  <Background>
    <Canvas
      flat
      camera={{ fov: 20, position: [0, 0, 20] }}
      eventSource={document.getElementById("root")}
      eventPrefix="client"
      style={{ background: 'transparent' }}
    >
      <Grid spacingX={3.5} spacingY={2} />
      <Preload all />
    </Canvas>
  </Background>
);

function Frame({ id, author, width = 3.2, height = 1.6, position, ...props }) {
  const portal = useRef();
  const [hovered, hover] = useState(false);
  useCursor(hovered);

  const [{ rotation }, setRotation] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { tension: 300, friction: 10, clamp: false, precision: 0.01 },
  }));

  const bind = useDrag(({ offset: [x, y], memo = rotation.get(), active }) => {
    const limitedX =
      Math.max(Math.min(Math.abs(x / 100), 0.2), -0.2) * Math.sign(x);
    const limitedY =
      Math.max(Math.min(Math.abs(y / 100), 0.2), -0.2) * Math.sign(y);

    setRotation({ rotation: [limitedY, limitedX, 0] });

    clearTimeout(memo.timeout);
    if (!active) {
      memo.timeout = setTimeout(() => {
        setRotation({ rotation: [0, 0, 0] });
      }, 30);
    }

    return memo;
  });

  return (
    <a.group {...props} position={position} rotation={rotation} {...bind()}>
      <mesh
        name={id}
        onDoubleClick={(e) => {}}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <roundedPlaneGeometry args={[width, height, 0.1]} />

        <MeshPortalMaterial ref={portal} side={THREE.DoubleSide}>
          <ImagePanel src={imageUrl} scale={8} position={[0, 0, -2]} />
        </MeshPortalMaterial>
      </mesh>
    </a.group>
  );
}

function ImagePanel({ src, ...props }) {
  const texture = useLoader(THREE.TextureLoader, src);

  return (
    <mesh {...props}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export default App;
