import { CellPlayground } from '../../store/types';

export type LocationCell =
  | 'top-left'
  | 'top-middle'
  | 'top-right'
  | 'left'
  | 'right'
  | 'bottom-left'
  | 'bottom-middle'
  | 'bottom-right';

export type AdjacentCells = {
  [key in LocationCell]: null | CellPlayground | 'bomb';
};
