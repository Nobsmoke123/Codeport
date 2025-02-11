import mongoose, { QueryOptions } from 'mongoose';
import { ContentStatus, IPost, Post } from '../models';
import { NotFoundError } from '../middlewares/ErrorClasses';

export default class PostService {
  async listPosts(
    limit: number,
    cursor: string | null,
    userId: string
  ): Promise<{
    data: IPost[];
    nextCursor: string | null;
  }> {
    const query = cursor
      ? {
          _id: { $gt: new mongoose.Types.ObjectId(cursor) },
          userId,
          deleted: false,
        }
      : {
          userId,
          deleted: false,
        };

    // Set the limit to 10
    limit = limit ? limit : 10;

    const posts = await Post.find(query).limit(limit).sort({ _id: 1 });

    return {
      data: posts,
      nextCursor: posts.length ? posts[posts.length - 1]._id.toString() : null,
    };
  }

  async getPost(id: string, userId: string): Promise<IPost> {
    const post = await Post.findOne({
      _id: id,
      userId,
      deleted: false,
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
    userId: string;
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
    id: string
  ): Promise<IPost> {
    const query: QueryOptions = { _id: id };
    const post = await Post.findOneAndUpdate(query, postData, {
      new: true,
      returnDocument: 'after',
    });
    if (!post) {
      throw new NotFoundError(`Resource with ID ${id} does not exist.`);
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
      throw new NotFoundError(`Resource with ID ${id} does not exist.`);
    }

    return post;
  }
}
