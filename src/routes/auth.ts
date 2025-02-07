import { Router, Request, Response } from 'express';
import AuthController from '../controllers/auth.controller';

const route = Router();

const authController = new AuthController();

route.get('/login', (req: Request, res: Response) => {
    return res.status(200).json({
        msg: 'Welcome to login'
    })
})

route.post('/login', authController.login);

export default route;
