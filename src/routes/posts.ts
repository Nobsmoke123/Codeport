import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { AsyncWrapper } from '../middlewares/asyncErrorHandler';

const router = Router();
const postController = new PostController();

router.post('/', AsyncWrapper(postController.savePost));

router.get('/', AsyncWrapper(postController.listPosts));

router.get('/:id', AsyncWrapper(postController.getPost));

router.patch('/:id', AsyncWrapper(postController.updatePost));

router.delete('/:id', AsyncWrapper(postController.deletePost));

export default router;
