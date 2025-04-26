import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import api from "../utils/config";

const CreateTaskDialog = ({
  projectId,
  onCreated,
}: {
  projectId: number;
  onCreated: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    try {
      await api.post("/tasks", { title, description, projectId });
      onCreated();
      setOpen(false);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create task");
    } finally {
      toast.success("Task created successfully!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle></DialogTitle>
      <DialogTrigger asChild>
        <Button variant="outline">+ Add Task</Button>
      </DialogTrigger>
      <DialogContent>
        <Input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2"
        />
        <Button onClick={handleCreate} className="mt-4">
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
