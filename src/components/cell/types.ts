import { ComponentProps } from 'react';
import { CellRightClickType, ResultGame } from '../../store/types';

export type CellNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type CellValue = 'empty' | 'flag' | 'question' | 'bomb' | 'bomb-red' | 'bomb-error';

export type CellStyle = Record<CellNumber | CellValue, string>;

export type CellProps = ComponentProps<'div'> & {
  cell: CellNumber | CellValue;
  hide: boolean;
  rightClickType?: CellRightClickType;
  cellIndex?: number;
  loseBombIndex?: number | null;
  resultGame?: ResultGame;
};
