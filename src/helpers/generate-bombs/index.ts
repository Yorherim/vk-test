import { CONSTANTS } from '../../app/types';

/**
 * function for generate bombs
 *
 * algorithm:
 *
 * 1 - create array with 256 elements
 *
 * 2 - get keys of the array => create array with indexes (0, 255)
 *
 * 3 - sort in any order
 *
 * 4 - find index of startCellIndex in sorting array
 *
 * 5 - return first 10 indexes of sorting array, or first 11 indexes (if startCellIndex will be in array)
 * @param {number} startCellIndex cell first click
 * @returns {number[]} array with 10 elements - indexes of array with 256 elements, where bombs will be located
 */
export const generateBombs = (startCellIndex: number) => {
  const arraySortKeys = [...Array(CONSTANTS.CELLS_COUNT).keys()] // 1 and 2
    .sort(() => Math.random() - 0.5); // 3

  // 4
  // index of startCellIndex in sorting array
  const indexOfStartCellIndex = arraySortKeys.indexOf(startCellIndex);

  // 5
  if (indexOfStartCellIndex < 10) {
    const arrBeforeStartCellIndex = arraySortKeys.slice(
      0,
      indexOfStartCellIndex,
    );
    const arrAfterStartCellIndex = arraySortKeys.slice(
      indexOfStartCellIndex + 1,
      11,
    );
    return [...arrBeforeStartCellIndex, ...arrAfterStartCellIndex];
  }
  return arraySortKeys.slice(0, 10);
};
