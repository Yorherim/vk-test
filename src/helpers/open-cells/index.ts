import { CONSTANTS } from '../../app/types';
import { getAdjacentCells } from '../get-adjacent-cells';
import { checkWinGame } from '../check-win-game';
import { CellPlayground, Playground } from '../../store/types';

function isCellPlayground(cell: CellPlayground | 'bomb' | null): cell is CellPlayground {
  return Boolean(cell) && typeof cell === 'object';
}

/**
 * function for correct open cells with recursion
 *
 * algorithm:
 *
 * 1 - Check click by user on bomb. If user clicked on bomb - return lose.
 *
 * 2 - Check that recursion is working in playground zone, breakpoint for recursion.
 *
 * 3 - Open cell if it is a number.
 *
 * 4 - Open cell if it is an empty, find adjacent cells and start recursion on them.
 * @param cellIndex start cell
 * @param playground
 * @param initialClick click by user or not (click maybe by user or by recursion)
 */
export const openCells = (
  cellIndex: number,
  playground: Playground,
  initialClick: 'initial' | 'none' = 'none',
): void | 'lose' | 'win' => {
  const cell = playground[cellIndex];

  // 1
  if (initialClick === 'initial' && cell.value === 'bomb' && cell.hide) {
    cell.hide = false;
    return 'lose' as const;
  }

  // 2
  const clickedCellRow = 16 - Math.ceil((CONSTANTS.CELLS_COUNT - cellIndex) / 16) + 1;
  const clickedCellColumn = 16 - ((CONSTANTS.CELLS_COUNT - cellIndex - 1) % 16);

  if (
    clickedCellRow < 1 ||
    clickedCellRow > 16 ||
    clickedCellColumn < 1 ||
    clickedCellColumn > 16
  ) {
    return;
  }

  if (cell.hide) {
    // 3
    if (typeof cell.value === 'number') {
      playground[cellIndex].hide = false;

      const result = checkWinGame(playground);
      if (result) {
        return 'win' as const;
      }
    }

    // 4
    if (playground[cellIndex].value === 'empty') {
      playground[cellIndex].hide = false;

      const result = checkWinGame(playground);
      if (result) {
        return 'win' as const;
      }

      const adjacentCells = getAdjacentCells(cellIndex, playground);

      for (const adjacentCell of Object.values(adjacentCells)) {
        if (isCellPlayground(adjacentCell)) {
          openCells(adjacentCell.index, playground);
        }
      }
    }
  }
};
