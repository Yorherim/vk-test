import { checkRowAndColumn } from './check-row-and-column';
import { CellNumber } from '../components/cell/types';
import { CellPlayground } from '../app/types';

export type PlaygroundWithOnlyBombs = ('bomb' | null)[];

/**
 * function for generate cell - number or empty
 *
 * algorithm:
 *
 * 1 - check that elem is not a bomb
 *
 * 2 - find cells near current cell
 *
 * 3 - check the cells whether they are bombs
 * @param {"bomb" | null} elem current cell
 * @param {number} cellIndex current cell index
 * @param {PlaygroundWithOnlyBombs} arr array with 256 elements, where elem - bomb or null
 * @returns {CellPlayground} bomb or empty or number
 */
export const generateCell = (
  elem: 'bomb' | null,
  cellIndex: number,
  arr: PlaygroundWithOnlyBombs,
): CellPlayground => {
  // 1
  if (elem === 'bomb') {
    return elem;
  }

  let nearBombs = 0;

  // 2
  const adjacentCells = new Map([
    [
      'topLeftCell',
      checkRowAndColumn(cellIndex, cellIndex - 17, 'top-left')
        ? arr[cellIndex - 17]
        : null,
    ],
    [
      'topMiddleCell',
      checkRowAndColumn(cellIndex, cellIndex - 16, 'top-middle')
        ? arr[cellIndex - 16]
        : null,
    ],
    [
      'topRightCell',
      checkRowAndColumn(cellIndex, cellIndex - 15, 'top-right')
        ? arr[cellIndex - 15]
        : null,
    ],
    [
      'leftCell',
      checkRowAndColumn(cellIndex, cellIndex - 1, 'left')
        ? arr[cellIndex - 1]
        : null,
    ],
    [
      'rightCell',
      checkRowAndColumn(cellIndex, cellIndex + 1, 'right')
        ? arr[cellIndex + 1]
        : null,
    ],
    [
      'bottomLeftCell',
      checkRowAndColumn(cellIndex, cellIndex + 15, 'bottom-left')
        ? arr[cellIndex + 15]
        : null,
    ],
    [
      'bottomMiddleCell',
      checkRowAndColumn(cellIndex, cellIndex + 16, 'bottom-middle')
        ? arr[cellIndex + 16]
        : null,
    ],
    [
      'bottomRightCell',
      checkRowAndColumn(cellIndex, cellIndex + 17, 'bottom-right')
        ? arr[cellIndex + 17]
        : null,
    ],
  ]);

  for (const value of adjacentCells.values()) {
    if (value === 'bomb') {
      nearBombs += 1;
    }
  }

  // console.log(`adjacentCells index ${cellIndex}`, adjacentCells, `nearBombs ${nearBombs}`);

  return nearBombs === 0 ? ('empty' as const) : (nearBombs as CellNumber);
};
