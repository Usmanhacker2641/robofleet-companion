import { cn } from "@/lib/utils";
import { Bot, MapPin, Clock, Zap, Thermometer, ArrowRight } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { BatteryIndicator } from "./BatteryIndicator";
import { Button } from "./ui/button";
import type { Robot } from "@/data/robots";

interface RobotCardProps {
  robot: Robot;
  onAssignTask: (robotId: string) => void;
  className?: string;
}

export function RobotCard({ robot, onAssignTask, className }: RobotCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-card rounded-xl border border-border p-5 transition-all duration-300",
        "hover:border-primary/50 hover:shadow-[0_0_30px_hsl(186_100%_50%/0.1)]",
        robot.status === "offline" && "opacity-60",
        className
      )}
      style={{ animationDelay: `${Math.random() * 0.3}s` }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-mono font-semibold text-foreground">{robot.name}</h3>
              <p className="text-xs text-muted-foreground font-mono">{robot.id} • {robot.model}</p>
            </div>
          </div>
          <StatusBadge status={robot.status} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Zap className="w-3.5 h-3.5" />
              <span className="text-xs">Battery</span>
            </div>
            <BatteryIndicator level={robot.battery} charging={robot.status === "charging"} />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs">Location</span>
            </div>
            <p className="text-sm font-mono text-foreground truncate">{robot.location}</p>
          </div>

          {robot.temperature !== undefined && (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Thermometer className="w-3.5 h-3.5" />
                <span className="text-xs">Temp</span>
              </div>
              <p className="text-sm font-mono text-foreground">{robot.temperature}°C</p>
            </div>
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">Last Seen</span>
            </div>
            <p className="text-sm font-mono text-foreground">{robot.lastSeen}</p>
          </div>
        </div>

        {/* Current Task */}
        {robot.currentTask && (
          <div className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-xs text-muted-foreground mb-0.5">Current Task</p>
            <p className="text-sm font-mono text-primary">{robot.currentTask}</p>
          </div>
        )}

        {/* Action */}
        <Button
          variant="outline"
          size="sm"
          className="w-full group/btn"
          onClick={() => onAssignTask(robot.id)}
          disabled={robot.status === "offline" || robot.status === "maintenance"}
        >
          <span>Assign Task</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
