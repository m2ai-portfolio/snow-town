// Node and edge color palettes for the 3D scene

export const NODE_COLORS = {
  ultra_magnus: { hex: "#2563eb", name: "Deep Blue" },
  sky_lynx: { hex: "#f59e0b", name: "Amber" },
  academy: { hex: "#10b981", name: "Emerald" },
} as const;

export const HEALTH_COLORS = {
  healthy: "#10b981",
  idle: "#64748b",
  stale: "#f59e0b",
} as const;

export const EDGE_COLORS = {
  dormant: "#475569",
  active: "#94a3b8",
  busy: "#e2e8f0",
  saturated: "#ffffff",
} as const;

export type NodeId = keyof typeof NODE_COLORS;
