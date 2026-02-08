// Growth tier calculation for visual scaling

export interface GrowthTier {
  tier: number;
  name: string;
  scale: number;
  emissiveIntensity: number;
  wireframe: boolean;
}

export function calculateTier(recordCount: number): GrowthTier {
  if (recordCount === 0) {
    return { tier: 0, name: "Seed", scale: 0.8, emissiveIntensity: 0.05, wireframe: true };
  }
  if (recordCount < 10) {
    return { tier: 1, name: "Active", scale: 1.0, emissiveIntensity: 0.2, wireframe: false };
  }
  if (recordCount < 50) {
    return { tier: 2, name: "Established", scale: 1.5, emissiveIntensity: 0.4, wireframe: false };
  }
  if (recordCount < 200) {
    return { tier: 3, name: "Mature", scale: 1.8, emissiveIntensity: 0.6, wireframe: false };
  }
  return { tier: 4, name: "Complex", scale: 2.2, emissiveIntensity: 0.8, wireframe: false };
}

export type EdgeState = "dormant" | "active" | "busy" | "saturated";

export function calculateEdgeState(recentCount: number): EdgeState {
  if (recentCount === 0) return "dormant";
  if (recentCount <= 5) return "active";
  if (recentCount <= 20) return "busy";
  return "saturated";
}
