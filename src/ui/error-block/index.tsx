import { CSSProperties, ReactNode } from 'react';
import { ErrorImage } from './styles/errorImage';
import './styles/index.scss';

export interface ErrorBlockProps {
  title?: ReactNode;
  description?: ReactNode;
  image?: ReactNode;
  style?: CSSProperties;
}

const classPrefix = 'ygm-error-block';

export const ErrorBlock = (props: ErrorBlockProps) => {
  const { image = ErrorImage, title = '页面遇到一些小问题', description = '请稍后重试', style } = props;

  return (
    <div className={classPrefix} style={style}>
      <div className={`${classPrefix}-image`}>{image}</div>

      <div className={`${classPrefix}-description`}>
        <div className={`${classPrefix}-description-title`}>{title}</div>
        <div className={`${classPrefix}-description-subtitle`}>{description}</div>
      </div>
    </div>
  );
};
