import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { AsyncWrapper } from '../middlewares/asyncErrorHandler';

const router = Router();
const postController = new PostController();

router.get('/', AsyncWrapper(postController.listPosts));

router.post('/', AsyncWrapper(postController.savePost));

router.patch('/:id', AsyncWrapper(postController.updatePost));

router.delete('/:id', AsyncWrapper(postController.deletePost));

export default router;
