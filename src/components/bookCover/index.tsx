import { CSSProperties } from 'react';
import styles from './index.module.scss';

export interface BookCoverProps {
  src: string;
  alt?: string;
  style?: CSSProperties & Partial<Record<'--width' | '--height' | '--border-radius', string>>;
}

export const BookCover = (props: BookCoverProps) => {
  const { src, alt, style } = props;
  return (
    <div className={styles.bookCover} style={style}>
      <img src={src} alt={alt} className={styles.coverImg} />
    </div>
  );
};
