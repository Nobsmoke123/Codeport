import { Request, Response } from 'express';
import { GetPostParamDto, PostDataDto, PaginationQueryDto } from '../dtos/';
import { PostService } from '../services';
import { injectable } from 'tsyringe';

@injectable()
export default class PostController {
  // private readonly postService: PostService;

  // constructor() {
  //   this.postService = new PostService();
  //   // Binding the methods to the "this" context of the PostController instance
  //   // this.listPosts = this.listPosts.bind(this);
  //   // this.getPost = this.getPost.bind(this);
  //   // this.savePost = this.savePost.bind(this);
  //   // this.deletePost = this.deletePost.bind(this);
  //   // this.updatePost = this.updatePost.bind(this);
  // }

  constructor(private readonly postService: PostService) {}

  listPosts = async (
    req: Request<{}, {}, {}, PaginationQueryDto>,
    res: Response
  ) => {
    let { limit, cursor } = req.query;

    const userId = req.user;

    const posts = await this.postService.listPosts(limit, cursor, userId);

    res.status(200).json(posts);
    return;
  };

  getPost = async (req: Request<GetPostParamDto>, res: Response) => {
    const { id } = req.params;

    const userId = req.user;

    const post = await this.postService.getPost(id, userId);

    res.status(200).json(post);
    return;
  };

  savePost = async (req: Request<{}, {}, PostDataDto>, res: Response) => {
    const { title, content, featuredImage } = req.body;

    const userId = req.user;

    const post = await this.postService.savePost({
      title,
      content,
      featuredImage,
      userId,
    });

    res.status(201).json(post);
    return;
  };

  updatePost = async (
    req: Request<GetPostParamDto, {}, PostDataDto>,
    res: Response
  ) => {
    const { title, content, featuredImage } = req.body;

    const { id } = req.params;

    const post = await this.postService.updatePost(
      { title, content, featuredImage },
      id
    );

    res.status(200).json(post);
    return;
  };

  deletePost = async (req: Request<GetPostParamDto>, res: Response) => {
    const { id } = req.params;

    const post = await this.postService.deletePost(id);

    res.status(200).json(post);
    return;
  };
}
