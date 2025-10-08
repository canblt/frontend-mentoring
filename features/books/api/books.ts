import { BookRaw } from '@/models/book/book.raw';
import { getMockBooks } from './books.mock';
export async function fetchBooks({ page = 1, perPage = 6, title = '' }: { page?: number; perPage?: number; title?: string; }): Promise<BookRaw[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockBooks({ page, perPage, title }));
    }, 300);
  });
}

