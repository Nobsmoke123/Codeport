import { PaginationQueryDto } from '../dtos';
import {
  CreateCategoryInput,
  GetCategoryInput,
  UpdateCategoryInput,
} from '../schemas';
import { CategoryService } from '../services';
import { Request, Response } from 'express';

export default class CategoryController {
  private readonly categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();

    // Bind the methods to the instance of this class
    this.listCategories = this.listCategories.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  async listCategories(
    req: Request<{}, {}, {}, PaginationQueryDto>,
    res: Response
  ) {
    const { limit, cursor } = req.query;

    const categories = await this.categoryService.listCategories(limit, cursor);

    return res.status(200).json(categories);
  }

  async getCategory(req: Request<GetCategoryInput['params']>, res: Response) {
    const { id } = req.params;

    const category = await this.categoryService.getCategory(id);

    return res.status(200).json(category);
  }

  async saveCategory(
    req: Request<{}, {}, CreateCategoryInput['body']>,
    res: Response
  ) {
    const { image, name } = req.body;

    const category = await this.categoryService.saveCategory(name, image);

    return res.status(201).json(category);
  }

  async updateCategory(
    req: Request<
      UpdateCategoryInput['params'],
      {},
      UpdateCategoryInput['body']
    >,
    res: Response
  ) {
    const { id } = req.params;
    const { name, image } = req.body;
    const category = await this.categoryService.updateCategory(id, name, image);

    return res.status(201).json(category);
  }

  async deleteCategory(
    req: Request<GetCategoryInput['params']>,
    res: Response
  ) {
    const { id } = req.params;

    const category = await this.categoryService.deleteCategory(id);

    return res.status(201).json(category);
  }
}
