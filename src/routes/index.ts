import { Router, Request, Response } from 'express';
import authRoutes from './auth';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  return res.status(200).json({
    msg: 'Server active!',
  });
});

// Add all other routes in here
router.use('/auth', authRoutes);

export default router;
