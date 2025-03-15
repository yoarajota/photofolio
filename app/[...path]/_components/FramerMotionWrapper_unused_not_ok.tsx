"use client"

import * as THREE from "three"
import { useLayoutEffect, useRef, useState } from "react"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { Image, ScrollControls, useScroll, Billboard } from "@react-three/drei"
import { easing, geometry } from "maath"

extend(geometry)

const VerticalWheel = () => (
  <div className="w-screen h-screen">
    <Canvas dpr={[1, 1.5]} gl={{ antialias: true }}>
      <color attach="background" args={["#f0f0f0"]} />
      {/* Changed infinite to false to clamp scrolling */}
      <ScrollControls pages={4} infinite={false} damping={0.1}>
        <Scene position={[0, 1.5, 0]} />
      </ScrollControls>
    </Canvas>
  </div>
)

function Scene({ children, ...props }) {
  const ref = useRef()
  const scroll = useScroll()
  const [globalHovered, setGlobalHovered] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)
  const [cardPositions, setCardPositions] = useState({})

  // Function to update which card is selected based on center position
  const updateSelectedCard = () => {
    // Find the card closest to the center
    // let closestCard = null
    let minDistance = Number.POSITIVE_INFINITY

    Object.entries(cardPositions).forEach(([cardId, position]) => {
      // We only care about the X distance from center (which is 0)
      const distance = Math.abs(position.x)
      if (distance < minDistance) {
        minDistance = distance
        // closestCard = cardId
      }
    })

    // if (closestCard !== selectedCard) {
    //   setSelectedCard(closestCard)
    // }
  }

  useFrame((state, delta) => {
    ref.current.rotation.x = -scroll.offset * (Math.PI * 2)
    
    state.events.update()

    easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y * 2 + 4.5, 9], 0.3, delta)

    state.camera.lookAt(0, 0, 0)

    // Update selected card based on center position
    updateSelectedCard()
  })

  return (
    <group ref={ref} {...props}>
      <Cards
        category="spring"
        from={0}
        len={Math.PI / 4}
        globalHovered={globalHovered}
        setGlobalHovered={setGlobalHovered}
        groupId="spring"
        selectedCard={selectedCard}
        updateCardPosition={(cardId, position) => {
          setCardPositions((prev) => ({ ...prev, [cardId]: position }))
        }}
      />
      <Cards
        category="summer"
        from={Math.PI / 4}
        len={Math.PI / 2}
        globalHovered={globalHovered}
        setGlobalHovered={setGlobalHovered}
        groupId="summer"
        selectedCard={selectedCard}
        updateCardPosition={(cardId, position) => {
          setCardPositions((prev) => ({ ...prev, [cardId]: position }))
        }}
      />
      <Cards
        category="autumn"
        from={Math.PI / 4 + Math.PI / 2}
        len={Math.PI / 2}
        globalHovered={globalHovered}
        setGlobalHovered={setGlobalHovered}
        groupId="autumn"
        selectedCard={selectedCard}
        updateCardPosition={(cardId, position) => {
          setCardPositions((prev) => ({ ...prev, [cardId]: position }))
        }}
      />
      <Cards
        category="winter"
        from={Math.PI * 1.25}
        len={Math.PI * 2 - Math.PI * 1.25}
        globalHovered={globalHovered}
        setGlobalHovered={setGlobalHovered}
        groupId="winter"
        selectedCard={selectedCard}
        updateCardPosition={(cardId, position) => {
          setCardPositions((prev) => ({ ...prev, [cardId]: position }))
        }}
      />
    </group>
  )
}

