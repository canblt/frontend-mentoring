import { BookRaw } from '@/models/book/book.raw';
export function getTotalPages(perPage: number, title: string = ''): number {
  const filtered = mockBooks.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );
  return Math.ceil(filtered.length / perPage);
}
export function getMockBooks({
  page = 1,
  perPage = 10,
  title = '',
}: {
  page?: number;
  perPage?: number;
  title?: string;
}): BookRaw[] {
  const filtered = mockBooks.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return filtered.slice(start, end);
}
const mockBooks: BookRaw[] = [
  {
    isbn: '978-3-16-148410-0',
    title: 'The Great Gatsby',
    published: '1925-04-10',
  },
  {
    isbn: '978-1-56619-909-1',
    title: 'To Kill a Mockingbird',
    published: '1960-07-11',
  },
  { isbn: '978-0-7432-7356-2', title: '1984', published: '1949-06-08' },
  {
    isbn: '978-0-452-28423-3',
    title: 'Pride and Prejudice',
    published: '1813-01-28',
  },
  {
    isbn: '978-0-7432-7356-4',
    title: 'The Catcher in the Rye',
    published: '1951-07-16',
  },
  {
    isbn: '978-0-7432-7356-5',
    title: 'Brave New World',
    published: '1932-01-01',
  },
  {
    isbn: '978-0-7432-7356-6',
    title: 'The Da Vinci Code',
    published: '2003-03-18',
  },
  {
    isbn: '978-0-7432-7356-7',
    title: 'Harry Potter and the Goblet of Fire',
    published: '2000-07-08',
  },
  { isbn: '978-0-14-028333-4', title: 'Life of Pi', published: '2001-09-11' },
  { isbn: '978-0-452-28424-0', title: 'Jane Eyre', published: '1847-10-16' },
  { isbn: '978-0-7432-7356-8', title: 'The Hobbit', published: '1937-09-21' },
  {
    isbn: '978-0-7432-7356-9',
    title: 'Fahrenheit 451',
    published: '1953-10-19',
  },
  {
    isbn: '978-0-06-112008-4',
    title: 'The Alchemist',
    published: '1988-05-01',
  },
  {
    isbn: '978-0-7432-7356-10',
    title: 'Lord of the Flies',
    published: '1954-09-17',
  },
  {
    isbn: '978-0-7432-7356-11',
    title: 'The Book Thief',
    published: '2005-03-14',
  },
  { isbn: '978-0-7432-7356-12', title: 'Animal Farm', published: '1945-08-17' },
  { isbn: '978-0-7432-7356-13', title: 'Moby Dick', published: '1851-10-18' },
  {
    isbn: '978-0-7432-7356-14',
    title: 'Crime and Punishment',
    published: '1866-01-01',
  },
  {
    isbn: '978-0-7432-7356-15',
    title: 'A Tale of Two Cities',
    published: '1859-04-30',
  },
  {
    isbn: '978-0-7432-7356-16',
    title: 'Wuthering Heights',
    published: '1847-12-01',
  },
  {
    isbn: '978-0-7432-7356-17',
    title: 'The Kite Runner',
    published: '2003-05-29',
  },
  { isbn: '978-0-7432-7356-18', title: 'The Road', published: '2006-09-26' },
  {
    isbn: '978-0-7432-7356-19',
    title: 'The Handmaid’s Tale',
    published: '1985-08-17',
  },
  { isbn: '978-0-7432-7356-20', title: 'The Shining', published: '1977-01-28' },
  { isbn: '978-0-7432-7356-21', title: 'Dune', published: '1965-06-01' },
  {
    isbn: '978-0-7432-7356-22',
    title: 'Ender’s Game',
    published: '1985-01-15',
  },
  {
    isbn: '978-0-7432-7356-23',
    title: 'The Hunger Games',
    published: '2008-09-14',
  },
  {
    isbn: '978-0-7432-7356-24',
    title: 'The Fault in Our Stars',
    published: '2012-01-10',
  },
  { isbn: '978-0-7432-7356-25', title: 'Gone Girl', published: '2012-06-05' },
];
