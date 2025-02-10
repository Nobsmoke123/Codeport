import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { AsyncWrapper } from '../middlewares/asyncErrorHandler';
import { authorize } from '../middlewares/authorization';
const router = Router();
const postController = new PostController();

router.post('/', authorize, AsyncWrapper(postController.savePost));

router.get('/', authorize, AsyncWrapper(postController.listPosts));

router.get('/:id', authorize, AsyncWrapper(postController.getPost));

router.patch('/:id', authorize, AsyncWrapper(postController.updatePost));

router.delete('/:id', authorize, AsyncWrapper(postController.deletePost));

export default router;
