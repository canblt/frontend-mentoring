import { bookFromRaw } from '@/models/book/book.factory';
import { authorFromRaw } from '@/models/author/author.factory';

export const MapperRegistry = {
  book: bookFromRaw,
  author: authorFromRaw,
};
