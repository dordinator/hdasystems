"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Icosahedron,
  MeshDistortMaterial,
  TorusKnot,
  Environment,
  useProgress,
} from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { SCENE_READY_EVENT } from "@/lib/pageReady";

const SCENE_SAFETY_MS = 3000;

// Signals once the 3D scene (incl. environment) has finished loading.
function SceneReady() {
  const { active, progress } = useProgress();
  const fired = useRef(false);

  const fire = () => {
    if (fired.current) return;
    fired.current = true;
    window.dispatchEvent(new Event(SCENE_READY_EVENT));
  };

  useEffect(() => {
    if (progress >= 100 && !active) {
      const id = requestAnimationFrame(() => requestAnimationFrame(fire));
      return () => cancelAnimationFrame(id);
    }
  }, [active, progress]);

  // Safety net only if assets hang after the canvas has mounted.
  useEffect(() => {
    const t = setTimeout(fire, SCENE_SAFETY_MS);
    return () => clearTimeout(t);
  }, []);

  return null;
}

function MainBlob() {
  return (
    <Float speed={1.1} rotationIntensity={0.5} floatIntensity={1}>
      <Icosahedron args={[1.05, 6]} position={[2.4, 0.8, -0.5]}>
        <MeshDistortMaterial
          color="#c4623f"
          roughness={0.4}
          metalness={0.12}
          distort={0.3}
          speed={1.3}
          envMapIntensity={0.85}
        />
      </Icosahedron>
    </Float>
  );
}

function Wire() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.18;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={ref} position={[-2.5, 1.2, -1]} scale={0.55}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#7f8a6f" wireframe transparent opacity={0.55} />
      </mesh>
    </Float>
  );
}

function Knot() {
  return (
    <Float speed={1.6} rotationIntensity={1} floatIntensity={1.4}>
      <TorusKnot args={[0.32, 0.12, 160, 24]} position={[-2.2, -1.2, -0.5]}>
        <meshStandardMaterial
          color="#c99a5b"
          roughness={0.4}
          metalness={0.25}
          envMapIntensity={0.9}
        />
      </TorusKnot>
    </Float>
  );
}

function Pills() {
  const data = [
    { p: [2.4, -1.4, 0.5], c: "#d98c6a", s: 0.16 },
    { p: [-2.5, 1.3, 0.3], c: "#e6b98f", s: 0.12 },
    { p: [1.4, 1.8, 0.6], c: "#7f8a6f", s: 0.1 },
  ] as const;
  return (
    <>
      {data.map((d, i) => (
        <Float key={i} speed={2 + i} rotationIntensity={1} floatIntensity={2}>
          <mesh position={d.p as unknown as [number, number, number]}>
            <sphereGeometry args={[d.s, 24, 24]} />
            <meshStandardMaterial
              color={d.c}
              emissive={d.c}
              emissiveIntensity={0.25}
              roughness={0.5}
              metalness={0.1}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const x = state.pointer.x * 0.35;
    const y = state.pointer.y * 0.28;
    group.current.rotation.y += (x - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-y - group.current.rotation.x) * 0.04;
  });
  return <group ref={group}>{children}</group>;
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[5, 6, 4]} intensity={1.5} color="#fff1dd" />
        <pointLight position={[-6, -2, 2]} intensity={1.8} color="#e6a06a" />
        <pointLight position={[4, -4, -2]} intensity={1.2} color="#9aa789" />
        <Rig>
          <MainBlob />
          <Wire />
          <Knot />
          <Pills />
        </Rig>
        <Environment preset="sunset" />
        <SceneReady />
      </Suspense>
    </Canvas>
  );
}
