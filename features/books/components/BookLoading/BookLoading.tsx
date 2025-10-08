import { Box, Skeleton } from '@mui/material';
import { BookLoadingProps } from './interfaces';
export default function BookLoading({ elementsPerPage }: BookLoadingProps) {
  return (
    <Box>
      {Array.from({ length: elementsPerPage }, (_, i) => (
        <Skeleton key={i} variant="rectangular" height={120} sx={{ mb: 2.3 }} />
      ))}
    </Box>
  );
}

