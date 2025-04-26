import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import api from "../utils/config";
import { toast } from "sonner";

interface UpdateTaskDialogProps {
  taskId: number;
  currentTitle: string;
  currentDescription: string;
  currentStatus: string;
  refresh: () => void;
}

const UpdateTaskDialog = ({ taskId, currentTitle, currentDescription, currentStatus, refresh }: UpdateTaskDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState(currentDescription);
  const [status, setStatus] = useState(currentStatus);

  const handleUpdate = async () => {
    try {
      await api.put(`/tasks/${taskId}`, { title, description, status });
      refresh();
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task");
    }finally{
        toast.success("Task updated successfully!");
        setTitle('');
        setDescription('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle></DialogTitle>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-2 p-2 border rounded">
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <Button onClick={handleUpdate} className="mt-4">Update</Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTaskDialog;
