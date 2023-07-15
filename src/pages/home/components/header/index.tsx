import { Link } from 'react-router-dom';
import styles from './index.module.scss';

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <h1>React BookCity</h1>
      </div>
      <div className={styles.right}>
        <Link to='/search'>
          <i className='icon-search'></i>
        </Link>
        <Link to='/shelf'>
          <i className='icon-shelf'></i>
        </Link>
      </div>
    </div>
  );
}
