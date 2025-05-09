import { Router } from 'express';
import { validatateSchema, AsyncWrapper } from '../middlewares';
import { CategoryController } from './../controllers';
import {
  paginationSchema,
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from '../schemas';

import container from './../config/container';

const router = Router();

const categoryController = container.resolve(CategoryController);

router.get(
  '/',
  validatateSchema(paginationSchema),
  AsyncWrapper(categoryController.listCategories)
);

router.get(
  '/:id',
  validatateSchema(getCategorySchema),
  AsyncWrapper(categoryController.getCategory)
);

router.post(
  '/',
  validatateSchema(createCategorySchema),
  AsyncWrapper(categoryController.saveCategory)
);

router.patch(
  '/:id',
  validatateSchema(updateCategorySchema),
  AsyncWrapper(categoryController.updateCategory)
);

router.delete(
  '/:id',
  validatateSchema(getCategorySchema),
  AsyncWrapper(categoryController.deleteCategory)
);

export default router;
