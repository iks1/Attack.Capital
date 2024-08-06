import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import app from './app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// const app = express();
const PORT = 3001;
// const JWT_SECRET = 'somesecret';

// app.use(express.json());
// app.use(cookieParser());

// const JWT_EXPIRY = '1h'; 
// const COOKIE_OPTIONS = {
//   httpOnly: true,
//   secure: true, 
//   sameSite: 'lax' as const, 
// };

// app.post('/api/login', (req: Request, res: Response) => {
//   const { username, password } = req.body;
//   if (username === 'user' && password === 'password') {
//     const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
//     res.cookie('token', token, { httpOnly: true });
//     res.json({ token });
//   } else {
//     res.status(401).json({ error: 'Invalid credentials' });
//   }
// });

// app.get('/api/verify', (req: Request, res: Response) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     res.json({ valid: true, decoded });
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// });

// app.post('/api/logout', (req: Request, res: Response) => {
//   res.clearCookie('token', COOKIE_OPTIONS);
//   res.send('Logged out');
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

