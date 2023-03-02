import { generateBombs } from './generate-bombs';
import { generateCell, PlaygroundWithOnlyBombs } from './generate-cell';
import { CONSTANTS, Playground } from '../app/types';

/**
 * function for generate playground with bombs, empty cells and numbers
 *
 * algorithm:
 *
 * 1 - generate 10 bombs (random indexes of array with 256 elements)
 *
 * 2 - create array with 256 elements, elem - null or bomb
 *
 * 3 - take created array and generate numbers near bombs, other cells will be empty
 *
 * @param {number} startCellIndex cell first click
 * @returns {Playground} Playground - array with bombs, empty cells and numbers
 */
export const generatePlayground = (startCellIndex: number): Playground => {
  // 1
  const arrBombIndexes = generateBombs(startCellIndex);

  // 2
  const arrPlaygroundWithOnlyBombs: PlaygroundWithOnlyBombs = Array(
    CONSTANTS.CELLS_COUNT,
  )
    .fill(null)
    .map((elem, i) => {
      if (arrBombIndexes.includes(i)) {
        return 'bomb';
      }
      return elem;
    });

  return arrPlaygroundWithOnlyBombs.map((elem, i, arr) => {
    return generateCell(elem, i, arr);
  });
};
