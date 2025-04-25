'use client';

import { Grid, Typography } from '@mui/material';
import { FC } from 'react';

const Error: FC = () => (
  <Grid justifyContent="center">
    <Typography>
      Error. If you would like to see users here, please start the backend.
    </Typography>
  </Grid>
);

export default Error;
