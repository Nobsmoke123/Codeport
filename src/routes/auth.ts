import { Router, Request, Response } from 'express';
import AuthController from '../controllers/auth.controller';

const route = Router();

const authController = new AuthController();

route.post('/signin', authController.login);

route.post('/signup', authController.register);

export default route;
