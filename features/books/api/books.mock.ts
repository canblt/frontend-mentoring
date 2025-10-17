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
}): { data: BookRaw[]; total: number } {
  const filtered = mockBooks.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return { data: filtered.slice(start, end), total: filtered.length };
}

const mockBooks: BookRaw[] = [
  // F. Scott Fitzgerald
  {
    isbn: '978-3-16-148410-0',
    title: 'The Great Gatsby',
    published: '1925-04-10',
    author: 'F. Scott Fitzgerald',
    salesCount: 15000000,
    price: 14.99,
  },
  {
    isbn: '978-0-684-80148-3',
    title: 'Tender Is the Night',
    published: '1934-04-12',
    author: 'F. Scott Fitzgerald',
    salesCount: 2500000,
    price: 12.5,
    discount: 0.3,
  },
  // Jane Austen
  {
    isbn: '978-0-452-28423-3',
    title: 'Pride and Prejudice',
    published: '1813-01-28',
    author: 'Jane Austen',
    salesCount: 20000000,
    price: 9.99,
  },
  {
    isbn: '978-0-452-28425-7',
    title: 'Sense and Sensibility',
    published: '1811-10-30',
    author: 'Jane Austen',
    salesCount: 7000000,
    price: 8.99,
  },
  // George Orwell
  {
    isbn: '978-0-7432-7356-2',
    title: '1984',
    published: '1949-06-08',
    author: 'George Orwell',
    salesCount: 30000000,
    price: 11.5,
  },
  {
    isbn: '978-0-452-28424-0',
    title: 'Animal Farm',
    published: '1945-08-17',
    author: 'George Orwell',
    salesCount: 20000000,
    price: 7.5,
  },
  // J.K. Rowling
  {
    isbn: '978-0-7432-7356-7',
    title: "Harry Potter and the Philosopher's Stone",
    published: '1997-06-26',
    author: 'J.K. Rowling',
    salesCount: 120000000,
    price: 19.99,
  },
  // Aldous Huxley
  {
    isbn: '978-0-7432-7356-5',
    title: 'Brave New World',
    published: '1932-01-01',
    author: 'Aldous Huxley',
    salesCount: 10000000,
    price: 10.25,
  },
  // Mark Twain
  {
    isbn: '978-0-14-243717-9',
    title: 'Adventures of Huckleberry Finn',
    published: '1884-12-10',
    author: 'Mark Twain',
    salesCount: 20000000,
    price: 9.5,
  },
  {
    isbn: '978-0-14-303956-3',
    title: 'The Adventures of Tom Sawyer',
    published: '1876-06-01',
    author: 'Mark Twain',
    salesCount: 15000000,
    price: 8.75,
  },
  // Agatha Christie
  {
    isbn: '978-0-00-711935-6',
    title: 'Murder on the Orient Express',
    published: '1934-01-01',
    author: 'Agatha Christie',
    salesCount: 3000000,
    price: 9.99,
  },
  {
    isbn: '978-0-00-713683-4',
    title: 'And Then There Were None',
    published: '1939-11-06',
    author: 'Agatha Christie',
    salesCount: 100000000,
    price: 10.99,
  },
  // Stephen King
  {
    isbn: '978-0-385-12167-5',
    title: 'The Shining',
    published: '1977-01-28',
    author: 'Stephen King',
    salesCount: 8000000,
    price: 15.0,
  },
  {
    isbn: '978-0-451-16951-8',
    title: 'IT',
    published: '1986-09-15',
    author: 'Stephen King',
    salesCount: 5000000,
    price: 16.5,
  },
  // Haruki Murakami
  {
    isbn: '978-1-84655-221-9',
    title: 'Kafka on the Shore',
    published: '2002-09-12',
    author: 'Haruki Murakami',
    salesCount: 1500000,
    price: 13.25,
    discount: 0.3,
  },
  {
    isbn: '978-0-09-944882-2',
    title: 'Norwegian Wood',
    published: '1987-09-04',
    author: 'Haruki Murakami',
    salesCount: 12000000,
    price: 12.75,
  },
  // Isabel Allende
  {
    isbn: '978-0-06-225445-5',
    title: 'The House of the Spirits',
    published: '1982-01-01',
    author: 'Isabel Allende',
    salesCount: 5000000,
    price: 11.25,
  },
  // Gabriel García Márquez
  {
    isbn: '978-0-307-47462-7',
    title: 'One Hundred Years of Solitude',
    published: '1967-05-30',
    author: 'Gabriel García Márquez',
    salesCount: 50000000,
    price: 14.5,
  },
  {
    isbn: '978-0-307-47463-4',
    title: 'Love in the Time of Cholera',
    published: '1985-03-05',
    author: 'Gabriel García Márquez',
    salesCount: 3000000,
    price: 13.99,
  },
  // Ernest Hemingway
  {
    isbn: '978-0-684-80146-9',
    title: 'The Old Man and the Sea',
    published: '1952-09-01',
    author: 'Ernest Hemingway',
    salesCount: 5000000,
    price: 9.99,
  },
  {
    isbn: '978-0-684-80147-6',
    title: 'For Whom the Bell Tolls',
    published: '1940-10-21',
    author: 'Ernest Hemingway',
    salesCount: 4000000,
    price: 12.0,
  },
  // Margaret Atwood
  {
    isbn: '978-0-385-49081-9',
    title: 'The Handmaid’s Tale',
    published: '1985-09-01',
    author: 'Margaret Atwood',
    salesCount: 10000000,
    price: 15.75,
  },
  {
    isbn: '978-0-385-66015-2',
    title: 'Oryx and Crake',
    published: '2003-05-01',
    author: 'Margaret Atwood',
    salesCount: 2000000,
    price: 14.0,
    discount: 0.3,
  },
  // Kazuo Ishiguro
  {
    isbn: '978-1-4000-7877-6',
    title: 'Never Let Me Go',
    published: '2005-04-05',
    author: 'Kazuo Ishiguro',
    salesCount: 3000000,
    price: 13.5,
  },
  {
    isbn: '978-0-679-73172-8',
    title: 'The Remains of the Day',
    published: '1989-05-01',
    author: 'Kazuo Ishiguro',
    salesCount: 2500000,
    price: 12.5,
  },
];
