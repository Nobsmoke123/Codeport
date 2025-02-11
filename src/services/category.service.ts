import mongoose from 'mongoose';
import { Category } from '../models';
import { NotFoundError } from '../middlewares/ErrorClasses';

export class CategoryService {
  async listCategories(limit: number, cursor: string | null) {
    const query = cursor
      ? { _id: { $gt: new mongoose.Types.ObjectId(cursor) } }
      : {};

    const categories = await Category.find(query).limit(limit).sort({ _id: 1 });

    return categories;
  }

  async getCategory(id: string) {
    const category = await Category.findOne({ _id: id });
    if (!category) throw new NotFoundError(`Resource with ID:${id} not found.`);
    return category;
  }

  async saveCategory(name: string, image: string) {
    const category = new Category({
      name,
      image,
    });

    return await category.save();
  }

  async updateCategory(id: string, name: string, image: string) {
    const query = { _id: id };
    const data = { name, image };
    const category = await Category.findOneAndUpdate(query, data, {
      returnDocument: 'after',
      new: true,
    });
    return category;
  }

  //   soft delete
  async deleteCategory(id: string) {
    const query = { _id: id };
    const data = { deleted: true };
    const category = await Category.findOneAndUpdate(query, data, {
      returnDocument: 'after',
      new: true,
    });
    return category;
  }
}
