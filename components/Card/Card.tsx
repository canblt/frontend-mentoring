import Image from 'next/image';
import { Skeleton } from '@mui/material';
import { Button } from '@/components/Button';
import { CardProps as CardProperties } from './interfaces';
import styles from './card.module.css';
import { CardContainer } from './CardContainer';

const Card = ({ title, imageSrc, imageAlt, content }: CardProperties) => (
  <CardContainer red={title.length > 10}>
    {imageSrc ? (
      <div className={styles.thumbnail}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          className={styles.img}
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    ) : (
      <Skeleton
        variant="rounded"
        width={352}
        height={160}
      />
    )}
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.content}>{content}</p>
    {/*
    the only 'use client' component in this project
    ReactServerComponents can consume ClientComponents
    ClientComponents cannot consume ReactServerComponents
     */}
    <div className={styles.buttonContainer}>
      <Button
        label="Buy"
        title={title}
      />
    </div>
  </CardContainer>
);

export default Card;
