import mongoose, { Schema, model } from 'mongoose';

export interface IComment {
  id: string;
  userId: mongoose.Types.ObjectId | string;
  postId: mongoose.Types.ObjectId | string;
  parentId: mongoose.Types.ObjectId | string; // for nested comments
  content: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    id: Schema.Types.ObjectId,
    userId: { type: Schema.Types.ObjectId, required: true },
    postId: { type: Schema.Types.ObjectId, required: true },
    parentId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        ret.userId = ret.userId.toString();
        ret.postId = ret.postId.toString();
        ret.parentId = ret.parentId.toString();
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

export const Comment = model<IComment>('Comment', commentSchema);
