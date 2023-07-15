import cx from 'classnames';
import './styles/index.scss';
import { CSSProperties } from 'react';

export interface SpinnerLoadingProps {
  color?: 'default' | 'primary' | 'white';
  size?: number;
  style?: CSSProperties;
}

const classPrefix = 'ygm-spinner-loading';

export const SpinnerLoading = (props: SpinnerLoadingProps) => {
  const { color = 'default', size = 42 } = props;

  return (
    <div
      className={cx(classPrefix, `${classPrefix}-color-${color}`)}
      style={{ ...props.style, width: size, height: size }}
    ></div>
  );
};

SpinnerLoading.displayName = 'SpinnerLoading';
