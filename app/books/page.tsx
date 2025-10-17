import PageShell from '@shared/components/PageShell/PageShell';
import { Books } from '@features/books';

export default function Page() {
  return (
    <PageShell
      title="Books"
      subtitle="Search, filter, and explore our catalog of published works."
      badgeLabel="Library"
      maxWidth={1200}
    >
      <Books showHeading={false} />
    </PageShell>
  );
}
