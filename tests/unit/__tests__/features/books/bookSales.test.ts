import { describe, it, expect } from 'vitest';
import { getMockBooks } from '@/features/books/api/books.mock';
import { bookFromRaw } from '@/models/book/book.factory';

const all = getMockBooks({ page: 1, perPage: 1000 }).data;

describe('Book salesCount & price enrichment', () => {
  it('every mock book has a numeric salesCount >= 0 and price > 0', () => {
    const invalid = all.filter(
      (b) =>
        typeof b.salesCount !== 'number' ||
        b.salesCount < 0 ||
        typeof b.price !== 'number' ||
        b.price <= 0
    );
    expect(invalid).toEqual([]);
  });

  it('bookFromRaw preserves salesCount and price', () => {
    const sample = all[0];
    const mapped = bookFromRaw(sample);
    expect(mapped.salesCount).toBe(sample.salesCount);
    expect(mapped.price).toBe(sample.price);
  });
});
