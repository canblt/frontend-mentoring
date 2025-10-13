export interface Author {
  id: string;
  name: string;
  bio: string | null;
  birthDate: Date | null;
  bookIsbns: string[];
  primaryGenres: string[];
  nationality: string | null; // added
  deathDate: Date | null; // added
  deathPlace: string | null; // added
  spouse: string[]; // added (multiple spouses normalized)
  stats: {
    bookCount: number;
    totalSales: number; // added
  };
}

export const defaultErrorAuthor: Author = {
  id: '',
  name: '',
  bio: null,
  birthDate: null,
  bookIsbns: [],
  primaryGenres: [],
  nationality: null,
  deathDate: null,
  deathPlace: null,
  spouse: [],
  stats: { bookCount: 0, totalSales: 0 },
};
