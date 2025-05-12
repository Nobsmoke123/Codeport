import { CommentService } from '../../src/services';
import { Comment, IComment } from '../../src/models';
import { Query } from 'mongoose';

describe('CommentService', () => {
  const commentService = new CommentService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('listPostComments', () => {
    it('should list post comments', async () => {
      const mockedPostComments = [
        {
          _id: '1',
          userId: 'user1',
          postId: 'post1',
          parentId: 'parent1',
          content: 'This is a comment',
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: '2',
          userId: 'user2',
          postId: 'post2',
          parentId: 'parent2',
          content: 'This is the second comment',
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const limit = 10;
      const cursor = '6821d59bcfc689cab5b1b42b';
      const postId = '1234567890abcdef12345678';

      jest.spyOn(Comment, 'find').mockImplementation(
        () =>
          ({
            limit: jest.fn().mockReturnThis(),
            sort: jest.fn().mockResolvedValue(mockedPostComments),
          } as unknown as Query<unknown[], unknown, {}, IComment, 'find', {}>)
      );

      const result = await commentService.listPostComments(
        postId,
        limit,
        cursor
      );

      expect(Comment.find).toHaveBeenCalledWith({
        _id: { $gt: cursor },
        postId,
        deleted: false,
      });
      expect(result).toMatchObject({
        data: mockedPostComments,
        cursor: '2',
      });
    });
  });

  describe('getPostComment', () => {
    it('should get a post comment with an ID.', async () => {
      const mockPostComment = {
        _id: '1',
        userId: 'user1',
        postId: 'post1',
        parentId: 'parent1',
        content: 'This is a comment',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const postId = '1234567890abcdef12345678';
      const commentId = '1234567890abcdef12345678';

      jest.spyOn(Comment, 'findOne').mockResolvedValue(mockPostComment);

      const result = await commentService.getPostComment(postId, commentId);

      expect(Comment.findOne).toHaveBeenCalledWith({
        _id: commentId,
        postId,
        deleted: false,
      });
      expect(result).toMatchObject(mockPostComment);
    });

    it('should throw an error if the comment does not exist.', async () => {
      const postId = '1234567890abcdef12345678';
      const commentId = '1234567890abcdef12345678';

      jest.spyOn(Comment, 'findOne').mockResolvedValue(null);

      await expect(
        commentService.getPostComment(postId, commentId)
      ).rejects.toThrowError(
        'Resource with ID 1234567890abcdef12345678 does not exist.'
      );
    });
  });

  describe('savePostComment', () => {
    it('should save a post comment', async () => {
      const mockPostComment = {
        _id: '1',
        userId: 'user1',
        postId: 'post1',
        parentId: 'parent1',
        content: 'This is a comment',
        deleted: false,
      };

      jest.spyOn(Comment.prototype, 'save').mockResolvedValue(mockPostComment);

      const postId = '1234567890abcdef12345678';
      const userId = 'user1';
      const parentId = 'parent1';
      const content = 'This is a comment';

      const result = await commentService.savePostComment(
        postId,
        userId,
        parentId,
        content
      );

      expect(Comment.prototype.save).toHaveBeenCalled();
      expect(result).toMatchObject(mockPostComment);
    });
  });

  describe('updatePostComment', () => {
    it('should update a post comment', async () => {
      const mockPostComment = {
        _id: '1',
        userId: 'user1',
        postId: 'post1',
        parentId: 'parent1',
        content: 'Updated comment',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const postId = '1234567890abcdef12345678';
      const commentId = '1234567890abcdef12345678';
      const content = 'Updated comment';

      jest
        .spyOn(Comment, 'findOneAndUpdate')
        .mockResolvedValue(mockPostComment);

      const result = await commentService.updatePostComment(
        postId,
        commentId,
        content
      );

      expect(Comment.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: commentId, postId, deleted: false },
        { content },
        { returnDocument: 'after', new: true }
      );
      expect(result).toMatchObject(mockPostComment);
    });

    it('should throw an error if the comment or post is not found', async () => {
      const postId = '1234567890abcdef12345678';
      const commentId = '1234567890abcdef12345678';
      const content = 'Updated comment';

      jest.spyOn(Comment, 'findOneAndUpdate').mockResolvedValue(null);

      await expect(
        commentService.updatePostComment(postId, commentId, content)
      ).rejects.toThrow(
        'Resource with ID 1234567890abcdef12345678 does not exist.'
      );

      expect(Comment.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: commentId, postId, deleted: false },
        { content },
        { returnDocument: 'after', new: true }
      );
    });
  });

  describe('deletePostComment', () => {
    it('should delete a post comment', async () => {
      const mockPostComment = {
        _id: '1',
        userId: 'user1',
        postId: 'post1',
        parentId: 'parent1',
        content: 'This is a comment',
        deleted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        toJSON: jest.fn().mockReturnValue({
          _id: '1',
          userId: 'user1',
          postId: 'post1',
          parentId: 'parent1',
          content: 'This is a comment',
          deleted: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      };

      const postId = '1234567890abcdef12345678';
      const commentId = '1234567890abcdef12345678';

      jest
        .spyOn(Comment, 'findOneAndUpdate')
        .mockResolvedValue(mockPostComment);

      const result = await commentService.deletePostComment(postId, commentId);

      expect(Comment.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: commentId, postId, deleted: false },
        { deleted: true },
        { returnDocument: 'after', new: true }
      );
      expect(result).toMatchObject({
        _id: '1',
        userId: 'user1',
        postId: 'post1',
        parentId: 'parent1',
        content: 'This is a comment',
        deleted: true,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });
});
