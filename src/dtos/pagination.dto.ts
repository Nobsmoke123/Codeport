import { ParsedQs } from 'qs';

export interface PaginationQueryDto extends ParsedQs {
  limit: string;
  cursor: string;
}
