import { Playground } from '../../app/types';

export const checkWinGame = (playground: Playground) => {
  let openedCells = 0;

  for (let i = 0; i < playground.length; i++) {
    if (!playground[i].hide) {
      openedCells += 1;
    }
  }

  // 218 - cells without bombs
  return openedCells === 218;
};
