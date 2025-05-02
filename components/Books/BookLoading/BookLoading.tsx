import { Box, Skeleton } from '@mui/material';
import { BookLoadingProps } from './interfaces';

export default function BookLoading({ elementsPerPage }: BookLoadingProps) {
  return (
    <Box>
      {Array.from({ length: elementsPerPage }, (_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={120}
          sx={{ marginBottom: 2.3 }}
        />
      ))}
    </Box>
  );
}
