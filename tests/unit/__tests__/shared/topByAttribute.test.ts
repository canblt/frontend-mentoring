import { describe, it, expect } from 'vitest';
import { getMockBooks } from '@/features/books/api/books.mock';
import { getMockAuthors } from '@/features/authors/api/authors.mock';
import { authorFromRaw } from '@/models/author/author.factory';
import {
  getTopEntries,
  getTopSoldBooks,
  getTopSoldAuthors,
} from '@shared/utils/topByAttribute';

const books = getMockBooks({ page: 1, perPage: 1000 }).data;
const rawAuthors = getMockAuthors({ page: 1, perPage: 1000 }).data;
const authors = rawAuthors.map(authorFromRaw);

describe('topByAttribute utility', () => {
  it('returns top N books by salesCount using attribute', () => {
    const top3 = getTopEntries(books, { attribute: 'salesCount', limit: 3 });
    expect(top3.length).toBe(3);
    for (let i = 1; i < top3.length; i++) {
      expect(top3[i - 1].salesCount).toBeGreaterThanOrEqual(top3[i].salesCount);
    }
  });

  it('returns identical result via getTopSoldBooks wrapper', () => {
    const viaGeneric = getTopEntries(books, {
      attribute: 'salesCount',
      limit: 5,
    });
    const viaWrapper = getTopSoldBooks(books, 5);
    expect(viaWrapper.map((b) => b.isbn)).toEqual(
      viaGeneric.map((b) => b.isbn)
    );
  });

  it('can filter with minValue', () => {
    const threshold = 50_000_000; // big sellers
    const filtered = getTopEntries(books, {
      attribute: 'salesCount',
      minValue: threshold,
      limit: 100,
    });
    expect(filtered.every((b) => b.salesCount >= threshold)).toBe(true);
  });

  it('returns top authors by stats.totalSales (deep path)', () => {
    const topAuthors = getTopEntries(authors, {
      attribute: 'stats.totalSales',
      limit: 4,
    });
    expect(topAuthors.length).toBe(4);
    for (let i = 1; i < topAuthors.length; i++) {
      expect(topAuthors[i - 1].stats.totalSales).toBeGreaterThanOrEqual(
        topAuthors[i].stats.totalSales
      );
    }
  });

  it('wrapper getTopSoldAuthors matches generic deep path result', () => {
    const viaGeneric = getTopEntries(authors, {
      attribute: 'stats.totalSales',
      limit: 6,
    });
    const viaWrapper = getTopSoldAuthors(authors, 6);
    expect(viaWrapper.map((a) => a.id)).toEqual(viaGeneric.map((a) => a.id));
  });

  it('supports accessor function and respects limit > array length', () => {
    const accessor = (b: (typeof books)[number]) => b.salesCount;
    const top = getTopEntries(books, { accessor, limit: 5000 }); // larger than list
    expect(top.length).toBe(books.length);
  });

  it('returns empty array for limit 0', () => {
    const res = getTopEntries(books, { attribute: 'salesCount', limit: 0 });
    expect(res).toEqual([]);
  });

  it('throws if neither attribute nor accessor provided', () => {
    expect(() => getTopEntries(books, { limit: 1 })).toThrow();
  });
});
