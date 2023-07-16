import React, { CSSProperties, Children, useMemo } from 'react';
import cx from 'classnames';

import './styles/index.scss';

export interface SpaceProps {
  /** 间距方向 */
  direction?: 'horizontal' | 'vertical';
  /** 交叉轴对齐方式 */
  align?: 'start' | 'end' | 'center' | 'baseline';
  /** 主轴对齐方式	 */
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
  /** 是否自动换行，仅在 horizontal 时有效	 */
  wrap?: boolean;
  /** 是否渲染为块级元素	 */
  block?: boolean;
  /** 间距大小，设为数组时则分别设置水平方向和垂直方向的间距大小 */
  gap?: number | string | [number | string, number | string];
  /** 元素点击事件 */
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

const classPrefix = `ygm-space`;

function formatGap(gap: number | string) {
  return typeof gap === 'number' ? `${gap}px` : gap;
}

export const Space = (props: SpaceProps) => {
  const { children, wrap, justify, align, direction, block, gap, onClick } = props;

  const style: CSSProperties & Partial<Record<'--gap-vertical' | '--gap-horizontal' | '--gap', string>> =
    useMemo(() => {
      if (gap) {
        if (Array.isArray(gap)) {
          const [gapH, gapV] = gap;
          return {
            '--gap-vertical': formatGap(gapV),
            '--gap-horizontal': formatGap(gapH),
          };
        }

        return {
          '--gap': formatGap(gap),
        };
      }

      return {};
    }, [gap]);

  return (
    <div
      className={cx(classPrefix, {
        [`${classPrefix}-wrap`]: wrap,
        [`${classPrefix}-block`]: block,
        [`${classPrefix}-${direction ?? 'horizontal'}`]: true,
        [`${classPrefix}-align-${align ?? 'start'}`]: !!align,
        [`${classPrefix}-justify-${justify ?? 'start'}`]: !!justify,
      })}
      onClick={onClick}
      style={style}
    >
      {Children.map(children, (child) => {
        return child !== null && child !== undefined && <div className={`${classPrefix}-item`}>{child}</div>;
      })}
    </div>
  );
};

Space.displayName = 'Space';
