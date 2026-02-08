"use client";

import { Html } from "@react-three/drei";

interface NodeLabelProps {
  name: string;
  count: number;
  status: string;
}

const STATUS_DOT: Record<string, string> = {
  healthy: "bg-emerald-400",
  idle: "bg-slate-500",
  stale: "bg-amber-400",
};

export function NodeLabel({ name, count, status }: NodeLabelProps) {
  const dotClass = STATUS_DOT[status] || "bg-slate-500";

  return (
    <Html position={[0, -1, 0]} center distanceFactor={8}>
      <div className="whitespace-nowrap text-center pointer-events-none select-none">
        <div className="flex items-center gap-1.5 justify-center">
          <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
          <span className="text-xs font-medium text-slate-200">{name}</span>
        </div>
        <div className="text-[10px] text-slate-500">{count} records</div>
      </div>
    </Html>
  );
}
