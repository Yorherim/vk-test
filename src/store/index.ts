import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { Store } from './types';
import { CONSTANTS } from '../app/types';

import { generatePlayground, openCells } from '../helpers';

export const useStore = create<Store>()(
  immer((set) => ({
    statusGame: 'waiting',
    resultGame: null,
    time: CONSTANTS.TIME,
    clock: 0,
    intervalId: null,
    playground: [],
    loseBombIndex: null,
    cellClicked: false,

    // =============== actions ===============
    setLoseBombIndex: (cellIndex: number) => set({ loseBombIndex: cellIndex }),

    setStartGame: (clickedCellIndex: number) =>
      set((state) => {
        state.statusGame = 'work';
        state.playground = generatePlayground(clickedCellIndex);
      }),

    setOpenCells: (clickedCellIndex: number) =>
      set((state) => {
        const copyPlayground = [...state.playground];

        if (!(copyPlayground[+clickedCellIndex].rightClickType === 'flag')) {
          const result = openCells(+clickedCellIndex, copyPlayground, 'initial');
          state.playground = copyPlayground;

          if (result === 'lose') {
            state.resultGame = 'lose';
            state.loseBombIndex = clickedCellIndex;
          }
          if (result === 'win') {
            state.resultGame = 'win';
          }
        }
      }),

    incrementClock: () =>
      set((state) => {
        state.clock += 1;
      }),

    changeTime: () =>
      set((state) => {
        const minutesPassed = CONSTANTS.TIME - Math.floor(state.clock / 60);
        if (minutesPassed < state.time) {
          state.time -= 1;
          if (minutesPassed === 0) {
            state.resultGame = 'lose';
            if (state.intervalId) {
              clearInterval(state.intervalId);
            }
          }
        }
      }),

    setGameOver: () =>
      set((state) => {
        state.statusGame = 'waiting';
        if (state.intervalId) {
          clearInterval(state.intervalId);
          state.intervalId = null;
        }
        state.clock = 0;
        state.time = CONSTANTS.TIME;
        state.playground = [];
        state.resultGame = null;
      }),

    changeCellOnFlagOrQuestion: (cellIndex: number) =>
      set((state) => {
        const cell = state.playground[+cellIndex];

        if (cell.rightClickType === 'flag') {
          cell.rightClickType = 'question';
        } else if (cell.rightClickType === 'question') {
          cell.rightClickType = null;
        } else {
          cell.rightClickType = 'flag';
        }
      }),
  })),
);
