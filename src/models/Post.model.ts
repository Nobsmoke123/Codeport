enum ContentStatus {
  Draft = 'draft',
  Published = 'published',
  Premium = 'premium',
}

export type Post = {
  id: string;
  title: string;
  content: string;
  status: ContentStatus;
  featuredImage: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
