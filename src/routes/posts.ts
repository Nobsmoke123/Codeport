import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { AsyncWrapper } from '../middlewares/asyncErrorHandler';
import { authorize } from '../middlewares/authorization';
import validatateSchema from '../middlewares/validation';
import { paginationSchema } from '../schemas/pagination.schema';

const router = Router();

const postController = new PostController();

router.get(
  '/',
  authorize,
  validatateSchema(paginationSchema),
  AsyncWrapper(postController.listPosts)
);

router.post('/', authorize, AsyncWrapper(postController.savePost));

router.get('/:id', authorize, AsyncWrapper(postController.getPost));

router.patch('/:id', authorize, AsyncWrapper(postController.updatePost));

router.delete('/:id', authorize, AsyncWrapper(postController.deletePost));

export default router;
