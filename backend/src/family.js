import { Router } from 'express';
import jwt from 'jsonwebtoken';
import prisma from './prisma.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

const { sign } = jwt;

router.post('/create', async (req, res) => {
  const { name, userId } = req.body;
  if (!name) return res.status(400).json({ error: 'Family name required!' });

  try {
    const oneFamilyUser = await prisma.family.findUnique({
      where: { ownerId: userId },
    });
    if (oneFamilyUser)
      return res.status(409).json({ error: 'This User already has a Family!' });

    const family = await prisma.family.create({
      data: { name, ownerId: userId },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { familyId: family.id },
    });

    const token = sign({ familyId: family.id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      token,
      family: { id: family.id, name: family.name, ownerId: userId },
    });
  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

router.get('/members/:id', async (req, res) => {
  try {
    const familyId = Number(req.params.id);
    const familyMember = await prisma.family.findMany({
      where: { id: familyId },
    });

    if (!note) return res.status(404).json({ error: 'Not found' });
    res.json(familyMember);
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const familyId = Number(req.params.id);
  const { userId } = req.body; // the user to remove

  try {
    const family = await prisma.family.findUnique({ where: { id: familyId } });
    if (!family) return res.status(404).json({ error: 'Family not found' });

    if (family.ownerId !== req.user.id)
      return res.status(403).json({ error: 'Forbidden' });

    await prisma.user.update({
      where: { id: userId },
      data: { familyId: null },
    });

    res.json({ message: `User was successfully removed from the family.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
