import { Box, Typography } from '@mui/material';

export default function EmptyState() {
  return (
    <Box
      textAlign="center"
      sx={{ p: 4 }}
    >
      <Typography
        variant="body1"
        color="text.secondary"
      >
        No authors found.
      </Typography>
    </Box>
  );
}
