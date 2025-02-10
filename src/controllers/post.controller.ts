import { Request, Response } from 'express';
import { PostQueryParams } from '../dtos/postQuery.dto';
import PostService from '../services/post.service';

export default class PostController {
  constructor(public postService: PostService) {
    this.postService = new PostService();
  }

  listPosts(req: Request<{}, {}, {}, PostQueryParams>, res: Response) {
    const { limit, cursor } = req.query;

    const posts = this.postService.listPosts(limit, cursor);

    res.status(200).json(posts);
  }

  getPost(req: Request, res: Response) {}

  savePost(req: Request, res: Response) {}

  updatePost(req: Request, res: Response) {}

  deletePost(req: Request, res: Response) {}
}
