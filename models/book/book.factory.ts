import { Book } from './book';
import { BookRaw } from './book.raw';

export const bookFromRaw = (raw: BookRaw): Book => ({
  ...raw,
  published: new Date(raw.published),
});

export function toBookRaw(book: Book): BookRaw {
  return {
    isbn: book.isbn,
    title: book.title,
    published: book.published.toISOString(),
  };
}
