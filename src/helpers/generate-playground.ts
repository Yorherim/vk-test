import { generateBombs } from './generate-bombs';
import { generateCell, PlaygroundWithOnlyBombs } from './generate-cell';
import { CONSTANTS, Playground } from '../app/types';

export const generatePlayground = (startCellIndex: number): Playground => {
  const arrBombIndexes = generateBombs(startCellIndex);

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

  // return playground with bombs, numbers and empty cells
  return arrPlaygroundWithOnlyBombs.map((elem, i, arr) => {
    return generateCell(elem, i, arr);
  });
};
