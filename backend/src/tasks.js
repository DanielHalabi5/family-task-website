import { Router } from 'express';
import prisma from './prisma.js';
import auth from './middleware.js';

const router = Router();

router.use(auth);

router.post('/', async (req, res) => {
  const { title, content, dueDate, assignedTo } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        content: content ?? '',
        dueDate: new Date(dueDate),
        assignedTo: assignedTo ? { connect: { id: assignedTo } } : undefined,
        owner: {
          connect: { id: req.user.id },
        },
      },
    });
    res.json(task);
  } catch (err) {
    console.error('Full error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { ownerId: req.user.id },
      orderBy: { updatedAt: 'desc' },
        include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
          }
        }
        }
    });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'server error' });
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task || task.ownerId !== req.user.id)
    return res.status(404).json({ error: 'Not found' });
  res.json(task);
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { title, content, dueDate, assignedTo } = req.body;

  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task || task.ownerId !== req.user.id)
      return res.status(404).json({ error: 'Not found' });

    const updated = await prisma.task.update({
      where: { id },
      data: { title, content, dueDate, assignedTo },
    });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task || task.ownerId !== req.user.id)
      return res.status(404).json({ error: 'Not found' });
    await prisma.task.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id', async (req, res) => {
  const { ownerId } = req.body;
  const taskId = parseInt(req.params.id, 10);

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (task.ownerId !== ownerId) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Server error',
      details: error.message,
    });
  }
});

export default router;
