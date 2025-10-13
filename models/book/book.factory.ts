import { Book } from './book';
import { BookRaw } from './book.raw';

export const bookFromRaw = (raw: BookRaw): Book => ({
  ...raw,
  published: new Date(raw.published),
  discount: raw.discount,
});

export function toBookRaw(book: Book): BookRaw {
  return {
    isbn: book.isbn,
    title: book.title,
    published: book.published.toISOString(),
    author: book.author,
    salesCount: book.salesCount,
    price: book.price,
    discount: book.discount,
  };
}
