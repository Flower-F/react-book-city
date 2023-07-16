import { Link } from 'react-router-dom';
import CategoryIcon from '../../../../assets/images/category.png';
import FinishIcon from '../../../../assets/images/finish.png';
import RankIcon from '../../../../assets/images/rank.png';
import RecommendIcon from '../../../../assets/images/recommend.png';
import styles from './index.module.scss';

export const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.item}>
        <Link to='/ranking' className={styles.icon}>
          <img src={RankIcon} alt='排行' width='100%' />
        </Link>
        <h3 className={styles.title}>排行</h3>
      </div>

      <div className={styles.item}>
        <Link to='/category' className={styles.icon}>
          <img src={CategoryIcon} alt='分类' width='100%' />
        </Link>
        <h3 className={styles.title}>分类</h3>
      </div>

      <div className={styles.item}>
        <Link to='/booklist/finish' className={styles.icon}>
          <img src={FinishIcon} alt='完本' width='100%' />
        </Link>
        <h3 className={styles.title}>完本</h3>
      </div>

      <div className={styles.item}>
        <Link to='/booklist/recommend' className={styles.icon}>
          <img src={RecommendIcon} alt='推荐' width='100%' />
        </Link>
        <h3 className={styles.title}>推荐</h3>
      </div>
    </div>
  );
};
