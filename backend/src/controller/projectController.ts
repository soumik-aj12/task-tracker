import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createProject = async (req: Request, res: Response):Promise<any> => {
  const { title } = req.body;
  const userId = (req as any).user.id;

  try {
    const projects = await prisma.project.findMany({ where: { userId } });
    if (projects.length >= 4) return res.status(400).json({ message: 'Maximum 4 projects allowed' });

    const project = await prisma.project.create({
      data: { title, userId },
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
