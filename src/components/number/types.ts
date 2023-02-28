import { ComponentProps } from 'react';

type NumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;

export type NumberStyle = Record<NumberType, string>;

export type NumberProps = ComponentProps<'div'> & {
  number: NumberType;
};
