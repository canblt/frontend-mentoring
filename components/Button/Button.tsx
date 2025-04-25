'use client';

import { Button as MuiButton } from '@mui/material/';
import cn from 'classnames';
import { ButtonProps as ButtonProperties } from './interfaces';
import styles from './button.module.css';

const Button = ({ label, title }: ButtonProperties) => {
  const handleClick = () => {
    // eslint-disable-next-line no-alert
    alert(`We want to buy ${title}`);
  };

  return (
    <MuiButton
      className={cn(styles.border, styles.fontColor)}
      variant="outlined"
      onClick={handleClick}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
