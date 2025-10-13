import { Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import ButtonBase from '@mui/material/ButtonBase';
import { BookItemProps } from './interfaces';
export default function BookItem({ book }: BookItemProps) {
  const { title, published, isbn, author, salesCount, price } = book;
  return (
    <Link
      href={`/books/${isbn}`}
      passHref
      legacyBehavior
    >
      <ButtonBase sx={{ width: '100%' }}>
        <Card
          variant="outlined"
          sx={{ mb: 2, height: '140px' }}
        >
          <CardContent>
            <Typography variant="h1">{title}</Typography>
            <Typography variant="body2">author: {author}</Typography>
            <Typography variant="body2">
              published: {published.getFullYear()}
            </Typography>
            <Typography variant="body2">
              sales: {salesCount.toLocaleString()}
            </Typography>
            <Typography variant="body2">price: ${price.toFixed(2)}</Typography>
            <br />
            <Typography
              variant="body2"
              color="text.secondary"
            >
              isbn: {isbn}
            </Typography>
          </CardContent>
        </Card>
      </ButtonBase>
    </Link>
  );
}
