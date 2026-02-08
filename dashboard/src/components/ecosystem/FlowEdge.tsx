"use client";

import { Line } from "@react-three/drei";
import * as THREE from "three";
import type { EdgeState } from "@/lib/growth";
import { EDGE_COLORS } from "@/lib/colors";

interface FlowEdgeProps {
  start: [number, number, number];
  end: [number, number, number];
  state: EdgeState;
  label: string;
}

const EDGE_CONFIG: Record<EdgeState, { lineWidth: number; dashScale: number }> = {
  dormant: { lineWidth: 0.5, dashScale: 8 },
  active: { lineWidth: 1, dashScale: 6 },
  busy: { lineWidth: 2, dashScale: 4 },
  saturated: { lineWidth: 3, dashScale: 2 },
};

export function FlowEdge({ start, end, state }: FlowEdgeProps) {
  const config = EDGE_CONFIG[state];
  const color = EDGE_COLORS[state];

  // Curved midpoint raised slightly above the line
  const mid: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2 + 0.5,
    (start[2] + end[2]) / 2 + 0.3,
  ];

  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(...start),
    new THREE.Vector3(...mid),
    new THREE.Vector3(...end)
  );
  const points = curve.getPoints(32);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={config.lineWidth}
      dashed={true}
      dashScale={config.dashScale}
      dashSize={0.5}
      gapSize={0.3}
      transparent
      opacity={state === "dormant" ? 0.3 : 0.8}
    />
  );
}
