/**
 * Generic utilities to select the top N entries from an array based on a numeric attribute.
 * Supports simple keys or deep dot-paths, as well as a custom accessor function.
 */

export type NumericAccessor<T> = (item: T) => number;

function resolvePath(obj: any, path: string): any {
  return path
    .split('.')
    .reduce(
      (acc: any, key: string) => (acc == null ? undefined : acc[key]),
      obj
    );
}

function valueOf<T>(
  item: T,
  attributeOrAccessor: string | NumericAccessor<T>
): number {
  try {
    if (typeof attributeOrAccessor === 'function') {
      const v = attributeOrAccessor(item);
      return typeof v === 'number' && !Number.isNaN(v) ? v : 0;
    }
    const raw = resolvePath(item as any, attributeOrAccessor);
    return typeof raw === 'number' && !Number.isNaN(raw) ? raw : 0;
  } catch {
    return 0;
  }
}

export interface GetTopOptions<T> {
  attribute?: string; // dot path
  accessor?: NumericAccessor<T>;
  limit?: number; // default: 5
  minValue?: number; // optional filter threshold
}

export function getTopEntries<T>(items: T[], options: GetTopOptions<T>): T[] {
  const { attribute, accessor, limit = 5, minValue = -Infinity } = options;
  if (!attribute && !accessor) {
    throw new Error('Either attribute or accessor must be provided');
  }
  const withScores = items.map((item) => ({
    item,
    score: valueOf(item, attribute || (accessor as NumericAccessor<T>)),
  }));
  const filtered = withScores.filter(({ score }) => score >= minValue);
  // Sort descending by score, stable fallback by original index preserved via map order
  filtered.sort((a, b) => b.score - a.score);
  return filtered.slice(0, Math.max(0, limit)).map(({ item }) => item);
}

// Convenience wrappers (types imported lazily by consumer to avoid circular deps in utils layer)
// Books: attribute 'salesCount'
export function getTopSoldBooks<BookLike extends { salesCount: number }>(
  books: BookLike[],
  limit = 5
): BookLike[] {
  return getTopEntries(books, { attribute: 'salesCount', limit });
}

// Authors: deep path 'stats.totalSales'
export function getTopSoldAuthors<
  AuthorLike extends { stats: { totalSales: number } },
>(authors: AuthorLike[], limit = 5): AuthorLike[] {
  return getTopEntries(authors, { attribute: 'stats.totalSales', limit });
}
