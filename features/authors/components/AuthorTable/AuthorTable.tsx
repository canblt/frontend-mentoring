import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { Author } from '@/models/author/author';
import EmptyState from '../EmptyState/EmptyState';

export default function AuthorTable({
  authors,
}: {
  authors: Author[] | undefined;
}) {
  if (!authors || authors.length === 0) return <EmptyState />;
  return (
    <TableContainer
      component={Paper}
      sx={{ width: '100%', mb: 2 }}
    >
      <Table
        sx={{ minWidth: 650 }}
        aria-label="authors table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Book Count</TableCell>
            <TableCell>Genres</TableCell>
            <TableCell>Total Sales</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((a) => (
            <TableRow
              key={a.id}
              hover
              component={Link}
              href={`/authors/${a.id}`}
              sx={{
                cursor: 'pointer',
                textDecoration: 'none',
                '& td': { textDecoration: 'none' },
              }}
            >
              <TableCell>{a.name}</TableCell>
              <TableCell>
                {a.stats?.bookCount ?? a.bookIsbns?.length ?? 0}
              </TableCell>
              <TableCell>{a.primaryGenres?.join(', ')}</TableCell>
              <TableCell>
                {a.stats?.totalSales?.toLocaleString?.() ?? 0}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
