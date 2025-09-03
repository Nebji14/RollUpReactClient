import React, { Suspense, useRef, useState } from "react";
import D20Model from "../Components/Model3D/D20Model";
import Header from "../Components/Common/Header";
import { DefaultAccordion } from "../Components/Common/DefaultAccordion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds } from "@react-three/drei";
import Button from "../Components/Common/Button";
import AshParticles from "../Components/Common/ParticlesBackground";

// ============================
// Composant InteractiveD20
// - Gère le modèle 3D du dé
// - Animation d’intro (rotation automatique)
// - Interactions utilisateur (drag souris ou tactile)
// - Inertie quand on relâche le dé
// ============================
function InteractiveD20() {
  const modelRef = useRef();
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const [introDone, setIntroDone] = useState(false);
  const startTime = useRef(null);

  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  useFrame((state) => {
    if (!modelRef.current) return;

    if (!introDone) {
      if (startTime.current === null)
        startTime.current = state.clock.elapsedTime;

      const elapsed = state.clock.elapsedTime - startTime.current;
      const duration = 2;
      const progress = Math.min(elapsed / duration, 1);

      modelRef.current.rotation.y = progress * Math.PI * 2;

      if (progress >= 1) setIntroDone(true);
      return;
    }

    if (!dragging) {
      modelRef.current.rotation.y += velocity.current.x;
      modelRef.current.rotation.x += velocity.current.y;

      velocity.current.x *= 0.95;
      velocity.current.y *= 0.95;
    }
  });

  return (
    <group
      ref={modelRef}
      onPointerDown={(e) => {
        if (!isTouchDevice) {
          e.stopPropagation();
          setDragging(true);
          setLastPos({ x: e.clientX, y: e.clientY });
        }
      }}
      onPointerUp={() => {
        if (!isTouchDevice) setDragging(false);
      }}
      onPointerMove={(e) => {
        if (!introDone || !modelRef.current) return;

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
  );
}

// ============================
// Composant HomePage
// - Structure principale de la page
// - Colonne gauche : rendu 3D interactif
// - Colonne droite : contenu texte (accordéons + boutons)
// ============================
export default function HomePage() {
  return (
    <>
      <AshParticles />
      {/* Header commun à la page */}
      <Header />

      {/* Layout principal : deux colonnes responsives */}
      <div
        className="
          w-full min-h-screen flex flex-col md:flex-row 
          bg-jdr-texture p-2 sm:p-4 md:p-8
          pt-32 sm:pt-24 overflow-y-auto
        "
      >
        {/* Colonne gauche : scène 3D */}
        <div
          className="
            w-full md:w-1/2 
            h-[250px] sm:h-[320px] md:h-screen 
            flex items-center justify-center
          "
        >
          <Canvas
            style={{ background: "transparent", width: "100%", height: "100%" }}
          >
            {/* Lumières de la scène */}
            <ambientLight intensity={3.5} />
            <directionalLight position={[10, 10, 10]} />

            {/* Dé interactif, centré et auto-ajusté */}
            <Suspense fallback={null}>
              <Bounds fit clip observe margin={1.2}>
                <InteractiveD20 />
              </Bounds>
            </Suspense>
          </Canvas>
        </div>

        {/* Colonne droite : texte et actions */}
        <div
          className="
            w-full md:w-1/2 
            flex flex-col justify-center items-center 
            space-y-4 sm:space-y-6 mt-4 md:mt-0
          "
        >
          {/* Accordéons d’information */}
          <div className="w-full max-w-sm sm:max-w-xl">
            <DefaultAccordion
              items={[
                {
                  title: "Qu’est ce que le jeu de rôle ?",
                  content:
                    "Le jeu de rôle est une activité ludique où les participants incarnent des personnages fictifs dans un univers imaginaire. Guidés par un maître de jeu, ils vivent des aventures, prennent des décisions et interagissent avec le monde qui les entoure. C’est une expérience immersive qui stimule la créativité, la collaboration et la narration.",
                },
                {
                  title: "RollUp! C’est quoi ?",
                  content:
                    "Un site de découverter du jdR et de mise en relation entre joueurs et maîtres du jeu.",
                },
                {
                  title: "Tu ne sais pas ou commencer ?",
                  content:
                    "Découvre nos Questionnaires ainsi que nos guides et ressources pour bien débuter dans le monde du jeu de rôle.",
                },
                {
                  title: "Créer ou rejoins une table",
                  content:
                    "Crée ta propre table de jeu ou rejoins une partie existante en quelques clics. Utilise nos filtres pour trouver la partie qui te correspond le mieux.",
                },
              ]}
            />
          </div>

          {/* Boutons d’action principaux */}
          <div className="flex flex-col items-center pt-4 w-full max-w-xs">
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
