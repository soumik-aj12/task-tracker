import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createTask = async (req: Request, res: Response) => {
  const { title, description, projectId } = req.body;

  try {
    const task = await prisma.task.create({
      data: { title, description, status: 'todo', projectId },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const { projectId } = req.query;

  try {
    const tasks = await prisma.task.findMany({ where: { projectId: Number(projectId) } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const completedAt = status === 'done' ? new Date() : null;
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, status, completedAt },
    });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
