import { Request, Response } from 'express';
import CommentService from '../services/comment.service';

export default class CommentController {
  private readonly commentService: CommentService;
  constructor() {
    this.commentService = new CommentService();
    // Bind the instace methods to this instance of this class
    this.listAllPostComments = this.listAllPostComments.bind(this);
    this.getPostComment = this.getPostComment.bind(this);
    this.updatePostComment = this.updatePostComment.bind(this);
    this.deletePostComment = this.deletePostComment.bind(this);
    this.createPostComment = this.createPostComment.bind(this);
  }
  async listAllPostComments(req: Request, res: Response) {}
  async getPostComment(req: Request, res: Response) {}
  async createPostComment(req: Request, res: Response) {}
  async updatePostComment(req: Request, res: Response) {}
  async deletePostComment(req: Request, res: Response) {}
}
