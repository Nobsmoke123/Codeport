import { CategoryService } from '../../src/services';
import { Category, ICategory } from '../../src/models';
import mongoose, { Query } from 'mongoose';

describe('CategoryService', () => {
  const categoryService = new CategoryService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should list categories', async () => {
    const mockedCategories = [
      {
        _id: '1',
        name: 'Category 1',
        image: 'image1.png',
        deleted: false,
      },
      {
        _id: '2',
        name: 'Category 2',
        image: 'image2.png',
        deleted: false,
      },
    ];

    const limit = 10;
    const cursor = '6821d59bcfc689cab5b1b42b';

    jest.spyOn(Category, 'find').mockImplementation(
      () =>
        ({
          limit: jest.fn().mockReturnThis(),
          sort: jest.fn().mockResolvedValue(mockedCategories),
        } as unknown as Query<unknown[], unknown, {}, ICategory, 'find', {}>)
    );

    const result = await categoryService.listCategories(limit, cursor);
    expect(Category.find).toHaveBeenCalledWith({
      _id: { $gt: new mongoose.Types.ObjectId(cursor) },
      deleted: false,
    });
    expect(result).toMatchObject({
      data: mockedCategories,
      cursor: '2',
    });
  });

  it('should get a category with an ID.', async () => {
    const mockCategory = {
      _id: '1',
      name: 'Category 1',
      image: 'image1.png',
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(Category, 'findOne').mockResolvedValue({ ...mockCategory });
    const id = '1';

    const result = await categoryService.getCategory(id);
    expect(Category.findOne).toHaveBeenCalledWith({
      _id: id,
      deleted: false,
    });
    expect(result).toMatchObject({
      ...mockCategory,
    });
  });

  it('should throw an error if category not found', async () => {
    const id = 'x';
    jest.spyOn(Category, 'findOne').mockResolvedValue(null);
    await expect(categoryService.getCategory(id)).rejects.toThrow(
      `Resource with ID:${id} not found.`
    );
  });

  it('should save a category', async () => {
    const mockCategoy = {
      _id: '1',
      name: 'Category 1',
      image: 'image1.png',
      deleted: false,
    };

    jest.spyOn(Category.prototype, 'save').mockResolvedValue(mockCategoy);

    const name = mockCategoy.name;
    const image = mockCategoy.image;

    const result = await categoryService.saveCategory(name, image);

    expect(Category.prototype.save).toHaveBeenCalled();
    expect(result).toMatchObject({
      ...mockCategoy,
    });
  });

  it('should update a category', async () => {
    const mockCategory = {
      _id: '1',
      name: 'Category 1',
      image: 'image1.png',
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(Category, 'findOneAndUpdate')
      .mockResolvedValue({ ...mockCategory });

    const query = { _id: '1' };
    const data = { name: 'Category 1', image: 'image1.png' };

    const id = '1';
    const name = 'Category 1';
    const image = 'image1.png';

    const result = await categoryService.updateCategory(id, name, image);

    expect(result).toMatchObject({
      ...mockCategory,
    });
    expect(Category.findOneAndUpdate).toHaveBeenCalledWith(query, data, {
      returnDocument: 'after',
      new: true,
    });
  });

  it('should throw an error if category not found', async () => {
    const id = 'x';
    const name = 'Category 1';
    const image = 'image1.png';

    jest.spyOn(Category, 'findOneAndUpdate').mockResolvedValue(null);

    await expect(
      categoryService.updateCategory(id, name, image)
    ).rejects.toThrow(`Resource with ID: ${id} does not exist.`);
  });

  it('should delete a category', async () => {
    const mockCategory = {
      _id: '1',
      name: 'Category 1',
      image: 'image1.png',
      deleted: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest
      .spyOn(Category, 'findOneAndUpdate')
      .mockResolvedValue({ ...mockCategory });

    const query = { _id: '1' };
    const data = { deleted: true };

    const id = '1';

    const result = await categoryService.deleteCategory(id);

    expect(result).toMatchObject({
      ...mockCategory,
    });
    expect(Category.findOneAndUpdate).toHaveBeenCalledWith(query, data, {
      returnDocument: 'after',
      new: true,
    });
  });

  it('should throw an error if category not found', async () => {
    const id = 'x';

    jest.spyOn(Category, 'findOneAndUpdate').mockResolvedValue(null);

    await expect(categoryService.deleteCategory(id)).rejects.toThrow(
      `Resource with ID: ${id} does not exist.`
    );
  });
});
