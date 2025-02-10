export interface PostQueryParams {
  limit: number;
  cursor: string | null;
}

export interface GetPostParam {
  id: string;
}

export interface PostDataDto {
  title: string;
  content: string;
  featuredImage: string;
}
