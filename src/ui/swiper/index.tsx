import { Swiper as InternalSwiper } from './swiper';
import { SwiperItem } from './swiper-item';

type InternalSwiperType = typeof InternalSwiper;
type SwiperItemType = typeof SwiperItem;

export interface SwiperProps extends InternalSwiperType {
  Item: SwiperItemType;
}

const Swiper = InternalSwiper as SwiperProps;
Swiper.Item = SwiperItem;

export { Swiper };
