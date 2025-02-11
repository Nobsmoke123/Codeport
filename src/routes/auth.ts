import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { AsyncWrapper } from '../middlewares/asyncErrorHandler';
import validatateSchema from '../middlewares/validation';
import { loginSchema, registrationSchema } from '../schemas/auth.schema';

const route = Router();

const authController = new AuthController();

route.post(
  '/signin',
  validatateSchema(loginSchema),
  AsyncWrapper(authController.login)
);

route.post(
  '/signup',
  validatateSchema(registrationSchema),
  AsyncWrapper(authController.register)
);

export default route;
