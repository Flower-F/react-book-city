import { Loading } from '../../components/loading';
import { useRequest } from '../../hooks/useRequest';
import { api } from './api';
import { Header } from './components/header';
import styles from './index.module.scss';

export function HomePage() {
  const { data, error } = useRequest({ url: api.getHomeData });
  console.log('data:', data);

  if (error) {
    return <div>Error Block</div>;
  }

  if (!data) {
    return <Loading />;
  }
  // useEffect(() => {

  // }, []);

  return (
    <div className={styles.home}>
      <Header />
    </div>
  );
}
