import React from "react";
import { useGLTF, Center } from "@react-three/drei";

export default function D20Model(props) {
  // Charger le modèle GLB
  const gltf = useGLTF("/Models/D20.glb");

  return (
    <Center>
      <primitive object={gltf.scene} {...props} />
    </Center>
  );
}
