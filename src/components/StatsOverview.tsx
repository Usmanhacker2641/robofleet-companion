import { cn } from "@/lib/utils";
import { Bot, Zap, AlertTriangle, Activity } from "lucide-react";
import type { Robot, Alert } from "@/data/robots";

interface StatsOverviewProps {
  robots: Robot[];
  alerts: Alert[];
  className?: string;
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subValue?: string;
  iconClassName?: string;
  delay?: number;
}

function StatCard({ icon: Icon, label, value, subValue, iconClassName, delay = 0 }: StatCardProps) {
  return (
    <div
      className="bg-card rounded-xl border border-border p-5 animate-slide-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", "bg-secondary")}>
          <Icon className={cn("w-5 h-5", iconClassName)} />
        </div>
        <span className="text-sm text-muted-foreground font-mono">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-mono font-bold text-foreground">{value}</span>
        {subValue && (
          <span className="text-sm text-muted-foreground font-mono">{subValue}</span>
        )}
      </div>
    </div>
  );
}

export function StatsOverview({ robots, alerts, className }: StatsOverviewProps) {
  const activeRobots = robots.filter((r) => r.status === "active").length;
  const averageBattery = Math.round(
    robots.reduce((acc, r) => acc + r.battery, 0) / robots.length
  );
  const criticalAlerts = alerts.filter((a) => a.type === "critical").length;

  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      <StatCard
        icon={Bot}
        label="Total Fleet"
        value={robots.length}
        subValue="robots"
        iconClassName="text-primary"
        delay={0}
      />
      <StatCard
        icon={Activity}
        label="Active Now"
        value={activeRobots}
        subValue={`of ${robots.length}`}
        iconClassName="text-success"
        delay={0.1}
      />
      <StatCard
        icon={Zap}
        label="Avg. Battery"
        value={`${averageBattery}%`}
        iconClassName="text-warning"
        delay={0.2}
      />
      <StatCard
        icon={AlertTriangle}
        label="Critical Alerts"
        value={criticalAlerts}
        subValue="issues"
        iconClassName="text-destructive"
        delay={0.3}
      />
    </div>
  );
}
