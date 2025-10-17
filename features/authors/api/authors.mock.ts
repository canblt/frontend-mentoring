import { AuthorRaw } from '@/models/author/author.raw';

const mockAuthors: AuthorRaw[] = [
  {
    id: 'c1a2b3d4-e5f6-7890-abcd-1234567890ab',
    name: 'George Orwell',
    bio: 'English novelist and critic.',
    birthDate: '1903-06-25',
    deathDate: '1950-01-21',
    deathPlace: 'University College Hospital, London, England',
    nationality: 'British',
    spouse: "Eileen O'Shaughnessy; Sonia Brownell",
    bookIsbns: ['978-0-7432-7356-2', '978-0-452-28423-3'],
    primaryGenres: ['Dystopian', 'Political Fiction'],
  },
  {
    id: 'd2b3c4a5-f6e7-8901-bcda-2345678901bc',
    name: 'Jane Austen',
    birthDate: '1775-12-16',
    deathDate: '1817-07-18',
    deathPlace: 'Winchester, England',
    nationality: 'British',
    spouse: '',
    bookIsbns: ['978-0-452-28423-3', '978-0-7432-7356-4'],
    primaryGenres: ['Romance', 'Satire'],
  },
  {
    id: 'e3c4d5b6-a7f8-9012-cdab-3456789012cd',
    name: 'J.K. Rowling',
    birthDate: '1965-07-31',
    nationality: 'British',
    spouse: 'Jorge Arantes; Neil Murray',
    bookIsbns: ['978-0-7432-7356-7', '978-0-7432-7356-23'],
    primaryGenres: ['Fantasy'],
  },
  {
    id: 'f4d5e6c7-b8a9-0123-dabc-4567890123de',
    name: 'Aldous Huxley',
    birthDate: '1894-07-26',
    deathDate: '1963-11-22',
    deathPlace: 'Los Angeles, California, USA',
    nationality: 'British',
    spouse: 'Maria Nys; Laura Archera',
    bookIsbns: ['978-0-7432-7356-5'],
    primaryGenres: ['Dystopian'],
  },
  {
    id: 'a5e6f7g8-h9i0-1234-jklm-567890123456',
    name: 'Mark Twain',
    bio: 'American writer, humorist, entrepreneur, publisher, and lecturer.',
    birthDate: '1835-11-30',
    deathDate: '1910-04-21',
    deathPlace: 'Redding, Connecticut, USA',
    nationality: 'American',
    spouse: 'Olivia Langdon Clemens',
    bookIsbns: ['978-0-14-243717-9'],
    primaryGenres: ['Adventure', 'Satire'],
  },
  {
    id: 'b6f7g8h9-i0j1-2345-klmn-678901234567',
    name: 'Agatha Christie',
    bio: 'English writer known for her sixty-six detective novels.',
    birthDate: '1890-09-15',
    deathDate: '1976-01-12',
    deathPlace: 'Winterbrook, Oxfordshire, England',
    nationality: 'British',
    spouse: 'Archibald Christie; Max Mallowan',
    bookIsbns: ['978-0-00-711935-6'],
    primaryGenres: ['Mystery', 'Crime'],
  },
  {
    id: 'c7g8h9i0-j1k2-3456-lmno-789012345678',
    name: 'Stephen King',
    bio: 'American author of horror, supernatural fiction, suspense, and fantasy novels.',
    birthDate: '1947-09-21',
    nationality: 'American',
    spouse: 'Tabitha King',
    bookIsbns: ['978-0-385-12167-5'],
    primaryGenres: ['Horror', 'Thriller'],
  },
  {
    id: 'd8h9i0j1-k2l3-4567-mnop-890123456789',
    name: 'Haruki Murakami',
    bio: 'Japanese writer known for his blend of pop culture, fantasy, and realism.',
    birthDate: '1949-01-12',
    nationality: 'Japanese',
    spouse: 'Yoko Takahashi',
    bookIsbns: ['978-1-84655-221-9'],
    primaryGenres: ['Magical Realism', 'Fiction'],
  },
  {
    id: 'e9i0j1k2-l3m4-5678-nopq-901234567890',
    name: 'Isabel Allende',
    bio: 'Chilean writer known for her works in magical realism.',
    birthDate: '1942-08-02',
    nationality: 'Chilean-American',
    spouse: 'Miguel Frías; Willie Gordon',
    bookIsbns: ['978-0-06-225445-5'],
    primaryGenres: ['Magical Realism', 'Historical Fiction'],
  },
  {
    id: 'f0j1k2l3-m4n5-6789-opqr-012345678901',
    name: 'Gabriel García Márquez',
    bio: 'Colombian novelist, short-story writer, screenwriter, and journalist.',
    birthDate: '1927-03-06',
    deathDate: '2014-04-17',
    deathPlace: 'Mexico City, Mexico',
    nationality: 'Colombian',
    spouse: 'Mercedes Barcha',
    bookIsbns: ['978-0-307-47462-7'],
    primaryGenres: ['Magical Realism', 'Fiction'],
  },
  {
    id: 'g1h2i3j4-k5l6-7890-mnop-234567890123',
    name: 'Ernest Hemingway',
    birthDate: '1899-07-21',
    deathDate: '1961-07-02',
    deathPlace: 'Ketchum, Idaho, USA',
    nationality: 'American',
    spouse:
      'Hadley Richardson; Pauline Pfeiffer; Martha Gellhorn; Mary Welsh Hemingway',
    bookIsbns: ['978-0-684-80146-9'],
    primaryGenres: ['Fiction', 'Adventure'],
  },
  {
    id: 'h2i3j4k5-l6m7-8901-nopq-345678901234',
    name: 'F. Scott Fitzgerald',
    birthDate: '1896-09-24',
    deathDate: '1940-12-21',
    deathPlace: 'Hollywood, California, USA',
    nationality: 'American',
    spouse: 'Zelda Fitzgerald',
    bookIsbns: ['978-3-16-148410-0'],
    primaryGenres: ['Fiction'],
  },
  {
    id: 'v6w7x8y9-z0a1-2345-bcde-789012345678',
    name: 'Margaret Atwood',
    birthDate: '1939-11-18',
    nationality: 'Canadian',
    spouse: 'Jim Polk; Graeme Gibson',
    bookIsbns: ['978-0-385-49081-9'],
    primaryGenres: ['Dystopian', 'Fiction'],
  },
  {
    id: 'w7x8y9z0-a1b2-3456-cdef-890123456789',
    name: 'Kazuo Ishiguro',
    birthDate: '1954-11-08',
    nationality: 'British',
    spouse: 'Lorna MacDougall',
    bookIsbns: ['978-0-307-47462-7'],
    primaryGenres: ['Fiction'],
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
