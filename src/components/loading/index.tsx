import { memo } from 'react';
import { SpinnerLoading, SpinnerLoadingProps } from '../../ui/spinner-loading';
import styles from './styles/index.module.scss';

export const Loading = memo((props: SpinnerLoadingProps) => {
  return (
    <div className={styles.loading}>
      <SpinnerLoading {...props} />
    </div>
  );
});
