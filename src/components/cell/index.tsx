import { FC } from 'react';

import styles from './cell.module.scss';
import { CellProps, CellStyle } from './types';

export const Cell: FC<CellProps> = ({ cell, className, ...rest }) => {
  const cellStyle: CellStyle = {
    '1': styles.cell__one,
    '2': styles.cell__two,
    '3': styles.cell__three,
    '4': styles.cell__four,
    '5': styles.cell__five,
    '6': styles.cell__six,
    '7': styles.cell__seven,
    '8': styles.cell__eight,

    empty: styles.cell__empty,
    'empty-clicked': styles['cell__empty-clicked'],
    flag: styles.cell__flag,
    question: styles.cell__question,
    'question-clicked': styles['cell__question-clicked'],
    bomb: styles.cell__bomb,
    'bomb-red': styles['cell__bomb-red'],
    'bomb-error': styles['cell__bomb-error'],
  };

  return <div className={`${styles.cell} ${cellStyle[cell]}`} {...rest} />;
};
