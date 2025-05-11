import { CommentController } from '../../src/controllers';
import { CommentService } from '../../src/services';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { Request } from 'express';
import { ListCommentInput } from '../../src/schemas';
import { IComment } from '../../src/models';
import { PaginationQueryInput } from '../../src/schemas/pagination.schema';

describe('CommentController', () => {
  const commentService = new CommentService();
  const commentController = new CommentController(commentService);

  const mockSingleComment = {
    id: '456',
    content: 'This is a comment',
    userId: '1',
    postId: '1',
    parentId: '233',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockedPostComments = [
    {
      id: '456',
      content: 'This is a comment',
      userId: '1',
      postId: '1',
      parentId: '233',
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ] as Array<IComment>;

  beforeAll(() => {
    jest.spyOn(commentService, 'listPostComments').mockResolvedValue({
      data: mockedPostComments,
      cursor: 'nextCursor',
    });

    jest
      .spyOn(commentService, 'getPostComment')
      .mockResolvedValue(mockedPostComments[0]);

    jest
      .spyOn(commentService, 'savePostComment')
      .mockResolvedValue({ ...mockSingleComment });

    jest.spyOn(commentService, 'updatePostComment').mockResolvedValue({
      ...mockSingleComment,
    });

    jest.spyOn(commentService, 'deletePostComment').mockResolvedValue({
      ...mockSingleComment,
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should list all post comments', async () => {
    const mockReq = getMockReq({
      params: { postId: '1' },
      query: {
        limit: '1',
        cursor: 'nextCursor',
      },
    }) as unknown as Request<
      ListCommentInput['params'],
      {},
      {},
      PaginationQueryInput['query']
    >;

    const { res: mockRes } = getMockRes();

    await commentController.listAllPostComments(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      data: mockedPostComments,
      cursor: 'nextCursor',
    });
  });

  it('should get a post comment', async () => {
    const mockReq = getMockReq({
      params: {
        postId: '1',
        commentId: '456',
      },
    }) as Request<{ postId: string; commentId: string }>;

    const { res: mockRes } = getMockRes();

    await commentController.getPostComment(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockedPostComments[0]);
  });

  it('should create a post comment', async () => {
    const mockReq = getMockReq({
      params: {
        postId: '1',
      },
      body: {
        content: 'This is a new comment',
        parentId: null,
      },
    }) as Request<
      { postId: string },
      {},
      { content: string; parentId: string }
    >;

    const { res: mockRes } = getMockRes();

    await commentController.createPostComment(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ ...mockSingleComment });
  });

  it('should update a post comment', async () => {
    const mockReq = getMockReq({
      params: {
        postId: '1',
        commentId: '456',
      },
      body: {
        content: 'Updated comment',
      },
    }) as Request<
      { postId: string; commentId: string },
      {},
      { content: string }
    >;

    const { res: mockRes } = getMockRes();

    await commentController.updatePostComment(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ ...mockSingleComment });
    expect(commentService.updatePostComment).toHaveBeenCalledTimes(1);
  });

  it('should delete a post comment', async () => {
    const mockReq = getMockReq({
      params: {
        postId: '1',
        commentId: '456',
      },
    }) as Request<{ postId: string; commentId: string }>;

    const { res: mockRes } = getMockRes();
    await commentController.deletePostComment(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ ...mockSingleComment });
    expect(commentService.deletePostComment).toHaveBeenCalledWith(
      mockReq.params.postId,
      mockReq.params.commentId
    );
    expect(commentService.deletePostComment).toHaveBeenCalledTimes(1);
  });
});
