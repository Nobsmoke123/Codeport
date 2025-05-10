import { Router } from 'express';
import { AuthController } from '../controllers';
import { AsyncWrapper, validatateSchema } from '../middlewares';
import { loginSchema, registrationSchema } from '../schemas';

import container from './../config/container';

const route = Router();

const authController = container.resolve(AuthController);

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
