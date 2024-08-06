import { Router } from 'express';
import { createPost, getAllPosts, getPostsByAuthor } from '../controllers/postController';
import { authMiddleware } from '../middlewars/auth';

const router = Router();

router.post('/', authMiddleware, createPost);
router.get('/', getAllPosts);
router.get('/by-author', getPostsByAuthor);

export default router;
