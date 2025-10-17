import { describe, it, expect } from 'vitest';
import { getMockAuthors } from '@/features/authors/api/authors.mock';
import { getMockBooks } from '@/features/books/api/books.mock';
import { authorFromRaw } from '@/models/author/author.factory';

const rawAuthors = getMockAuthors({ page: 1, perPage: 1000 }).data;
const books = getMockBooks({ page: 1, perPage: 1000 }).data;

// Precompute sales sums by author name from books mock
const salesByAuthor = books.reduce<Record<string, number>>((acc, b) => {
  acc[b.author] = (acc[b.author] || 0) + (b.salesCount ?? 0);
  return acc;
}, {});

describe('Author totalSales stats', () => {
  it('computed totalSales matches sum of salesCount of their books', () => {
    const mismatches: { name: string; expected: number; got: number }[] = [];
    for (const raw of rawAuthors) {
      const expected = salesByAuthor[raw.name] || 0;
      const mapped = authorFromRaw(raw);
      if (mapped.stats.totalSales !== expected) {
        mismatches.push({
          name: raw.name,
          expected,
          got: mapped.stats.totalSales,
        });
      }
    }
    expect(mismatches).toEqual([]);
  });

  it('authors with at least one book have totalSales > 0 (except books with 0 sales)', () => {
    const offenders = rawAuthors
      .filter((a) => a.bookIsbns.length > 0)
      .filter(
        (a) =>
          salesByAuthor[a.name] > 0 && authorFromRaw(a).stats.totalSales <= 0
      )
      .map((a) => a.name);
    expect(offenders).toEqual([]);
  });
});
