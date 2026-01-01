import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { Button } from "./ui/button";
import type { Alert } from "@/data/robots";

interface AlertsPanelProps {
  alerts: Alert[];
  onDismiss: (alertId: string) => void;
  className?: string;
}

const alertConfig = {
  critical: {
    icon: AlertTriangle,
    className: "bg-destructive/10 border-destructive/30 text-destructive",
    iconClassName: "text-destructive",
  },
  warning: {
    icon: AlertCircle,
    className: "bg-warning/10 border-warning/30 text-warning",
    iconClassName: "text-warning",
  },
  info: {
    icon: Info,
    className: "bg-primary/10 border-primary/30 text-primary",
    iconClassName: "text-primary",
  },
};

export function AlertsPanel({ alerts, onDismiss, className }: AlertsPanelProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h2 className="font-mono font-semibold text-lg text-foreground flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          System Alerts
        </h2>
        <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
          {alerts.length} active
        </span>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-mono">No active alerts</p>
          </div>
        ) : (
          alerts.map((alert, index) => {
            const config = alertConfig[alert.type];
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                className={cn(
                  "relative p-4 rounded-lg border animate-slide-up",
                  config.className
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", config.iconClassName)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-medium text-sm">{alert.robotName}</span>
                      <span className="text-xs opacity-60">•</span>
                      <span className="text-xs opacity-60 font-mono">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm opacity-90">{alert.message}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 h-6 w-6 opacity-50 hover:opacity-100"
                    onClick={() => onDismiss(alert.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
