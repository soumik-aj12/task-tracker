import { useContext, useEffect, useState } from "react";
import CreateProjectDialog from "../components/CreateProjectDialog";
import ProjectCard from "../components/ProjectCard";
import api from "../utils/config";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/context/AuthContext";
import { Icon, User } from "lucide-react";
const Dashboard = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Projects</h1>
        <div className="flex gap-4">
          <CreateProjectDialog onCreated={fetchProjects} />
          <ProfileDialog />
        </div>
      </div>

      {projects.length === 0 ? (
        <p>No projects yet. Create one!</p>
      ) : (
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            tasks={project.tasks}
            refresh={fetchProjects}
          />
        ))
      )}
    </div>
  );
};

const ProfileDialog = () => {
  const {user} = useContext(AuthContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><User className="text-black" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {user?.name}
        </DropdownMenuItem>
        <DropdownMenuItem>
          {user?.email}
        </DropdownMenuItem>
        <DropdownMenuItem>
          {user?.country}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={
          () => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dashboard;
