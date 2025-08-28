import React, { Suspense, useRef, useState } from "react";
import D20Model from "../Components/Model3D/D20Model";
import Header from "../Components/Common/Header";
import { DefaultAccordion } from "../Components/Common/DefaultAccordion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds } from "@react-three/drei";
import Button from "../Components/Common/Button";

function InteractiveD20() {
  const modelRef = useRef();
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  // état pour l'animation d'intro
  const [introDone, setIntroDone] = useState(false);
  const startTime = useRef(null);

  // détecter si l’appareil est tactile
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  useFrame((state) => {
    if (!modelRef.current) return;

    // Animation d'intro
    if (!introDone) {
      if (startTime.current === null)
        startTime.current = state.clock.elapsedTime;

      const elapsed = state.clock.elapsedTime - startTime.current;
      const duration = 2;
      const progress = Math.min(elapsed / duration, 1);

      modelRef.current.rotation.y = progress * Math.PI * 2;

      if (progress >= 1) {
        setIntroDone(true);
      }
      return;
    }

    // Inertie si pas de drag
    if (!dragging) {
      modelRef.current.rotation.y += velocity.current.x;
      modelRef.current.rotation.x += velocity.current.y;

      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;
    }
  });

  return (
    <group>
      {/* Dé réel */}
      <group
        ref={modelRef}
        onPointerDown={(e) => {
          if (!isTouchDevice) {
            e.stopPropagation();
            setDragging(true);
            setLastPos({ x: e.clientX, y: e.clientY });
          }
        }}
        onPointerUp={(e) => {
          if (!isTouchDevice) {
            e.stopPropagation();
            setDragging(false);
          }
        }}
        onPointerMove={(e) => {
          if (!introDone || !modelRef.current) return;

          // Sur tactile → direct
          // Sur desktop → seulement si dragging
          if (isTouchDevice || dragging) {
            const deltaX = (e.clientX - lastPos.x) * 0.01;
            const deltaY = (e.clientY - lastPos.y) * 0.01;

            modelRef.current.rotation.y += deltaX;
            modelRef.current.rotation.x += deltaY;

            velocity.current = { x: deltaX, y: deltaY };
            setLastPos({ x: e.clientX, y: e.clientY });
          }
        }}
        onPointerLeave={() => {
          if (!isTouchDevice) setDragging(false);
        }}
      >
        <D20Model />
      </group>

      {/* Hitbox invisible */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5, 5, 5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />

      <div
        className="
          w-full 
          min-h-screen 
          flex flex-col md:flex-row 
          bg-jdr-texture 
          p-2 sm:p-4 md:p-8
          pt-32 sm:pt-24   /* plus bas en SE, normal ailleurs */
          overflow-y-auto   /* scroll activé sur petit écran */
        "
      >
        {/* Colonne gauche - Modèle 3D */}
        <div
          className="
            w-full 
            md:w-1/2 
            h-[250px]    
            sm:h-[320px] 
            md:h-screen 
            flex items-center justify-center
          "
        >
          <Canvas
            style={{
              background: "transparent",
              width: "100%",
              height: "100%",
            }}
          >
            {/* Lumières */}
            <ambientLight intensity={3.5} />
            <directionalLight position={[10, 10, 10]} />

            {/* Auto-fit + modèle interactif */}
            <Suspense fallback={null}>
              <Bounds fit clip observe margin={1.2}>
                <InteractiveD20 />
              </Bounds>
            </Suspense>
          </Canvas>
        </div>

        {/* Colonne droite - Accordions + boutons */}
        <div
          className="
            w-full 
            md:w-1/2 
            flex flex-col 
            justify-center 
            items-center 
            space-y-4 sm:space-y-6 
            mt-4 md:mt-0
          "
        >
          <div className="w-full max-w-sm sm:max-w-md">
            <DefaultAccordion
              items={[
                {
                  title: "Qu’est ce que le jeu de rôle ?",
                  content:
                    "We're not always in the position that we want to be at. We're constantly growing...",
                },
                {
                  title: "RollUp! C’est quoi ?",
                  content:
                    "You can easily install Material Tailwind with npm or yarn and start using the components.",
                },
                {
                  title: "Tu ne sais pas ou commencer ?",
                  content:
                    "Absolutely! Material Tailwind is fully customizable. You can change themes, colors, components, and animations.",
                },
                {
                  title: "Créer ou rejoins une table",
                  content:
                    "Absolutely! Material Tailwind is fully customizable. You can change themes, colors, components, and animations.",
                },
              ]}
            />
          </div>

          {/* Disposition des boutons */}
          <div className="flex flex-col items-center pt-4 w-full max-w-xs">
            {/* 2 boutons côte à côte */}
            <div className="flex w-full justify-center gap-3">
              <Button
                color="secondary"
                text="Mon JDR ?"
                className="flex-1 px-4 py-2"
              />
              <Button
                color="secondary"
                text="Mon rôle ?"
                className="flex-1 px-4 py-2"
              />
            </div>
            {/* 1 bouton centré en dessous */}
            <div className="mt-3 w-full flex justify-center">
              <Button
                color="secondary"
                text="À table !"
                className="px-6 py-2"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
