import PageShell from '@shared/components/PageShell/PageShell';
import { Authors } from '@features/authors';

export default function AuthorsPage() {
  return (
    <PageShell
      title="Authors"
      subtitle="Browse, filter, and explore the creators behind the books."
      badgeLabel="Directory"
      maxWidth={1200}
    >
      <Authors showHeading={false} />
    </PageShell>
  );
}
