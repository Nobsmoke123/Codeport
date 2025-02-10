import mongoose from 'mongoose';
import { ContentStatus, IPost, Post } from '../models';
import { Logger } from '../utils/logger';

export default class PostService {
  async listPosts(
    limit: number,
    cursor: string
  ): Promise<{
    data: IPost[];
    nextCursor: mongoose.Types.ObjectId | null;
  }> {
    try {
      const query = cursor ? { _id: { $gt: cursor } } : {};

      const posts = await Post.find(query).limit(limit).sort({ _id: 1 });

      return {
        data: posts,
        nextCursor: posts.length ? posts[posts.length - 1]._id : null,
      };
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async getPost(id: string): Promise<IPost> {
    try {
      const post = await Post.findOne({
        _id: id,
      });

      if (!post) {
        throw new Error('404 - Not Found');
      }

      return post;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async savePost(postData: {
    title: string;
    content: string;
    featuredImage: string;
    userId: mongoose.Types.ObjectId;
  }): Promise<IPost> {
    try {
      const post = new Post({ ...postData, status: ContentStatus.Draft });
      const savedPost = await post.save();
      return savedPost;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  updatePost(
    postData: {
      title: string;
      content: string;
      featuredImage: string;
    },
    id: mongoose.Types.ObjectId
  ) {
    try {
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  // implement soft delete
  deletePost(id: string) {
    try {
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
