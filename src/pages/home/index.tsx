import { Loading } from '../../components/loading';
import { useRequest } from '../../hooks/useRequest';
import { ErrorBlock } from '../../ui/error-block';
import { api } from './api';
import { Header } from './components/header';
import styles from './index.module.scss';

export const HomePage = () => {
  const { data, error } = useRequest({ url: api.getHomeData });
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
    </div>
  );
};
