"use client";

import { useEcosystem } from "@/hooks/useEcosystem";
import { StatusBadge } from "./StatusBadge";

export function Header() {
  const { data } = useEcosystem();

  return (
    <header className="h-12 bg-surface border-b border-slate-700/50 flex items-center justify-between px-6 fixed top-0 left-56 right-0 z-10">
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-400">Feedback Loop</span>
        {data && <StatusBadge status={data.loop_health} />}
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-500">
        {data && <span>Cycles: {data.cycle_count}</span>}
      </div>
    </header>
  );
}
