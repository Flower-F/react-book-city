import { ReactNode } from 'react';
import './styles/swiper-item.scss';

export interface SwiperItemProps {
  children?: ReactNode;
}

const classPrefix = 'ygm-swiper-item';

export const SwiperItem = (props: SwiperItemProps) => {
  const { children } = props;
  return <div className={classPrefix}>{children}</div>;
};

SwiperItem.displayName = 'SwiperItem';
