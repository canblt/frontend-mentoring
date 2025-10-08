import { Card, CardContent, Typography } from '@mui/material';
import { BookItemProps } from './interfaces';
export default function BookItem({ book }: BookItemProps) {
  const { title, published, isbn } = book;
  return (
    <Card
      variant="outlined"
      sx={{ mb: 2, height: '120px' }}
    >
      <CardContent>
        <Typography variant="h1">{title}</Typography>
        <Typography variant="body2">
          published: {published.getFullYear()}
        </Typography>
        <br />
        <Typography
          variant="body2"
          color="text.secondary"
        >
          isbn: {isbn}
        </Typography>
      </CardContent>
    </Card>
  );
}
