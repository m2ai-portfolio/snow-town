"use client";

import { Canvas } from "@react-three/fiber";
import { EcosystemScene } from "./EcosystemScene";
import type { EcosystemSnapshot } from "@/lib/types";

interface EcosystemCanvasProps {
  data: EcosystemSnapshot;
}

export function EcosystemCanvas({ data }: EcosystemCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 3, 8], fov: 50 }}
      style={{ background: "#0a0f1e" }}
    >
      <EcosystemScene data={data} />
    </Canvas>
  );
}
