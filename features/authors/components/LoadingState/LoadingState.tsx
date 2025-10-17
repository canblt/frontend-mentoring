import { Box, Skeleton } from '@mui/material';

export default function LoadingState({
  elementsPerPage,
}: {
  elementsPerPage: number;
}) {
  return (
    <Box>
      {Array.from({ length: elementsPerPage }, (_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={84}
          sx={{ mb: 2 }}
        />
      ))}
    </Box>
  );
}
