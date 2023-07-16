import { Loading } from '../../components/loading';
import { useRequest } from '../../hooks/useRequest';
import { ErrorBlock } from '../../ui/error-block';
import { api } from './api';
import { Header } from './components/header';
import { HomeData } from './types';
import { Swiper } from '../../ui/swiper';
import { Space } from '../../ui/space';
import { NavBar } from './components/navbar';
import styles from './index.module.scss';
import { px2rem } from '../../utils/unit';

export const HomePage = () => {
  const { data, error } = useRequest<HomeData>({ url: api.getHomeData });
  console.log('data:', data);

  if (error) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className={styles.home}>
      <Header />
      <Space direction='vertical' gap={px2rem(20)}>
        <Swiper loop autoplay style={{ '--border-radius': '12px' }}>
          {data.banner.map((item, index) => (
            <Swiper.Item key={index}>
              <img src={item.src} alt={item.alt} height='100%' width='100%' />
            </Swiper.Item>
          ))}
        </Swiper>
        <NavBar />
      </Space>
    </div>
  );
};
