import { describe, it, expect } from 'vitest';
import { getMockAuthors } from '@/features/authors/api/authors.mock';
import { authorFromRaw } from '@/models/author/author.factory';

const ALL = getMockAuthors({ page: 1, perPage: 1000 });

// Helper to find raw by name quickly
const byName = (name: string) => ALL.data.find((a) => a.name === name)!;

describe('Author metadata enrichment', () => {
  it('provides nationality for each raw author where expected', () => {
    const missingNationality = ALL.data
      .filter((a) => !a.nationality)
      .map((a) => a.name);
    // Some authors might intentionally not have nationality; for now we expect all provided
    expect(missingNationality).toEqual([]);
  });

  it('includes death info only for deceased authors', () => {
    const deceased = ALL.data.filter((a) => !!a.deathDate);
    const living = ALL.data.filter((a) => !a.deathDate);
    // Deceased must have deathPlace
    const missingDeathPlace = deceased
      .filter((a) => !a.deathPlace)
      .map((a) => a.name);
    expect(missingDeathPlace).toEqual([]);
    // Living must not have deathPlace
    const livingWithDeath = living
      .filter((a) => a.deathPlace)
      .map((a) => a.name);
    expect(livingWithDeath).toEqual([]);
  });

  it('splits spouse string into array in mapped Author model', () => {
    const raw = byName('George Orwell');
    const mapped = authorFromRaw(raw);
    expect(raw.spouse?.includes(';')).toBe(true);
    expect(mapped.spouse.length).toBeGreaterThan(1);
    expect(mapped.spouse).toContain("Eileen O'Shaughnessy");
  });

  it('empty spouse string maps to empty spouse array', () => {
    const raw = byName('Jane Austen');
    const mapped = authorFromRaw(raw);
    expect(raw.spouse).toBe('');
    expect(mapped.spouse).toEqual([]);
  });
});
