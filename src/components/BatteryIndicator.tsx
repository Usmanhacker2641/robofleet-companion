import { cn } from "@/lib/utils";
import { Battery, BatteryLow, BatteryMedium, BatteryFull, BatteryCharging } from "lucide-react";

interface BatteryIndicatorProps {
  level: number;
  charging?: boolean;
  className?: string;
}

export function BatteryIndicator({ level, charging, className }: BatteryIndicatorProps) {
  const getBatteryColor = () => {
    if (level <= 20) return "text-destructive";
    if (level <= 50) return "text-warning";
    return "text-success";
  };

  const BatteryIcon = () => {
    if (charging) return BatteryCharging;
    if (level <= 20) return BatteryLow;
    if (level <= 50) return BatteryMedium;
    return BatteryFull;
  };

  const Icon = BatteryIcon();

  return (
    <div className={cn("flex items-center gap-2 font-mono", className)}>
      <Icon className={cn("w-5 h-5", getBatteryColor(), charging && "animate-pulse")} />
      <span className={cn("text-sm", getBatteryColor())}>{level}%</span>
    </div>
  );
}
