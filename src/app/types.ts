import { CellNumber, CellValue } from '../components/cell/types';

export type CellPlayground = {
  value: Extract<CellValue, 'bomb' | 'empty'> | CellNumber;
  hide: boolean;
  index: number;
  flag: boolean;
};
export type Playground = CellPlayground[];

export enum CONSTANTS {
  CELLS_COUNT = 256,
}

export type ResultGame = 'win' | 'lose' | null;
