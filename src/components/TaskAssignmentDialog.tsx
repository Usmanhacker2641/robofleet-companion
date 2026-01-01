import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, ListTodo } from "lucide-react";
import type { Task, Robot } from "@/data/robots";
import { availableTasks } from "@/data/robots";
import { useToast } from "@/hooks/use-toast";

interface TaskAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  robot: Robot | null;
}

const priorityConfig = {
  low: { label: "Low", className: "bg-muted text-muted-foreground" },
  medium: { label: "Medium", className: "bg-warning/20 text-warning" },
  high: { label: "High", className: "bg-destructive/20 text-destructive" },
};

export function TaskAssignmentDialog({ open, onOpenChange, robot }: TaskAssignmentDialogProps) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAssign = () => {
    if (!selectedTask || !robot) return;

    const task = availableTasks.find((t) => t.id === selectedTask);
    
    toast({
      title: "Task Assigned",
      description: `"${task?.name}" has been assigned to ${robot.name}`,
    });

    setSelectedTask(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-primary" />
            Assign Task
          </DialogTitle>
          <DialogDescription className="font-mono text-muted-foreground">
            {robot ? `Select a task for ${robot.name}` : "Select a robot first"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          {availableTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => setSelectedTask(task.id)}
              className={cn(
                "w-full p-4 rounded-lg border text-left transition-all duration-200",
                "hover:border-primary/50 hover:bg-secondary/50",
                selectedTask === task.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-secondary/30"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-medium text-foreground">{task.name}</span>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-mono",
                      priorityConfig[task.priority].className
                    )}
                  >
                    {priorityConfig[task.priority].label}
                  </span>
                  {selectedTask === task.id && (
                    <CheckCircle className="w-4 h-4 text-primary" />
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </button>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleAssign}
            disabled={!selectedTask}
          >
            Assign Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
