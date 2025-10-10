export interface Author {
  id: string;
  name: string;
  bio: string | null;
  birthDate: Date | null;
  bookIsbns: string[];
  primaryGenres: string[];
  stats: {
    bookCount: number;
  };
}

export const defaultErrorAuthor: Author = {
  id: '',
  name: '',
  bio: null,
  birthDate: null,
  bookIsbns: [],
  primaryGenres: [],
  stats: { bookCount: 0 },
};

