import { CONSTANTS } from '../app/types';

type LocationCell =
  | 'top-left'
  | 'top-middle'
  | 'top-right'
  | 'left'
  | 'right'
  | 'bottom-left'
  | 'bottom-middle'
  | 'bottom-right';

export const checkRowAndColumn = (
  currentCellIndex: number,
  verifiableCellIndex: number,
  location: LocationCell,
) => {
  const currentCellRow =
    16 - Math.ceil((CONSTANTS.CELLS_COUNT - currentCellIndex) / 16) + 1;
  const currentCellColumn =
    16 - ((CONSTANTS.CELLS_COUNT - currentCellIndex - 1) % 16);

  const verifiableCellRow =
    16 - Math.ceil((CONSTANTS.CELLS_COUNT - verifiableCellIndex) / 16) + 1;
  const verifiableCellColumn =
    16 - ((CONSTANTS.CELLS_COUNT - verifiableCellIndex - 1) % 16);

  if (
    verifiableCellRow < 1 ||
    verifiableCellRow > 16 ||
    verifiableCellColumn < 1 ||
    verifiableCellColumn > 16
  ) {
    return false;
  }

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
