import { Schema, model } from 'mongoose';

export interface ICategory {
  id: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Category = model('Category', categorySchema);