function Cards({
  category,
  from = 0,
  len = Math.PI * 2,
  radius = 6.5,
  globalHovered,
  setGlobalHovered,
  groupId,
  selectedCard,
  updateCardPosition,
  ...props
}) {
  // Reduced number of cards for more spacing
  const amount = Math.round(len * 8)
  return (
    <group {...props}>
      {Array.from({ length: amount }, (_, i) => {
        const angle = from + (i / amount) * len
        const cardId = `${groupId}-${i}`

        return (
          <Card
            key={angle}
            onPointerOver={(e) => {
              e.stopPropagation()
              setGlobalHovered(cardId)
            }}
            onPointerOut={() => setGlobalHovered(null)}
            position={[0, Math.sin(angle) * radius, Math.cos(angle) * radius]}
            angle={angle}
            active={globalHovered !== null}
            hovered={globalHovered === cardId}
            selected={selectedCard === cardId}
            cardId={cardId}
            updateCardPosition={updateCardPosition}
            url={`https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80`}
            renderOrder={i}
            index={i}
          />
        )
      })}
    </group>
  )
}

function Card({ url, active, hovered, selected, angle, renderOrder, index, cardId, updateCardPosition, ...props }) {
  const ref = useRef()
  const groupRef = useRef()
  const imageRef = useRef()
  const { camera } = useThree()

  // Vector to store screen position
  const screenPosition = new THREE.Vector3()

  useFrame((state, delta) => {
    const f = hovered ? 1.4 : active ? 1.25 : 1

    // Adjust position for selected card - move slightly to the right and forward
    if (selected) {
      // Move selected card slightly to the right and more forward (closer to camera)
      easing.damp3(ref.current.position, [0.2, 0, 1.0], 0.2, delta)
      // Scale up slightly
      easing.damp3(ref.current.scale, [1.618 * 1.1, 1 * 1.1, 1], 0.2, delta)
    } else if (hovered) {
      // Regular hover behavior for non-selected cards
      easing.damp3(ref.current.position, [0.25, 0, 0], 0.1, delta)
      easing.damp3(ref.current.scale, [1.618 * f, 1 * f, 1], 0.15, delta)
    } else {
      // Reset position and scale for non-selected, non-hovered cards
      easing.damp3(ref.current.position, [0, 0, 0], 0.1, delta)
      easing.damp3(ref.current.scale, [1.618, 1, 1], 0.15, delta)
    }

    // Make the card face the camera by counteracting the wheel rotation
    groupRef.current.rotation.x = -angle

    // Update renderOrder based on position for proper depth sorting
    if (imageRef.current && imageRef.current.material) {
      // Calculate z position relative to camera
      const zPos = Math.cos(angle)
      // Set renderOrder based on z position (higher z = higher renderOrder)
      // Give selected card highest render order
      imageRef.current.renderOrder = selected ? 1000 : Math.round(zPos * 100)

      // Ensure proper depth testing
      imageRef.current.material.depthTest = true
      imageRef.current.material.needsUpdate = true

      // Don't change color to white, just adjust other properties
      if (selected) {
        // Don't change color, just adjust other properties
        imageRef.current.material.zoom = 1.05
      } else {
        imageRef.current.material.zoom = 1
      }
    }

    // Calculate and update screen position for selection logic
    // Get the world position of this card
    groupRef.current.getWorldPosition(screenPosition)
    // Project to screen space
    screenPosition.project(camera)

    // Update the card's position in the tracking object
    updateCardPosition(cardId, {
      x: screenPosition.x,
      y: screenPosition.y,
    })
  })

  return (
    <group {...props} ref={groupRef}>
      <Image
        ref={imageRef}
        transparent
        radius={0.075}
        url={url}
        scale={[1.618, 1, 1]}
        side={THREE.DoubleSide}
        position={[0, 0, 0.01 * index]} // Slight z-offset based on index
        renderOrder={renderOrder}
        grayscale={selected ? 0 : 0.3} // Apply grayscale to non-selected cards
      >
        <group ref={ref} />
      </Image>
      {selected && (
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[1.7, 1.05]} />
          <meshBasicMaterial color="#4285F4" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}

function ActiveCard({ hovered, ...props }) {
  const ref = useRef()
  useLayoutEffect(() => void (ref.current.material.zoom = 0.8), [hovered])
  useFrame((state, delta) => {
    easing.damp(ref.current.material, "zoom", 1, 0.5, delta)
    easing.damp(ref.current.material, "opacity", hovered !== null, 0.3, delta)
  })
  return <Billboard {...props}></Billboard>
}

export default VerticalWheel

