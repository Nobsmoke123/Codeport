import mongoose, { QueryOptions } from 'mongoose';
import { ContentStatus, IPost, Post } from '../models';
import { NotFoundError } from '../middlewares/ErrorClasses';

export default class PostService {
  async listPosts(
    limit: number,
    cursor: string
  ): Promise<{
    data: IPost[];
    nextCursor: mongoose.Types.ObjectId | null;
  }> {
    const query = cursor ? { _id: { $gt: cursor } } : {};

    const posts = await Post.find(query).limit(limit).sort({ _id: 1 });

    return {
      data: posts,
      nextCursor: posts.length ? posts[posts.length - 1]._id : null,
    };
  }

  async getPost(id: string): Promise<IPost> {
    const post = await Post.findOne({
      _id: id,
    });

    if (!post) {
      throw new NotFoundError(`Resource with ID ${id} not found.`);
    }

    return post;
  }

  async savePost(postData: {
    title: string;
    content: string;
    featuredImage: string;
    userId: mongoose.Types.ObjectId;
  }): Promise<IPost> {
    const post = new Post({ ...postData, status: ContentStatus.Draft });
    const savedPost = await post.save();
    return savedPost;
  }

  async updatePost(
    postData: {
      title: string;
      content: string;
      featuredImage: string;
    },
    id: mongoose.Types.ObjectId
  ): Promise<IPost> {
    const query: QueryOptions = { _id: id };
    const post = await Post.findOneAndUpdate(query, postData, {
      new: true,
      returnDocument: 'after',
    });
    if (!post) {
      throw new Error('404 - Not Found');
    }
    return post;
  }

  // implement soft delete
  async deletePost(id: string): Promise<IPost> {
    const query = { _id: id };
    const update = { deleted: true };
    const post = await Post.findOneAndUpdate(query, update, {
      returnDocument: 'after',
    });

    if (!post) {
      throw new Error('404 - Not Found');
    }

    return post;
  }
}
