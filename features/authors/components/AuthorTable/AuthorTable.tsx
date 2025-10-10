import { Author } from '@/models/author/author';
import AuthorRow from '../AuthorRow/AuthorRow';
import EmptyState from '../EmptyState/EmptyState';

export default function AuthorTable({
  authors,
}: {
  authors: Author[] | undefined;
}) {
  if (!authors || authors.length === 0) return <EmptyState />;
  return (
    <>
      {authors.map((a) => (
        <AuthorRow
          key={a.id}
          author={a}
        />
      ))}
    </>
  );
}
