import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true }));
app.use(json());

app.use('/api/auth', authRoutes);


app.get('/', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`https://localhost:${PORT}`);
});
