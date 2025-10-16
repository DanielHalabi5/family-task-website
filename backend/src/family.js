import { Router } from 'express';
import jwt from 'jsonwebtoken';
import prisma from './prisma.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

const { sign } = jwt;

router.post('/create', (req, res) =>{
  const { name, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'User already exists' });

    const hashed = await hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashed, name } });

    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});