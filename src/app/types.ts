import { CellNumber, CellValue } from '../components/cell/types';

export type CellPlayground = Extract<CellValue, 'bomb' | 'empty'> | CellNumber;
export type Playground = CellPlayground[];

export enum CONSTANTS {
  CELLS_COUNT = 256,
}
