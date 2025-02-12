import { Router } from 'express';
import { PostController } from '../controllers';
import { AsyncWrapper, validatateSchema, authorize } from '../middlewares';
import {
  createPostSchema,
  getPostSchema,
  updatePostSchema,
  paginationSchema,
} from '../schemas';

const router = Router();

const postController = new PostController();

router.get(
  '/',
  authorize,
  validatateSchema(paginationSchema),
  AsyncWrapper(postController.listPosts)
);

router.post(
  '/',
  authorize,
  validatateSchema(createPostSchema),
  AsyncWrapper(postController.savePost)
);

router.get(
  '/:id',
  authorize,
  validatateSchema(getPostSchema),
  AsyncWrapper(postController.getPost)
);

router.patch(
  '/:id',
  authorize,
  validatateSchema(updatePostSchema),
  AsyncWrapper(postController.updatePost)
);

router.delete(
  '/:id',
  authorize,
  validatateSchema(getPostSchema),
  AsyncWrapper(postController.deletePost)
);

export default router;
