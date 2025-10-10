import { AuthorRaw } from '@/models/author/author.raw';

const mockAuthors: AuthorRaw[] = [
  {
    id: 'a1',
    name: 'George Orwell',
    bio: 'English novelist and critic.',
    birthDate: '1903-06-25',
    bookIsbns: ['978-0-7432-7356-2', '978-0-7432-7356-12'],
    primaryGenres: ['Dystopian', 'Political Fiction'],
  },
  {
    id: 'a2',
    name: 'Jane Austen',
    birthDate: '1775-12-16',
    bookIsbns: ['978-0-452-28423-3'],
    primaryGenres: ['Romance', 'Satire'],
  },
  {
    id: 'a3',
    name: 'J.K. Rowling',
    birthDate: '1965-07-31',
    bookIsbns: ['978-0-7432-7356-7'],
    primaryGenres: ['Fantasy'],
  },
  {
    id: 'a4',
    name: 'Aldous Huxley',
    birthDate: '1894-07-26',
    bookIsbns: ['978-0-7432-7356-5'],
    primaryGenres: ['Dystopian'],
  },
];

export function filterAuthors({
  name = '',
  minBooks = 0,
}: {
  name?: string;
  minBooks?: number;
}) {
  return mockAuthors.filter(
    (a) =>
      a.name.toLowerCase().includes(name.toLowerCase()) &&
      a.bookIsbns.length >= minBooks
  );
}

export function getMockAuthors({
  page = 1,
  perPage = 6,
  name = '',
  minBooks = 0,
}: {
  page?: number;
  perPage?: number;
  name?: string;
  minBooks?: number;
}): { data: AuthorRaw[]; total: number } {
  const filtered = filterAuthors({ name, minBooks });
  const start = (page - 1) * perPage;
  const data = filtered.slice(start, start + perPage);
  return { data, total: filtered.length };
}
