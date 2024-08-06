import express from 'express';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';

const app=express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

export default app;
