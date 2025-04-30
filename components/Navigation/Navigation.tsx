import { Grid2 as Grid } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';
import { Routes } from '@/config/routes';
import styles from './navigation.module.css';

const NavBar: FC = () => (
  <nav>
    <Grid container>
      <Link
        className={styles.link}
        href="/"
      >
        Home
      </Link>
      <Link
        className={styles.link}
        href={Routes.Books}
      >
        Books
      </Link>
    </Grid>
  </nav>
);
export default NavBar;
