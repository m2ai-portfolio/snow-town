interface StatusBadgeProps {
  status: string;
}

const STATUS_STYLES: Record<string, string> = {
  flowing: "badge-healthy",
  healthy: "badge-healthy",
  partial: "badge-stale",
  idle: "badge-idle",
  stale: "badge-stale",
  available: "badge-healthy",
  proposed: "badge-stale",
  applied: "badge-healthy",
  rejected: "badge-idle",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] || "badge-idle";
  return <span className={`badge ${style}`}>{status}</span>;
}
