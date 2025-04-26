import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import api from "../utils/config";
import { toast } from "sonner";

const CreateProjectDialog = ({ onCreated }: { onCreated: () => void }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleCreate = async () => {
    try {
      const res = await api.post("/projects", { title });
      onCreated();
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTitle("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle></DialogTitle>
      <DialogTrigger asChild>
        <Button>Create a Project</Button>
      </DialogTrigger>
      <DialogContent>
        <Input
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={handleCreate} className="mt-4">
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
