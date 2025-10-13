import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { AddToCartButton } from '@/shared/components/AddToCartButton/AddToCartButton';
import { BookTableProps } from './interfaces';
import EmptyState from '../EmptyState/EmptyState';

export default function BookTable({ books }: BookTableProps) {
  if (!books || books.length === 0) return <EmptyState />;
  return (
    <TableContainer
      component={Paper}
      sx={{ width: '100%', mb: 2 }}
    >
      <Table
        sx={{ minWidth: 650 }}
        aria-label="books table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Published</TableCell>
            <TableCell>ISBN</TableCell>
            <TableCell>Sales</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="center">Cart</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((b) => (
            <TableRow
              key={b.isbn}
              hover
              component={Link}
              href={`/books/${b.isbn}`}
              sx={{
                cursor: 'pointer',
                textDecoration: 'none',
                '& td': { textDecoration: 'none' },
              }}
            >
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.author}</TableCell>
              <TableCell>{b.published.getFullYear()}</TableCell>
              <TableCell>{b.isbn}</TableCell>
              <TableCell>{b.salesCount.toLocaleString()}</TableCell>
              <TableCell>{b.price.toFixed(2)}</TableCell>
              <TableCell
                align="center"
                onClick={(error) => {
                  error.preventDefault();
                  error.stopPropagation();
                }}
              >
                <AddToCartButton
                  isbn={b.isbn}
                  title={b.title}
                  price={b.price}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
