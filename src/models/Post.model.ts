import mongoose, { Schema, model } from 'mongoose';

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
  // TODO: Add Categories here. For the ability to filter posts by categoryIds
  userId: mongoose.Types.ObjectId | string;
  deleted: boolean; // soft delete
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    id: Schema.Types.ObjectId,
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(ContentStatus),
      required: true,
    },
    featuredImage: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Post = model<IPost>('Post', postSchema);
