export interface AuthorRaw {
  id: string;
  name: string;
  bio?: string;
  birthDate?: string; // ISO string
  bookIsbns: string[];
  primaryGenres?: string[];
}

