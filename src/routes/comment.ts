import { Router } from 'express';
import { CommentController } from '../controllers';
import { AsyncWrapper, validatateSchema } from '../middlewares';
import {
  createCommentSchema,
  getCommentSchema,
  listCommentSchema,
  updateCommentSchema,
} from '../schemas';

import container from '../config/container';

const router = Router();

const commentController = container.resolve(CommentController);

router.get(
  '/',
  validatateSchema(listCommentSchema),
  AsyncWrapper(commentController.listAllPostComments)
);

router.get(
  '/:postId/:commentId',
  validatateSchema(getCommentSchema),
  AsyncWrapper(commentController.getPostComment)
);

router.post(
  '/:postId/comments',
  validatateSchema(createCommentSchema),
  AsyncWrapper(commentController.createPostComment)
);

router.patch(
  '/:postId/comments/:commentId',
  validatateSchema(updateCommentSchema),
  AsyncWrapper(commentController.updatePostComment)
);

router.delete(
  '/:postId/comments/:commentId',
  validatateSchema(getCommentSchema),
  AsyncWrapper(commentController.deletePostComment)
);

export default router;
