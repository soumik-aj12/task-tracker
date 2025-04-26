import express from 'express';
import { Signup, Login } from '../controller/authController';
import { authenticate } from '../middleware/auth';
import { createProject } from '../controller/projectController';
import { createTask, getTasks, updateTask, deleteTask } from '../controller/taskController';

const router = express.Router();


router.post('/signup', Signup);
router.post('/login', Login);

router.post('/projects', authenticate, createProject);

router.post('/tasks', authenticate, createTask);
router.get('/tasks', authenticate, getTasks);
router.put('/tasks/:id', authenticate, updateTask);
router.delete('/tasks/:id', authenticate, deleteTask);

export default router;
