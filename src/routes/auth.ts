import { Router, Request, Response } from 'express';
import AuthController from '../controllers/auth.controller';
import { AsyncWrapper } from '../middlewares/asyncErrorHandler';

const route = Router();

const authController = new AuthController();

route.post('/signin', AsyncWrapper(authController.login));

route.post('/signup', AsyncWrapper(authController.register));

export default route;
