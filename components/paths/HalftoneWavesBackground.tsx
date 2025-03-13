"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useSpring } from "framer-motion"

// Custom shader material for the wave animation
function WaveShaderMaterial({ waveIntensity = 1, waveSpeed = 1 }) {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWaveIntensity: { value: waveIntensity },
      uWaveSpeed: { value: waveSpeed },
      uScrollProgress: { value: 0 },
      uMousePosition: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  )

  return (
    <shaderMaterial
      uniforms={uniforms}
      vertexShader={`
        uniform float uTime;
        uniform float uWaveIntensity;
        uniform float uWaveSpeed;
        uniform float uScrollProgress;
        uniform vec2 uMousePosition;
        attribute vec3 color;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          
          // Calculate distance from center in XZ plane
          float distance = length(position.xz);
          
          // Calculate distance from mouse position (in normalized space)
          vec2 mousePos = vec2(uMousePosition.x * 20.0, uMousePosition.y * 20.0);
          float mouseDistance = length(position.xz - mousePos);
          float mouseInfluence = smoothstep(15.0, 0.0, mouseDistance) * 0.5;
          
          // Create multiple overlapping waves
          float scrollOffset = uScrollProgress * 5.0;
          float wave1 = sin(distance * 0.3 - uTime * uWaveSpeed + scrollOffset) * uWaveIntensity;
          float wave2 = cos(distance * 0.2 - uTime * uWaveSpeed * 0.7 + scrollOffset) * uWaveIntensity * 0.5;
          
          // Add mouse influence to waves
          wave1 += mouseInfluence * sin(mouseDistance * 0.5 - uTime * 2.0);
          
          // Apply wave to Y position
          vec3 newPosition = position;
          newPosition.y = wave1 + wave2;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          gl_PointSize = 3.0 * (1.0 - distance / 40.0);
        }
      `}
      fragmentShader={`
        varying vec3 vColor;
        
        void main() {
          // Create circular point
          float r = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;
          
          gl_FragColor = vec4(vColor, 0.7 - r * 1.4);
        }
      `}
      transparent
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  )
}

function ParticleWaves({ count = 5000, size = 40, mousePosition, scrollProgress }) {
  const meshRef = useRef()
  const prevTimeRef = useRef(0)
  const targetIntensityRef = useRef(1)
  const targetSpeedRef = useRef(1)
  const currentIntensityRef = useRef(1)
  const currentSpeedRef = useRef(1)
  const mousePositionRef = useRef({ x: 0, y: 0 })

  // Generate points in a grid pattern
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const colorPalette = [
      [0.8, 0.2, 0.8], // Purple
      [0.2, 0.8, 0.8], // Cyan
      [0.9, 0.4, 0.1], // Orange
      [0.1, 0.6, 0.9], // Blue
    ]

    const rows = Math.sqrt(count)
    const cols = Math.sqrt(count)
    const gridSize = size / rows

    for (let i = 0; i < count; i++) {
      const x = (i % cols) * gridSize - size / 2 + gridSize / 2
      const z = Math.floor(i / cols) * gridSize - size / 2 + gridSize / 2
      const y = 0

      positions[i * 3] = x + (Math.random() - 0.5) * gridSize * 0.2
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z + (Math.random() - 0.5) * gridSize * 0.2

      // Assign random color from palette
      const colorIndex = Math.floor(Math.random() * colorPalette.length)
      colors[i * 3] = colorPalette[colorIndex][0]
      colors[i * 3 + 1] = colorPalette[colorIndex][1]
      colors[i * 3 + 2] = colorPalette[colorIndex][2]
    }

    return { positions, colors }
  }, [count, size])

  // Smooth lerp function for transitions
  const lerp = (start, end, factor) => {
    return start + (end - start) * factor
  }

  // Update scroll progress in shader
  useEffect(() => {
    if (!meshRef.current) return

    const updateScrollProgress = () => {
      if (meshRef.current && meshRef.current.material) {
        meshRef.current.material.uniforms.uScrollProgress.value = scrollProgress.get()
      }
    }

    const unsubscribe = scrollProgress.on("change", updateScrollProgress)
    return () => unsubscribe()
  }, [scrollProgress])

  // Update wave parameters based on mouse position with smoothing
  useFrame(({ clock }) => {
    if (!meshRef.current) return

    const deltaTime = Math.min(0.1, clock.getElapsedTime() - prevTimeRef.current)
    prevTimeRef.current = clock.getElapsedTime()

    if (mousePosition.x !== null && mousePosition.y !== null) {
      // Make mouse influence stronger and more noticeable but with slower response
      targetIntensityRef.current = Math.min(1.5, 0.5 + Math.abs(mousePosition.x) * 1.0)
      targetSpeedRef.current = Math.min(1.2, 0.5 + Math.abs(mousePosition.y) * 0.7)

      // Smooth the mouse position updates to prevent fast movements
      if (meshRef.current.material.uniforms.uMousePosition) {
        // Apply very slow smoothing to mouse position
        mousePositionRef.current.x = lerp(mousePositionRef.current.x, mousePosition.x, 0.03)
        mousePositionRef.current.y = lerp(mousePositionRef.current.y, mousePosition.y, 0.03)

        meshRef.current.material.uniforms.uMousePosition.value.x = mousePositionRef.current.x
        meshRef.current.material.uniforms.uMousePosition.value.y = mousePositionRef.current.y
      }
    } else {
      // Default values when no mouse input
      targetIntensityRef.current = 1.0
      targetSpeedRef.current = 0.8
    }

    // Increase responsiveness with faster smoothing
    const smoothFactor = 0.03 // Reduced from 0.05 for smoother transitions
    currentIntensityRef.current = lerp(currentIntensityRef.current, targetIntensityRef.current, smoothFactor)
    currentSpeedRef.current = lerp(currentSpeedRef.current, targetSpeedRef.current, smoothFactor)

    // Update uniforms
    meshRef.current.material.uniforms.uWaveIntensity.value = currentIntensityRef.current
    meshRef.current.material.uniforms.uWaveSpeed.value = currentSpeedRef.current
    meshRef.current.material.uniforms.uTime.value += deltaTime * currentSpeedRef.current * 0.6 // Reduced from 0.8
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <WaveShaderMaterial waveIntensity={1} waveSpeed={0.8} />
    </points>
  )
}

export default function HalftoneWavesBackground({ mousePosition, scrollProgress }) {
  // Create a spring animation for the scroll progress
  const springScrollProgress = useSpring(scrollProgress || 0, {
    stiffness: 100,
    damping: 30,
  })

  return (
    <Canvas camera={{ position: [0, 15, 0], fov: 50, near: 0.1, far: 1000 }} dpr={[1, 2]}>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 15, 30]} />
      <ParticleWaves mousePosition={mousePosition} scrollProgress={springScrollProgress} count={4000} />
    </Canvas>
  )
}

