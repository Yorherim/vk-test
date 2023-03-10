import { checkRowAndColumn } from '../check-row-and-column';
import { AdjacentCells } from './types';
import { PlaygroundWithOnlyBombs } from '../generate-playground/types';
import { Playground } from '../../store/types';

/**
 * function for get adjacent cells
 *
 * @param {number} cellIndex cell clicked
 * @param {PlaygroundWithOnlyBombs | Playground} arr
 * @returns AdjacentCells
 */
export const getAdjacentCells = (
  cellIndex: number,
  arr: PlaygroundWithOnlyBombs | Playground,
): AdjacentCells => {
  return {
    'top-left': checkRowAndColumn(cellIndex, cellIndex - 17, 'top-left')
      ? arr[cellIndex - 17]
      : null,

    'top-middle': checkRowAndColumn(cellIndex, cellIndex - 16, 'top-middle')
      ? arr[cellIndex - 16]
      : null,

    'top-right': checkRowAndColumn(cellIndex, cellIndex - 15, 'top-right')
      ? arr[cellIndex - 15]
      : null,

    left: checkRowAndColumn(cellIndex, cellIndex - 1, 'left') ? arr[cellIndex - 1] : null,

    right: checkRowAndColumn(cellIndex, cellIndex + 1, 'right') ? arr[cellIndex + 1] : null,

    'bottom-left': checkRowAndColumn(cellIndex, cellIndex + 15, 'bottom-left')
      ? arr[cellIndex + 15]
      : null,

    'bottom-middle': checkRowAndColumn(cellIndex, cellIndex + 16, 'bottom-middle')
      ? arr[cellIndex + 16]
      : null,

    'bottom-right': checkRowAndColumn(cellIndex, cellIndex + 17, 'bottom-right')
      ? arr[cellIndex + 17]
      : null,
  };
};
