export type Comment = {
  id: string;
  userId: string;
  postId: string;
  parentId: string; // for nested comments
  content: string;
  createdAt: string;
  updatedAt: string;
};
