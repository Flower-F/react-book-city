import { ReactElement, useMemo } from 'react';
import cx from 'classnames';
import './styles/swiper-page-indicator.scss';

export interface SwiperPageIndicatorProps {
  currentIndex: number;
  total: number;
  indicatorClassName?: string;
}

const classPrefix = 'ygm-swiper-page-indicator';

export const SwiperPageIndicator = (props: SwiperPageIndicatorProps) => {
  const { total, indicatorClassName, currentIndex } = props;

  const dots: ReactElement[] = useMemo(() => {
    return new Array(total).fill(0).map((_, index) => (
      <div
        key={index}
        className={cx(`${classPrefix}-dot`, {
          [`${classPrefix}-dot-active`]: currentIndex === index,
        })}
      ></div>
    ));
  }, [currentIndex, total]);

  return <div className={classPrefix}>{dots}</div>;
};

SwiperPageIndicator.displayName = 'SwiperPageIndicator';
