import { injectable } from 'tsyringe';
import {
  CreateCategoryInput,
  GetCategoryInput,
  UpdateCategoryInput,
} from '../schemas';
import { CategoryService } from '../services';
import { Request, Response } from 'express';
import { PaginationQueryInput } from '../schemas/pagination.schema';

@injectable()
export default class CategoryController {
  // private readonly categoryService: CategoryService;

  // constructor() {
  //   this.categoryService = new CategoryService();

  //   // Bind the methods to the instance of this class
  //   // this.listCategories = this.listCategories.bind(this);
  //   // this.getCategory = this.getCategory.bind(this);
  //   // this.saveCategory = this.saveCategory.bind(this);
  //   // this.updateCategory = this.updateCategory.bind(this);
  //   // this.deleteCategory = this.deleteCategory.bind(this);
  // }

  constructor(private readonly categoryService: CategoryService) {}

  listCategories = async (
    req: Request<{}, {}, {}, PaginationQueryInput['query']>,
    res: Response
  ) => {
    const { limit, cursor } = req.query;

    const categories = await this.categoryService.listCategories(limit, cursor);

    res.status(200).json(categories);
    return;
  };

  getCategory = async (
    req: Request<GetCategoryInput['params']>,
    res: Response
  ) => {
    const { id } = req.params;

    const category = await this.categoryService.getCategory(id);

    res.status(200).json(category);
    return;
  };

  saveCategory = async (
    req: Request<{}, {}, CreateCategoryInput['body']>,
    res: Response
  ) => {
    const { image, name } = req.body;

    const category = await this.categoryService.saveCategory(name, image);

    res.status(201).json(category);
    return;
  };

  updateCategory = async (
    req: Request<
      UpdateCategoryInput['params'],
      {},
      UpdateCategoryInput['body']
    >,
    res: Response
  ) => {
    const { id } = req.params;
    const { name, image } = req.body;
    const category = await this.categoryService.updateCategory(id, name, image);

    res.status(201).json(category);
    return;
  };

  deleteCategory = async (
    req: Request<GetCategoryInput['params']>,
    res: Response
  ) => {
    const { id } = req.params;

    const category = await this.categoryService.deleteCategory(id);

    res.status(201).json(category);
    return;
  };
}
