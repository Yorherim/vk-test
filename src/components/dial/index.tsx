import { FC } from 'react';

import styles from './dial.module.scss';
import { Number } from '../number';

type TimerProps = {
  value: number;
};

export const Dial: FC<TimerProps> = ({ value }) => {
  const arrCharsNumber = value.toString().split('');
  const numbers = new Map();
  numbers.set('firstNumber', 0).set('secondNumber', 0).set('thirdNumber', 0);

  switch (arrCharsNumber.length) {
    case 2:
      numbers.set('secondNumber', arrCharsNumber[0]).set('thirdNumber', arrCharsNumber[1]);
      break;
    case 3:
      numbers
        .set('firstNumber', arrCharsNumber[0])
        .set('secondNumber', arrCharsNumber[1])
        .set('thirdNumber', arrCharsNumber[2]);
      break;
    default:
      numbers.set('thirdNumber', arrCharsNumber[0]);
  }

  return (
    <div className={styles.dial}>
      <Number number={numbers.get('firstNumber')} />
      <Number number={numbers.get('secondNumber')} />
      <Number number={numbers.get('thirdNumber')} />
    </div>
  );
};
