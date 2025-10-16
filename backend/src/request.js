import { Router } from 'express';
import jwt from 'jsonwebtoken';
import prisma from './prisma.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

const { sign } = jwt;

router.post('/request', async (req, res) => {
  const { userId, familyId } = req.body;

  try {
    const existing = await prisma.prisma.familyJoinRequest.findUnique({
      where: { userId, familyId },
    });
    if (existing)
      return res.status(409).json({ error: 'Join Request was Already Sent!' });

    const request = await prisma.familyJoinRequest.create({
      data: {
        userId: userId,
        familyId: familyId,
        status: 'PENDING',
      },
    });

    res.json({
      token,
      request: {
        id: request.id,
        userId: userId,
        familyId: familyId,
        status: 'PENDING',
      },
    });
  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

router.post('/:id', async (req, res) => {
  const { requestId } = req.params;
  const { action } = req.body;
  const ownerId = req.user.id;

  try {
    const request = await prisma.familyJoinRequest.findUnique({
      where: { id: parseInt(requestId) },
      include: { family: true, user: true },
    });

    if (!request) return res.status(404).json({ error: 'Request not found' });

    if (request.family.ownerId !== ownerId)
      return res.status(403).json({ error: 'Not authorized' });

    if (action === 'APPROVE') {
      await prisma.user.update({
        where: { id: request.userId },
        data: { familyId: request.familyId },
      });

      await prisma.familyJoinRequest.update({
        where: { id: request.id },
        data: { status: 'APPROVED' },
      });
    } else if (action === 'REJECT') {
      await prisma.familyJoinRequest.update({
        where: { id: request.id },
        data: { status: 'REJECTED' },
      });
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

    res.json({ message: `Request ${action.toLowerCase()}ed successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

export default router;
