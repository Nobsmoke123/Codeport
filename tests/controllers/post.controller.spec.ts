import { PostController } from '../../src/controllers';
import { ContentStatus } from '../../src/models';
import { PostService } from '../../src/services';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { Request } from 'express';

describe('PostController', () => {
  const postService = new PostService();
  const postController = new PostController(postService);

  const mockSinglePost = {
    id: '123',
    title: 'Test Post',
    content: 'This is a test post',
    userId: '1',
    status: ContentStatus.Draft,
    featuredImage: 'image.jpg',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockedPosts = [
    {
      id: '123',
      title: 'Test Post',
      content: 'This is a test post',
      userId: '1',
      status: ContentStatus.Draft,
      featuredImage: 'image.jpg',
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeAll(() => {
    jest.spyOn(postService, 'listPosts').mockResolvedValue({
      data: mockedPosts,
      nextCursor: 'nextCursor',
    });

    jest.spyOn(postService, 'getPost').mockResolvedValue(mockedPosts[0]);

    jest
      .spyOn(postService, 'savePost')
      .mockResolvedValue({ ...mockSinglePost });

    jest.spyOn(postService, 'updatePost').mockResolvedValue({
      ...mockSinglePost,
    });

    jest.spyOn(postService, 'deletePost').mockResolvedValue({
      ...mockSinglePost,
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should list posts', async () => {
    const { res: mockRes } = getMockRes();

    const mockReq = getMockReq({
      query: {
        limit: '10',
        cursor: 'nextCursor',
      },
      user: 'userId',
    }) as unknown as Request<{}, {}, {}, { limit: number; cursor: string }>;

    await postController.listPosts(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      data: mockedPosts,
      nextCursor: 'nextCursor',
    });
  });

  it('should get a single post', async () => {
    const { res: mockRes } = getMockRes();

    const mockReq = getMockReq({
      params: { id: '123' },
      user: 'userId',
    }) as Request<{ id: string }>;

    await postController.getPost(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockedPosts[0]);
  });

  it('should save a post', async () => {
    const newPost = {
      title: 'Test Post',
      content: 'This is a test post',
      featuredImage: 'image.jpg',
    };
    const mockReq = getMockReq({
      body: {
        ...newPost,
      },
    });

    const { res: mockRes } = getMockRes();

    await postController.savePost(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockedPosts[0]);
    expect(postService.savePost).toHaveBeenCalledWith({
      title: newPost.title,
      content: newPost.content,
      featuredImage: newPost.featuredImage,
    });
    expect(postService.savePost).toHaveBeenCalledTimes(1);
  });

  it('should update a post', async () => {
    const updatedPost = {
      title: 'Updated Post',
      content: 'This is an updated post.',
      featuredImage: 'updated-image.jpg',
    };

    const mockReq = getMockReq({
      params: { id: '123' },
      body: {
        ...updatedPost,
      },
    }) as Request<{ id: string }>;

    const { res: mockRes } = getMockRes();

    await postController.updatePost(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockedPosts[0]);
    expect(postService.updatePost).toHaveBeenCalledWith(
      {
        title: updatedPost.title,
        content: updatedPost.content,
        featuredImage: updatedPost.featuredImage,
      },
      '123'
    );
  });

  it('should delete a post', async () => {
    const mockReq = getMockReq({
      params: { id: '123' },
    }) as Request<{ id: string }>;

    const { res: mockRes } = getMockRes();

    await postController.deletePost(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockedPosts[0]);
    expect(postService.deletePost).toHaveBeenCalledWith('123');
    expect(postService.deletePost).toHaveBeenCalledTimes(1);
  });
});
