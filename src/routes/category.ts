import { Router } from 'express';

import { validatateSchema, AsyncWrapper } from '../middlewares';

import {
  paginationSchema,
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from '../schemas';

import { CategoryController } from './../controllers';

const router = Router();

const categoryController = new CategoryController();

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
