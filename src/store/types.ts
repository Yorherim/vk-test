import { CellNumber, CellValue } from '../components/cell/types';
import { CONSTANTS } from '../app/types';

export type ResultGame = 'win' | 'lose' | null;

export type CellRightClickType = Extract<CellValue, 'flag' | 'question'> | null;

export type CellPlayground = {
  value: Extract<CellValue, 'bomb' | 'empty'> | CellNumber;
  hide: boolean;
  index: number;
  rightClickType: CellRightClickType;
};
export type Playground = CellPlayground[];

export type Store = {
  statusGame: 'work' | 'waiting';
  resultGame: ResultGame;
  time: CONSTANTS.TIME;
  clock: number;
  intervalId: number | null;
  playground: Playground;
  loseBombIndex: number | null;
  cellClicked: boolean;

  // actions
  setLoseBombIndex: (cellIndex: number) => void;
  setStartGame: (clickedCellIndex: number) => void;
  changeTime: () => void;
  incrementClock: () => void;
  setGameOver: () => void;
  setOpenCells: (clickedCellIndex: number) => void;
  changeCellOnFlagOrQuestion: (cellIndex: number) => void;
};
