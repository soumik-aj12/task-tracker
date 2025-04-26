import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const projects = await prisma.project.findMany({
    where: { userId },
    include: { tasks: true }
  });
  res.json(projects);
};

export const createProject = async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).user.id;
  const { title } = req.body;

  const existingProjects = await prisma.project.findMany({ where: { userId } });

  if (existingProjects.length >= 4) {
    return res.json({error:true, message: "You can only create up to 4 projects." });
  }

  const project = await prisma.project.create({
    data: {
      title,
      userId,
    },
  });

  res.status(201).json({error:false, message: "Project created", project });
};

export const deleteProject = async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).user.id;
  const { id } = req.params;

  await prisma.project.deleteMany({
    where: {
      id: Number(id),
      userId,
    },
  });

  res.status(200).json({error:false, message: "Project deleted" });
};
