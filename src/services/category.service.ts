import mongoose from 'mongoose';
import { Category, ICategory } from '../models';
import { NotFoundError } from '../middlewares/ErrorClasses';
import { injectable } from 'tsyringe';

@injectable()
export default class CategoryService {
  async listCategories(
    limit: number | null,
    cursor: string | null
  ): Promise<{ data: Array<ICategory>; cursor: string | null }> {
    const query = cursor
      ? { _id: { $gt: new mongoose.Types.ObjectId(cursor) }, deleted: false }
      : { deleted: false };
    limit = limit || 10;

    const categories = await Category.find(query).limit(limit).sort({ _id: 1 });

    return {
      data: categories,
      cursor: categories.length
        ? categories[categories.length - 1]._id.toString()
        : null,
    };
  }

  async getCategory(id: string): Promise<ICategory> {
    const category = await Category.findOne({ _id: id, deleted: false });
    if (!category) throw new NotFoundError(`Resource with ID:${id} not found.`);
    return category;
  }

  async saveCategory(name: string, image: string): Promise<ICategory> {
    const category = new Category({
      name,
      image,
    });

    return await category.save();
  }

  async updateCategory(
    id: string,
    name: string,
    image: string
  ): Promise<ICategory> {
    const query = { _id: id };
    const data = { name, image };
    const category = await Category.findOneAndUpdate(query, data, {
      returnDocument: 'after',
      new: true,
    });

    if (!category) {
      throw new NotFoundError(`Resource with ID: ${id} does not exist.`);
    }

    return category;
  }

  //   soft delete
  async deleteCategory(id: string): Promise<ICategory> {
    const query = { _id: id };

    const data = { deleted: true };

    const category = await Category.findOneAndUpdate(query, data, {
      returnDocument: 'after',
      new: true,
    });

    if (!category) {
      throw new NotFoundError(`Resource with ID: ${id} does not exist.`);
    }

    return category;
  }
}
