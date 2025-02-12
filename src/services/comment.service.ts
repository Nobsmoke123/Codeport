import { Comment, IComment } from '../models';

export default class CommentService {
  async listPostComments(postId: string) {}

  async getPostComment(postId: string, commentId: string) {}

  async savePostComment(postId: string) {}

  async updatePostComment(postId: string, commentId: string) {}

  async deletePostComment(postId: string, commentId: string) {}
}
