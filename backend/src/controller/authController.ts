import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import { Request, RequestHandler, Response } from 'express';

const prisma = new PrismaClient();

export const Signup = async (req: Request, res: Response): Promise<any> => {
  const { email, password, name, country } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, country },
    });

    const token = generateToken(user.id);
    res.status(201).json({ token, user: { name: user.name, email: user.email, country: user.country } });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const Login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user.id);
    res.status(200).json({ token, user: { name: user.name, email: user.email, country: user.country } });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
