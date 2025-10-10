import { AuthorRaw } from '@/models/author/author.raw';
import { getMockAuthors } from './authors.mock';

export async function fetchAuthors({
  page = 1,
  perPage = 6,
  name = '',
  minBooks = 0,
}: {
  page?: number;
  perPage?: number;
  name?: string;
  minBooks?: number;
}): Promise<{ data: AuthorRaw[]; total: number }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getMockAuthors({ page, perPage, name, minBooks })), 200);
  });
}
