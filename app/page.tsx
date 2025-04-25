import { Grid2 as Grid, Typography } from '@mui/material';
import { NextPage } from 'next';

const Home: NextPage = () => (
  <Grid
    height="100vh"
    container
    justifyContent="center"
    alignContent="center"
  >
    <Grid
      component="div"
      textAlign="center"
      size={12}
    >
      <Typography variant="h1">Starters Pack OEV</Typography>
      <Typography variant="h2">Frontend Template</Typography>
      <Typography variant="h3">NextJS, MUI, Jest, ESLint</Typography>
    </Grid>
  </Grid>
);

export default Home;
