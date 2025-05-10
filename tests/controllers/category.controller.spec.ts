import { CategoryController } from '../../src/controllers';
import { UpdateCategoryInput } from '../../src/schemas';
import { CategoryService } from '../../src/services';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { Request } from 'express';

describe('CategoryController', () => {
  const categoryService = new CategoryService();
  const categoryController = new CategoryController(categoryService);

  const mockCategories = [
    {
      id: '1',
      name: 'Category 1',
      image: 'image.png',
      deleted: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockCategory = {
    id: '1',
    name: 'Category 1',
    image: 'image.png',
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should list categories successfully', async () => {
    const mockReq = getMockReq({
      query: {
        limit: '10',
        cursor: 'cursorValue',
      },
    }) as unknown as Request<
      {},
      {},
      {},
      { limit: number | null; cursor: string | null }
    >;

    const { res: mockRes } = getMockRes();

    jest.spyOn(categoryService, 'listCategories').mockResolvedValue({
      data: mockCategories,
      cursor: 'nextCursor',
    });

    await categoryController.listCategories(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      data: mockCategories,
      cursor: 'nextCursor',
    });
  });

  it('should get a category successfully', async () => {
    const mockReq = getMockReq({
      params: {
        id: '1',
      },
    }) as Request<{ id: string }>;

    const { res: mockRes } = getMockRes();

    jest.spyOn(categoryService, 'getCategory').mockResolvedValue(mockCategory);

    await categoryController.getCategory(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockCategory);
  });

  it('should save a category successfully', async () => {
    const mockReq = getMockReq({
      body: {
        name: mockCategory.name,
        image: mockCategory.image,
      },
    });

    const { res: mockRes } = getMockRes();

    jest.spyOn(categoryService, 'saveCategory').mockResolvedValue(mockCategory);
    await categoryController.saveCategory(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockCategory);
  });

  it('should update a category successfully', async () => {
    const mockReq = getMockReq({
      params: {
        id: '1',
      },
      body: {
        name: 'Updated Category',
        image: 'updated_image.png',
      },
    }) as Request<
      UpdateCategoryInput['params'],
      {},
      UpdateCategoryInput['body']
    >;

    const { res: mockRes } = getMockRes();

    jest
      .spyOn(categoryService, 'updateCategory')
      .mockResolvedValue(mockCategory);

    await categoryController.updateCategory(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockCategory);
  });

  it('should delete a category successfully', async () => {
    const mockReq = getMockReq({
      params: {
        id: '1',
      },
    }) as Request<{ id: string }>;

    const { res: mockRes } = getMockRes();

    jest
      .spyOn(categoryService, 'deleteCategory')
      .mockResolvedValue(mockCategory);

    await categoryController.deleteCategory(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockCategory);
  });
});
