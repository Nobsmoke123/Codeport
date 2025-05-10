import { Request, Response } from 'express';
import { CommentService } from '../services/';
import { PaginationQueryDto } from '../dtos';
import {
  CreateCommentInput,
  GetCommentInput,
  ListCommentInput,
  UpdateCommentInput,
} from '../schemas';
import { injectable } from 'tsyringe';

@injectable()
export default class CommentController {
  // private readonly commentService: CommentService;

  // constructor() {
  //   this.commentService = new CommentService();
  //   // Bind the instace methods to this instance of this class
  //   // this.listAllPostComments = this.listAllPostComments.bind(this);
  //   // this.getPostComment = this.getPostComment.bind(this);
  //   // this.updatePostComment = this.updatePostComment.bind(this);
  //   // this.deletePostComment = this.deletePostComment.bind(this);
  //   // this.createPostComment = this.createPostComment.bind(this);
  // }

  constructor(private readonly commentService: CommentService) {}

  listAllPostComments = async (
    req: Request<ListCommentInput['params'], {}, {}, PaginationQueryDto>,
    res: Response
  ) => {
    const { limit, cursor } = req.query;

    const { postId } = req.params;

    const comments = await this.commentService.listPostComments(
      postId,
      limit,
      cursor
    );

    res.status(200).json(comments);
    return;
  };

  getPostComment = async (
    req: Request<GetCommentInput['params']>,
    res: Response
  ) => {
    const { postId, commentId } = req.params;

    const comment = await this.commentService.getPostComment(postId, commentId);

    res.status(200).json(comment);
    return;
  };

  createPostComment = async (
    req: Request<CreateCommentInput['params'], {}, CreateCommentInput['body']>,
    res: Response
  ) => {
    const { content, parentId } = req.body;

    const { postId } = req.params;

    const userId = req.user;

    const comment = await this.commentService.savePostComment(
      postId,
      userId,
      parentId,
      content
    );

    res.status(201).json(comment);
    return;
  };

  updatePostComment = async (
    req: Request<UpdateCommentInput['params'], {}, UpdateCommentInput['body']>,
    res: Response
  ) => {
    const { commentId, postId } = req.params;

    const { content } = req.body;

    const comment = await this.commentService.updatePostComment(
      postId,
      commentId,
      content
    );

    res.status(200).json(comment);
    return;
  };

  deletePostComment = async (
    req: Request<GetCommentInput['params']>,
    res: Response
  ) => {
    const { commentId, postId } = req.params;

    const comment = await this.commentService.deletePostComment(
      postId,
      commentId
    );

    res.status(201).json(comment);
    return;
  };
}
