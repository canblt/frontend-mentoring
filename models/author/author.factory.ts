import { AuthorRaw } from './author.raw';
import { Author } from './author';
import { getMockBooks } from '@/features/books/api/books.mock';

export function authorFromRaw(raw: AuthorRaw): Author {
  const allBooks = getMockBooks({ page: 1, perPage: 1000 }).data;
  const computedSales = allBooks
    .filter((b) => b.author === raw.name)
    .reduce((sum, b) => sum + (b.salesCount ?? 0), 0);
  const totalSales = raw.totalSales ?? computedSales;
  return {
    id: raw.id,
    name: raw.name,
    bio: raw.bio ?? null,
    birthDate: raw.birthDate ? new Date(raw.birthDate) : null,
    bookIsbns: raw.bookIsbns,
    primaryGenres: raw.primaryGenres ?? [],
    nationality: raw.nationality ?? null,
    deathDate: raw.deathDate ? new Date(raw.deathDate) : null,
    deathPlace: raw.deathPlace ?? null,
    spouse: raw.spouse ? raw.spouse.split(/;\s*/).filter(Boolean) : [],
    stats: { bookCount: raw.bookIsbns.length, totalSales },
  };
}
