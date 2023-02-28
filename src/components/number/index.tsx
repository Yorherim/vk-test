import { FC } from 'react';

import styles from './number.module.scss';
import { NumberProps, NumberStyle } from './types';

export const Number: FC<NumberProps> = ({ number, className, ...rest }) => {
  const numberStyle: NumberStyle = {
    1: styles.number__one,
    2: styles.number__two,
    3: styles.number__three,
    4: styles.number__four,
    5: styles.number__five,
    6: styles.number__six,
    7: styles.number__seven,
    8: styles.number__eight,
    9: styles.number__nine,
    0: styles.number__zero,
  };

  return <div className={`${styles.number} ${numberStyle[number]} ${className}`} {...rest} />;
};
