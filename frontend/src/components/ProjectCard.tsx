import CreateTaskDialog from "./CreateTaskDialog";
import TaskCard from "./TaskCard";
import { Button } from "@/components/ui/button";
import api from "../utils/config";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface ProjectCardProps {
  id: number;
  title: string;
  tasks: { id: number; title: string; status: string }[];
  refresh: () => void;
}


const ProjectCard = ({ id, title, tasks, refresh }: ProjectCardProps) => {

  return (
    <div className="mb-8 border p-4 rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <CreateTaskDialog projectId={id} onCreated={refresh} />
          <DeleteProjectDialog projectId={id} onDeleted={refresh} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            status={task.status}
            refresh={refresh}
          />
        ))}
      </div>
    </div>
  );
};

const DeleteProjectDialog = ({ projectId, onDeleted }: { projectId: number; onDeleted: () => void; }) => {
    const [open, setOpen] = useState(false);
    
    const handleDelete = async () => {
        try {
        await api.delete(`/projects/${projectId}`);
        onDeleted();
        setOpen(false);
        } catch (err) {
        console.error(err);
        toast.error("Failed to delete project");
        }finally{
            toast.success("Project deleted successfully!");
        }
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle></DialogTitle>
        <DialogTrigger asChild>
            <Button variant="destructive">Delete Project</Button>
        </DialogTrigger>
        <DialogContent>
            <p>Are you sure you want to delete this project?</p>
            <Button onClick={handleDelete} className="mt-4">Delete</Button>
        </DialogContent>
        </Dialog>
    );
    }
export default ProjectCard;
