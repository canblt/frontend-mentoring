import { AuthorRaw } from './author.raw';
import { Author } from './author';

export function authorFromRaw(raw: AuthorRaw): Author {
  return {
    id: raw.id,
    name: raw.name,
    bio: raw.bio ?? null,
    birthDate: raw.birthDate ? new Date(raw.birthDate) : null,
    bookIsbns: raw.bookIsbns,
    primaryGenres: raw.primaryGenres ?? [],
    stats: { bookCount: raw.bookIsbns.length },
  };
}

