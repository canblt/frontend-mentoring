'use client';

export default function AuthorsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Failed to load authors</h2>
      <pre style={{ whiteSpace: 'pre-wrap', color: 'crimson' }}>
        {error.message}
      </pre>
      <button
        onClick={() => reset()}
        style={{ marginTop: '0.5rem' }}
      >
        Retry
      </button>
    </div>
  );
}
