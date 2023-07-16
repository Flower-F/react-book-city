import {
  CSSProperties,
  Children,
  ReactElement,
  TouchEvent as ReactTouchEvent,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SwiperPageIndicator } from './swiper-page-indicator';
import { SwiperItem } from './swiper-item';
import { modulus } from './utils';
import './styles/swiper.scss';

export interface SwiperProps {
  loop?: boolean;
  autoplay?: boolean;
  autoPlayInterval?: number;
  defaultIndex?: number;
  showIndicator?: boolean;
  children?: ReactElement | ReactElement[];
  indicatorClassName?: string;
  style?: CSSProperties & Partial<Record<'--height' | '--width' | '--border-radius' | '--track-padding', string>>;
}

const classPrefix = 'ygm-swiper';

export const Swiper = (props: SwiperProps) => {
  const {
    loop,
    autoplay,
    autoPlayInterval = 3000,
    defaultIndex = 0,
    children,
    style,
    showIndicator = true,
    indicatorClassName,
  } = props;
  const [currentIndex, setCurrentIndex] = useState(defaultIndex ?? 0);
  const [dragging, setDragging] = useState(false);
  const startRef = useRef(0);
  const slideRatioRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlaying = useRef(false);
  const intervalRef = useRef(0);
  const { validateChildren, count } = useMemo(() => {
    let count = 0;
    const validateChildren = Children.map(children, (child) => {
      if (!isValidElement(child)) {
        console.warn('Swiper的子组件只能是SwiperItem');
        return null;
      }
      if (child.type !== SwiperItem) {
        console.warn('Swiper的子组件只能是SwiperItem');
      }
      count++;
      return child;
    });

    return { validateChildren, count };
  }, [children]);

  const getFinalPosition = (index: number) => {
    let finalPosition = -currentIndex * 100 + index * 100;

    if (!loop) {
      return finalPosition;
    }

    const totalWidth = count * 100;
    // 无限轮播，当前图的前后平均分配宽度
    const halfWidth = totalWidth / 2;
    finalPosition = modulus(finalPosition + halfWidth, totalWidth) - halfWidth;

    return finalPosition;
  };

  const getSlideRatio = (diff: number) => {
    if (!trackRef.current) {
      return 0;
    }
    return diff / trackRef.current.offsetWidth;
  };

  const getBoundIndex = useCallback(
    (index: number) => {
      const min = 0,
        max = count - 1;
      let result = index;
      result = Math.min(max, result);
      result = Math.max(min, result);
      return result;
    },
    [count],
  );

  const slideTo = useCallback(
    (index: number) => {
      const targetIndex = loop ? modulus(index, count) : getBoundIndex(index);
      setCurrentIndex(targetIndex);
    },
    [count, getBoundIndex, loop],
  );

  const slideNext = useCallback(() => {
    slideTo(currentIndex + 1);
  }, [currentIndex, slideTo]);

  const onTouchMove = (e: TouchEvent) => {
    const currentX = e.changedTouches[0].clientX;
    const diff = startRef.current - currentX;
    slideRatioRef.current = getSlideRatio(diff);

    let position = currentIndex + slideRatioRef.current;

    if (!loop) {
      position = getBoundIndex(position);
    }
    setCurrentIndex(position);
  };

  const onTouchEnd = () => {
    const index = Math.round(slideRatioRef.current);
    slideRatioRef.current = 0;

    const position = currentIndex + index;
    slideTo(position);
    setDragging(false);

    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  };

  const onTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    startRef.current = e.changedTouches[0].clientX;

    setDragging(true);
    clearInterval(intervalRef.current);
    autoPlaying.current = false;

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  };

  const getTransition = (position: number) => {
    if (dragging) {
      return undefined;
    } else if (autoPlaying.current) {
      if (position === -100 || position === 0) {
        return 'transform 0.3s ease-out';
      }
      return undefined;
    } else if (position < -100) {
      return undefined;
    }
    return 'transform 0.3s ease-out';
  };

  const renderSwiperItem = () => {
    return (
      <div className={`${classPrefix}-track-inner`}>
        {Children.map(validateChildren, (child, index) => {
          const position = getFinalPosition(index);
          return (
            <div
              className={`${classPrefix}-slide`}
              style={{
                left: `-${index * 100}%`,
                transform: `translate3d(${position}%, 0, 0)`,
                transition: getTransition(position),
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    if (!autoplay || dragging) {
      return;
    }

    intervalRef.current = setInterval(() => {
      autoPlaying.current = true;
      slideNext();
    }, autoPlayInterval);

    return () => {
      clearInterval(intervalRef.current);
      autoPlaying.current = false;
    };
  }, [autoPlayInterval, autoplay, dragging, slideNext]);

  if (count === 0 || !validateChildren) {
    console.warn('Swiper至少需要一个SwiperItem作为子组件');
    return null;
  }

  return (
    <div className={classPrefix} style={style}>
      <div className={`${classPrefix}-track`} onTouchStart={onTouchStart} ref={trackRef}>
        {renderSwiperItem()}
      </div>
      {showIndicator ? (
        <div className={`${classPrefix}-indicator`}>
          <SwiperPageIndicator
            total={count}
            currentIndex={slideRatioRef.current > 0 ? Math.floor(currentIndex) : Math.ceil(currentIndex)}
            indicatorClassName={indicatorClassName}
          />
        </div>
      ) : null}
    </div>
  );
};

Swiper.displayName = 'Swiper';
