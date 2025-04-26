import { Card } from "@/components/ui/card";

interface TaskCardProps {
  title: string;
  status: string;
}

const statusColors: Record<string, string> = {
  todo: "bg-gray-300",
  "in-progress": "bg-yellow-300",
  done: "bg-green-300",
};

import UpdateTaskDialog from "./UpdateTaskDialog";

interface TaskCardProps {
  id: number;
  title: string;
  status: string;
  description?: string;
  refresh: () => void;
}

const TaskCard = ({ id, title, status, description = "", refresh }: TaskCardProps) => {
  return (
    <Card className="p-4 flex flex-col gap-2 relative">
      <div className={`h-2 rounded-full ${statusColors[status]} mb-2`} />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground">{status}</p>
      <UpdateTaskDialog
        taskId={id}
        currentTitle={title}
        currentDescription={description}
        currentStatus={status}
        refresh={refresh}
      />
    </Card>
  );
};


export default TaskCard;
