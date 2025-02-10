import { Request, Response } from 'express';
import { GetPostParamDto, PostDataDto, PaginationQueryDto } from '../dtos/';
import PostService from '../services/post.service';

export default class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  async listPosts(req: Request<{}, {}, {}, PaginationQueryDto>, res: Response) {
    let { limit, cursor } = req.query;

    const userId = req.user;

    const posts = await this.postService.listPosts(+limit, cursor, userId);

    return res.status(200).json(posts);
  }

  async getPost(req: Request<GetPostParamDto>, res: Response) {
    const { id } = req.params;

    const post = await this.postService.getPost(id);

    return res.status(200).json(post);
  }

  async savePost(req: Request<{}, {}, PostDataDto>, res: Response) {
    const { title, content, featuredImage } = req.body;

    const userId = req.user;

    const post = await this.postService.savePost({
      title,
      content,
      featuredImage,
      userId,
    });

    return res.status(201).json(post);
  }

  async updatePost(
    req: Request<GetPostParamDto, {}, PostDataDto>,
    res: Response
  ) {
    const { title, content, featuredImage } = req.body;

    const { id } = req.params;

    const post = await this.postService.updatePost(
      { title, content, featuredImage },
      id
    );

    return res.status(200).json(post);
  }

  async deletePost(req: Request<GetPostParamDto>, res: Response) {
    const { id } = req.params;

    const post = await this.postService.deletePost(id);

    return res.status(200).json(post);
  }
}
