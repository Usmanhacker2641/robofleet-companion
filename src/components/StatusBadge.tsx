import { cn } from "@/lib/utils";
import type { RobotStatus } from "@/data/robots";

interface StatusBadgeProps {
  status: RobotStatus;
  className?: string;
}

const statusConfig: Record<RobotStatus, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-success/20 text-success border-success/30",
  },
  idle: {
    label: "Idle",
    className: "bg-muted text-muted-foreground border-muted-foreground/30",
  },
  charging: {
    label: "Charging",
    className: "bg-warning/20 text-warning border-warning/30",
  },
  maintenance: {
    label: "Maintenance",
    className: "bg-warning/20 text-warning border-warning/30",
  },
  offline: {
    label: "Offline",
    className: "bg-destructive/20 text-destructive border-destructive/30",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border",
        config.className,
        className
      )}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          status === "active" && "bg-success animate-pulse",
          status === "idle" && "bg-muted-foreground",
          status === "charging" && "bg-warning animate-blink",
          status === "maintenance" && "bg-warning",
          status === "offline" && "bg-destructive"
        )}
      />
      {config.label}
    </div>
  );
}
