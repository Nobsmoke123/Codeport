import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/login', function (req: Request, res: Response) {
  res.status(200).json({
    msg: 'Login with [email/username] and password.',
  });
});
router.get('/register', function (req: Request, res: Response) {
    res.status(200).json();
});
router.post('/login', function (req: Request, res: Response) {});
router.post('/register', function (req: Request, res: Response) {});

export default router;
