import BookItem from '../BookItem/BookItem';
import EmptyState from '../EmptyState/EmptyState';
import { BookTableProps } from './interfaces';

export default function BookTable({ books }: BookTableProps) {
  if (!books || books.length === 0) return <EmptyState />;
  return (
    <>
      {books.map((book) => (
        <BookItem
          key={book.isbn}
          book={book}
        />
      ))}
    </>
  );
}
