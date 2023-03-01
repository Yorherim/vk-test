import { checkRowAndColumn } from './check-row-and-column';
import { CellNumber } from '../components/cell/types';

export type PlaygroundWithOnlyBombs = ('bomb' | null)[];

export const generateCell = (
  elem: 'bomb' | null,
  cellIndex: number,
  arr: PlaygroundWithOnlyBombs,
) => {
  if (elem === 'bomb') {
    return elem;
  }

  let nearBombs = 0;

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
