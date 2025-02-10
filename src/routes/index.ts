import { Router, Request, Response } from 'express';
import authRoutes from './auth';
import postRoutes from './posts';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  return res.status(200).json({
    msg: 'Server active!',
  });
});

// Add all other routes in here
router.use('/auth', authRoutes);
router.use('/posts', postRoutes);

export default router;
