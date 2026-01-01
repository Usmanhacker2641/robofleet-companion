import { useState } from "react";
import { Header } from "@/components/Header";
import { StatsOverview } from "@/components/StatsOverview";
import { RobotCard } from "@/components/RobotCard";
import { AlertsPanel } from "@/components/AlertsPanel";
import { TaskAssignmentDialog } from "@/components/TaskAssignmentDialog";
import { robots as initialRobots, alerts as initialAlerts, type Robot, type Alert } from "@/data/robots";

const Index = () => {
  const [robots] = useState<Robot[]>(initialRobots);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [selectedRobotId, setSelectedRobotId] = useState<string | null>(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const handleAssignTask = (robotId: string) => {
    setSelectedRobotId(robotId);
    setTaskDialogOpen(true);
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  const selectedRobot = robots.find((r) => r.id === selectedRobotId) || null;

  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Ambient glow effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-mono font-bold text-foreground mb-2">
            Fleet Dashboard
          </h1>
          <p className="text-muted-foreground font-mono">
            Monitor and manage your robot fleet in real-time
          </p>
        </div>

        {/* Stats Overview */}
        <StatsOverview robots={robots} alerts={alerts} className="mb-8" />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Robot Fleet */}
          <div className="lg:col-span-2">
            <h2 className="font-mono font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Robot Fleet
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {robots.map((robot) => (
                <RobotCard
                  key={robot.id}
                  robot={robot}
                  onAssignTask={handleAssignTask}
                />
              ))}
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AlertsPanel alerts={alerts} onDismiss={handleDismissAlert} />
            </div>
          </div>
        </div>
      </main>

      {/* Task Assignment Dialog */}
      <TaskAssignmentDialog
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        robot={selectedRobot}
      />
    </div>
  );
};

export default Index;
