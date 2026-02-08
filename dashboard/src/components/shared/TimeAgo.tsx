"use client";

interface TimeAgoProps {
  date: string | null;
}

export function TimeAgo({ date }: TimeAgoProps) {
  if (!date) return <span className="text-slate-600">Never</span>;

  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  let text: string;
  if (diffMins < 1) text = "just now";
  else if (diffMins < 60) text = `${diffMins}m ago`;
  else if (diffHours < 24) text = `${diffHours}h ago`;
  else text = `${diffDays}d ago`;

  return <span className="text-slate-400 text-xs">{text}</span>;
}
