import { Playground } from '../../store/types';

/**
 * function for check win
 *
 * if all (not bombs) playground cells opened - return true (win)
 *
 * else return false
 * @param playground
 */
export const checkWinGame = (playground: Playground): boolean => {
  let openedCells = 0;

  for (let i = 0; i < playground.length; i++) {
    if (!playground[i].hide) {
      openedCells += 1;
    }
  }

  // 218 - cells without bombs
  return openedCells === 218;
};
