import { ComponentProps } from 'react';

type CellNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type CellValue = 'empty' | 'flag' | 'question' | 'bomb' | 'bomb-red' | 'bomb-error';

export type CellStyle = Record<CellNumber | CellValue, string>;

export type CellProps = ComponentProps<'div'> & {
  cell: CellNumber | CellValue;
};
