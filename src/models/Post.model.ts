import { Schema, model } from 'mongoose';

export enum ContentStatus {
  Draft = 'draft',
  Published = 'published',
  Premium = 'premium',
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  status: ContentStatus;
  featuredImage: string;
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    id: Schema.Types.ObjectId,
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    status: { type: String, required: true },
    featuredImage: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

export const Post = model('Post', postSchema);
