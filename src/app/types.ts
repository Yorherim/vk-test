import { CellNumber, CellValue } from '../components/cell/types';

export type CellPlayground = {
  value: Extract<CellValue, 'bomb' | 'empty'> | CellNumber;
  hide: boolean;
};
export type Playground = CellPlayground[];

export enum CONSTANTS {
  CELLS_COUNT = 256,
}
