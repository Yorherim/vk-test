import { CellNumber, CellValue } from '../components/cell/types';

export type Playground = (Extract<CellValue, 'bomb' | 'empty'> | CellNumber)[];

export enum CONSTANTS {
  CELLS_COUNT = 256,
}
