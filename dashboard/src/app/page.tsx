"use client";

import dynamic from "next/dynamic";
import { useEcosystem } from "@/hooks/useEcosystem";
import { LoadingState } from "@/components/shared/LoadingState";
import { MetricCard } from "@/components/shared/MetricCard";

// Dynamic import avoids SSR issues with Three.js
const EcosystemCanvas = dynamic(
  () =>
    import("@/components/ecosystem/EcosystemCanvas").then(
      (m) => m.EcosystemCanvas
    ),
  { ssr: false }
);

export default function EcosystemPage() {
  const { data, error, isLoading } = useEcosystem();

  if (isLoading) return <LoadingState message="Loading ecosystem..." />;
  if (error)
    return (
      <div className="p-6 text-red-400">
        Failed to load ecosystem: {error.message}
      </div>
    );
  if (!data) return null;

  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col">
      {/* 3D Canvas */}
      <div className="flex-1 relative">
        <EcosystemCanvas data={data} />
      </div>

      {/* Bottom metric strip */}
      <div className="p-4 border-t border-slate-700/50 grid grid-cols-3 gap-4">
        {data.nodes.map((node) => (
          <MetricCard
            key={node.node_id}
            label={node.display_name}
            value={node.record_count}
            sub={node.health_status}
          />
        ))}
      </div>
    </div>
  );
}
