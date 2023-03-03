import { CellNumber } from '../../components/cell/types';
import { CellPlayground } from '../../app/types';
import { getAdjacentCells } from '../get-adjacent-cells';
import { PlaygroundWithOnlyBombs } from '../generate-playground/types';

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
    return { value: 'bomb', hide: true, index: cellIndex };
  }

  let nearBombs = 0;

  // 2
  const adjacentCells = getAdjacentCells(cellIndex, arr);

  // 3
  for (const value of Object.values(adjacentCells)) {
    if (value === 'bomb') {
      nearBombs += 1;
    }
  }

  return nearBombs === 0
    ? { value: 'empty' as const, hide: true, index: cellIndex }
    : { value: nearBombs as CellNumber, hide: true, index: cellIndex };
};
