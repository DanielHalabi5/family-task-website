
require('dotenv').config();
import express, { json } from 'express';
import cors from 'cors';
import authRoutes from './auth';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: true }));
app.use(json());

app.use('/api/auth', authRoutes);


app.get('/', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`https://localhost:${PORT}`);
});
