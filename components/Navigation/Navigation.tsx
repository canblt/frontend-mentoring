import { Grid2 as Grid } from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';
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
        href="/products/"
      >
        Products
      </Link>
      <Link
        className={styles.link}
        href="/user/"
      >
        Users
      </Link>
    </Grid>
  </nav>
);
export default NavBar;
