import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';
import { Author } from '@/models/author/author';

export default function AuthorRow({ author }: { author: Author }) {
  return (
    <Card
      variant="outlined"
      sx={{ mb: 2 }}
    >
      <CardContent>
        <Typography variant="h2">{author.name}</Typography>
        <Typography
          variant="body2"
          sx={{ mb: 1 }}
        >
          Books: {author.stats.bookCount}
        </Typography>
        {author.primaryGenres.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
          >
            {author.primaryGenres.slice(0, 4).map((g) => (
              <Chip
                key={g}
                label={g}
                size="small"
              />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
