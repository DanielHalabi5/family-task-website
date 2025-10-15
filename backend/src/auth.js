import { Router } from 'express';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { user as _user } from './prisma';
const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const existing = await _user.findUnique({ where: { email } });

    if (existing) {
      return res.status(409).json({ error: 'user already exists' });
    }
    const hashed = await hash(password, 10);
    const user = await _user.create({
      data: { email, password: hashed, name },
    });
    const token = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({
      error: 'Server error',
      details: error.message,
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'email or password required' });

  try {
    const user = await _user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '7d',
    });
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ownerId = parseInt(req.params.id, 10);
    const user = await _user.findUnique({ where: { id: ownerId } });

    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: 'Server error',
      details: err.message,
    });
  }
});

export default router;
