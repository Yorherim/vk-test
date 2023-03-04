import { CellNumber, CellValue } from '../components/cell/types';

export type CellRightClickType = Extract<CellValue, 'flag' | 'question'> | null;

export type CellPlayground = {
  value: Extract<CellValue, 'bomb' | 'empty'> | CellNumber;
  hide: boolean;
  index: number;
  rightClickType: CellRightClickType;
};
export type Playground = CellPlayground[];

export enum CONSTANTS {
  CELLS_COUNT = 256,
  TIME = 40,
}

export type ResultGame = 'win' | 'lose' | null;
