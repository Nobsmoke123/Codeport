import { injectable } from 'tsyringe';
import { NotFoundError } from '../middlewares';
import { Comment, IComment } from '../models';

@injectable()
export default class CommentService {
  async listPostComments(
    postId: string,
    limit: number,
    cursor: string | null
  ): Promise<{
    data: Array<IComment>;
    cursor: string | null;
  }> {
    const query = cursor
      ? { _id: { $gt: cursor }, postId, deleted: false }
      : { postId, deleted: false };

    const comments = await Comment.find(query)
      .limit(limit)
      .sort({ createdAt: 1 });

    return {
      data: comments,
      cursor: comments.length
        ? comments[comments.length - 1]._id.toString()
        : null,
    };
  }

  async getPostComment(postId: string, commentId: string): Promise<IComment> {
    const comment = await Comment.findOne({
      _id: commentId,
      postId,
      deleted: false,
    });

    if (!comment) {
      throw new NotFoundError(`Resource with ID ${commentId} does not exist.`);
    }

    return comment;
  }

  async savePostComment(
    postId: string,
    userId: string,
    parentId: string | null,
    content: string
  ): Promise<IComment> {
    const comment = new Comment({
      postId,
      userId,
      parentId,
      content,
    });

    return await comment.save();
  }

  async updatePostComment(
    postId: string,
    commentId: string,
    content: string
  ): Promise<IComment> {
    const query = { _id: commentId, postId, deleted: false };

    const data = { content };

    const comment = await Comment.findOneAndUpdate(query, data, {
      returnDocument: 'after',
      new: true,
    });

    if (!comment) {
      throw new NotFoundError(`Resource with ID ${commentId} does not exist.`);
    }

    return comment;
  }

  async deletePostComment(postId: string, commentId: string) {
    const query = { _id: commentId, postId, deleted: false };

    const data = { deleted: true };

    const comment = await Comment.findOneAndUpdate(query, data, {
      returnDocument: 'after',
      new: true,
    });

    if (!comment) {
      throw new NotFoundError(`Resource with ID ${commentId} does not exist.`);
    }

    return comment;
  }
}
