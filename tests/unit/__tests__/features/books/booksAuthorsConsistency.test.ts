import { describe, it, expect } from 'vitest';
import { getMockAuthors } from '@/features/authors/api/authors.mock';
import { getMockBooks } from '@/features/books/api/books.mock';

// Utility to fetch all authors (paginate once with large perPage)
function allAuthors() {
  const { data } = getMockAuthors({ page: 1, perPage: 1000 });
  return data;
}
// Utility to fetch all books
function allBooks() {
  const { data } = getMockBooks({ page: 1, perPage: 1000 });
  return data;
}

describe('Books / Authors mock data consistency', () => {
  const authors = allAuthors();
  const books = allBooks();
  const authorNames = new Set(authors.map((a) => a.name));

  it('every author appears as author of at least one book', () => {
    const missing: string[] = [];
    for (const a of authorNames) {
      if (!books.some((b) => b.author === a)) {
        missing.push(a);
      }
    }
    expect(missing).toEqual([]);
  });

  it('every book references a valid existing author', () => {
    const invalid = books.filter((b) => !authorNames.has(b.author));
    expect(invalid).toEqual([]);
  });
});
