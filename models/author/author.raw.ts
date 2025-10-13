export interface AuthorRaw {
  id: string;
  name: string;
  bio?: string;
  birthDate?: string; // ISO string
  bookIsbns: string[];
  primaryGenres?: string[];
  nationality?: string; // added
  deathDate?: string; // ISO date if deceased
  deathPlace?: string; // place of death if deceased
  spouse?: string; // semicolon-separated list if multiple
  totalSales?: number; // total number of books sold across all their books
}
