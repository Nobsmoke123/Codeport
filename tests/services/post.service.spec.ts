import { PostService } from '../../src/services';
import { Post, IPost, ContentStatus } from '../../src/models';
import mongoose, { Query } from 'mongoose';

describe('PostService', () => {
  const postService = new PostService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('listPosts', () => {
    it('should list posts', async () => {
      const mockPost = [
        {
          _id: '2',
          title: 'The elegance of simplicity',
          content: 'Simplicity is the ultimate sophistication.',
          status: ContentStatus.Draft,
          featuredImage: 'image.png',
          userId: '6821d59bcfc689cab5b1b42b',
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const limit = 10;
      const cursor = '6821d59bcfc689cab5b1b42b';
      const userId = '1234567890abcdef12345678';

      jest.spyOn(Post, 'find').mockImplementation(
        () =>
          ({
            limit: jest.fn().mockReturnThis(),
            sort: jest.fn().mockResolvedValue(mockPost),
          } as unknown as Query<unknown[], unknown, {}, IPost, 'find', {}>)
      );

      const result = await postService.listPosts(limit, cursor, userId);

      expect(Post.find).toHaveBeenCalledWith({
        _id: { $gt: new mongoose.Types.ObjectId(cursor) },
        userId,
        deleted: false,
      });

      expect(result).toMatchObject({
        data: mockPost,
        nextCursor: '2',
      });
    });
  });

  describe('getPost', () => {
    it('should get a post with an ID.', async () => {
      const mockPost = {
        _id: '1',
        title: 'The elegance of simplicity',
        content: 'Simplicity is the ultimate sophistication.',
        status: ContentStatus.Draft,
        featuredImage: 'image.png',
        userId: '6821d59bcfc689cab5b1b42b',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const postId = '1234567890abcdef12345678';
      const userId = '1234567890abcdef12345678';

      jest.spyOn(Post, 'findOne').mockResolvedValue(mockPost);

      const result = await postService.getPost(postId, userId);

      expect(Post.findOne).toHaveBeenCalledWith({
        _id: postId,
        userId,
        deleted: false,
      });
      expect(result).toMatchObject(mockPost);
    });

    it('should throw an error if the comment does not exist.', async () => {
      const postId = '1234567890abcdef12345678';
      const userId = '1234567890abcdef12345678';

      jest.spyOn(Post, 'findOne').mockResolvedValue(null);

      await expect(postService.getPost(postId, userId)).rejects.toThrowError(
        'Resource with ID 1234567890abcdef12345678 not found.'
      );
    });
  });

  describe('savePost', () => {
    it('should save a post', async () => {
      const mockPost = {
        _id: '1',
        title: 'The elegance of simplicity',
        content: 'Simplicity is the ultimate sophistication.',
        status: ContentStatus.Draft,
        featuredImage: 'image.png',
        userId: '6821d59bcfc689cab5b1b42b',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(Post.prototype, 'save').mockResolvedValue(mockPost);

      const newPost = {
        title: 'Test Post',
        content: 'This is a test post',
        featuredImage: 'test.jpg',
        userId: '1234567890abcdef12345678',
      };

      const result = await postService.savePost(newPost);

      expect(Post.prototype.save).toHaveBeenCalled();
      expect(result).toMatchObject(mockPost);
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      const mockPost = {
        title: 'The elegance of simplicity',
        content: 'Simplicity is the ultimate sophistication.',
        status: ContentStatus.Draft,
        featuredImage: 'image.png',
        userId: '6821d59bcfc689cab5b1b42b',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const postId = '1234567890abcdef12345678';

      jest.spyOn(Post, 'findOneAndUpdate').mockResolvedValue(mockPost);

      const postData = {
        title: 'Test Post',
        content: 'This is a test post',
        featuredImage: 'test.jpg',
      };

      const result = await postService.updatePost(postData, postId);

      expect(Post.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: postId },
        postData,
        { returnDocument: 'after', new: true }
      );
      expect(result).toMatchObject(mockPost);
    });

    it('should throw an error if the comment or post is not found', async () => {
      const postId = '1234567890abcdef12345678';

      jest.spyOn(Post, 'findOneAndUpdate').mockResolvedValue(null);

      const postData = {
        title: 'Test Post',
        content: 'This is a test post',
        featuredImage: 'test.jpg',
      };

      await expect(postService.updatePost(postData, postId)).rejects.toThrow(
        'Resource with ID 1234567890abcdef12345678 does not exist.'
      );

      expect(Post.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: postId },
        { ...postData },
        { returnDocument: 'after', new: true }
      );
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const mockPost = {
        _id: '2',
        title: 'The elegance of simplicity',
        content: 'Simplicity is the ultimate sophistication.',
        status: ContentStatus.Draft,
        featuredImage: 'image.png',
        userId: '6821d59bcfc689cab5b1b42b',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const postId = '2';

      jest.spyOn(Post, 'findOneAndUpdate').mockResolvedValue(mockPost);

      const result = await postService.deletePost(postId);

      expect(Post.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: postId },
        { deleted: true },
        { returnDocument: 'after' }
      );

      expect(result).toMatchObject({
        ...mockPost,
      });
    });
  });
});
