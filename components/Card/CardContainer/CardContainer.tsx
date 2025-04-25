import cn from 'classnames';
import { PropsWithChildren } from 'react';
import styles from './cardContainer.module.css';

export const CardContainer = ({
  children,
  red = false,
}: PropsWithChildren<{ red?: boolean }>) => (
  <div className={cn(styles.card, red && styles.cardRed)}>{children}</div>
);
