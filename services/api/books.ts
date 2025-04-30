import { BookRaw } from '@/models/book/book.raw';
import { cache } from 'react';

export const fetchBooks = cache(async (): Promise<BookRaw[]> => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/books`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch books');
    return await res.json();
  } catch (error) {
    console.error('API call failed, returning mock data:', error);
    return mockBooks;
  }
});

export const mockBooks: BookRaw[] = [
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
  {
    isbn: '978-0-7432-7356-2',
    title: '1984',
    published: '1949-06-08',
  },

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
    title: 'The Great Gatsby 2',
    published: '1925-04-10',
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
];
