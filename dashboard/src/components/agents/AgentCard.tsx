import Link from "next/link";
import type { AgentSummary } from "@/lib/types";
import { StatusBadge } from "@/components/layout/StatusBadge";

const CATEGORY_COLORS: Record<string, string> = {
  "business-strategist": "text-um-blue",
  "technical-architect": "text-ac-emerald",
  "domain-expert": "text-sl-amber",
  creative: "text-purple-400",
  custom: "text-slate-400",
};

interface AgentCardProps {
  agent: AgentSummary;
}

export function AgentCard({ agent }: AgentCardProps) {
  const catColor = CATEGORY_COLORS[agent.category] || "text-slate-400";

  return (
    <Link href={`/agents/${agent.id}`} className="card hover:border-slate-600 transition-colors block">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-slate-100">{agent.name}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{agent.role}</p>
        </div>
        <StatusBadge status={agent.status} />
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
        <span className={catColor}>{agent.category}</span>
        <span>{agent.framework_count} frameworks</span>
        <span>{agent.case_study_count} cases</span>
      </div>
    </Link>
  );
}
