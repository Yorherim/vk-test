import { CONSTANTS } from '../../app/types';
import { LocationCell } from '../get-adjacent-cells/types';

/**
 * Function for check row and column cell.
 *
 * It's need to make sure that the desired cell is in the playground zone.
 *
 * And correct find row or column of cell in array.
 *
 * algorithm:
 *
 * 1 - find row and column of current cell
 *
 * 2 - find row and column of verifiable cell
 *
 * 3 - check that verifiable cell is in the playground zone
 *
 * 4 - check correct find row or column of cell in array
 *
 * @param {number} currentCellIndex current cell
 * @param {number} verifiableCellIndex verifiable cell
 * @param {LocationCell} location position of verifiable cell
 * @returns {boolean} bomb or empty or number
 */
export const checkRowAndColumn = (
  currentCellIndex: number,
  verifiableCellIndex: number,
  location: LocationCell,
): boolean => {
  // 1
  const currentCellRow =
    16 - Math.ceil((CONSTANTS.CELLS_COUNT - currentCellIndex) / 16) + 1;
  const currentCellColumn =
    16 - ((CONSTANTS.CELLS_COUNT - currentCellIndex - 1) % 16);

  // 2
  const verifiableCellRow =
    16 - Math.ceil((CONSTANTS.CELLS_COUNT - verifiableCellIndex) / 16) + 1;
  const verifiableCellColumn =
    16 - ((CONSTANTS.CELLS_COUNT - verifiableCellIndex - 1) % 16);

  // 3
  if (
    verifiableCellRow < 1 ||
    verifiableCellRow > 16 ||
    verifiableCellColumn < 1 ||
    verifiableCellColumn > 16
  ) {
    return false;
  }

  // 4
  switch (location) {
    case 'top-left':
      return (
        currentCellRow - verifiableCellRow === 1 &&
        currentCellColumn - verifiableCellColumn === 1
      );
    case 'top-middle':
      return (
        currentCellRow - verifiableCellRow === 1 &&
        currentCellColumn === verifiableCellColumn
      );
    case 'top-right':
      return (
        currentCellRow - verifiableCellRow === 1 &&
        currentCellColumn - verifiableCellColumn === -1
      );
    case 'left':
      return (
        currentCellRow === verifiableCellRow &&
        currentCellColumn - verifiableCellColumn === 1
      );
    case 'right':
      return (
        currentCellRow === verifiableCellRow &&
        currentCellColumn - verifiableCellColumn === -1
      );
    case 'bottom-left':
      return (
        currentCellRow - verifiableCellRow === -1 &&
        currentCellColumn - verifiableCellColumn === 1
      );
    case 'bottom-middle':
      return (
        currentCellRow - verifiableCellRow === -1 &&
        currentCellColumn === verifiableCellColumn
      );
    default:
      return (
        currentCellRow - verifiableCellRow === -1 &&
        currentCellColumn - verifiableCellColumn === -1
      );
  }
};
