import { Schema, model } from 'mongoose';

export interface IComment {
  id: string;
  userId: Schema.Types.ObjectId;
  postId: Schema.Types.ObjectId;
  parentId: Schema.Types.ObjectId; // for nested comments
  content: string;
  createdAt: string;
  updatedAt: string;
}

const commentSchema = new Schema<IComment>(
  {
    id: Schema.Types.ObjectId,
    userId: { type: Schema.Types.ObjectId, required: true },
    postId: { type: Schema.Types.ObjectId, required: true },
    parentId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Comment = model('Comment', commentSchema);
