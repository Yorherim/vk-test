import { MouseEvent, useState } from 'react';

import styles from './App.module.scss';
import { Cell, Container, Dial, Smile, Wrapper } from './components';
import { CellNumber, CellValue } from './components/cell/types';

type PlaygroundWithOnlyBombs = ('bomb' | null)[];
type Playground = (Extract<CellValue, 'bomb' | 'empty'> | CellNumber)[];
type Location =
  | 'top-left'
  | 'top-middle'
  | 'top-right'
  | 'left'
  | 'right'
  | 'bottom-left'
  | 'bottom-middle'
  | 'bottom-right';

const cellsCount = 256;

function App() {
  const [startGame, setStartGame] = useState(false);
  const [resultGame, setResultGame] = useState<'win' | 'lose' | null>(null);
  const [flagCount, setFlagCount] = useState(10);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [bombIndexes, setBombIndexes] = useState<number[]>([]);
  const [playground, setPlayground] = useState<Playground>([] as unknown as Playground);
  // console.log('playground ', playground);

  const helpers = {
    generateBombs: (startCellIndex: number) => {
      // algorithm for generate bombs
      // 1 - create Array with 256 elements
      // 2 - get keys of the array => create array with indexes (0, 255)
      // 3 - sort in any order
      // 4 - find index of startCellIndex in sorting array
      // 5 - return first 10 indexes of sorting array, or 11 without startCellIndex

      const arraySortKeys = [...Array(cellsCount).keys()] // 1 and 2
        .sort(() => Math.random() - 0.5); // 3

      // 4
      // index of startCellIndex in sorting array
      const indexOfStartCellIndex = arraySortKeys.indexOf(startCellIndex);

      // 5
      if (indexOfStartCellIndex < 10) {
        const arrBeforeStartCellIndex = arraySortKeys.slice(0, indexOfStartCellIndex);
        const arrAfterStartCellIndex = arraySortKeys.slice(indexOfStartCellIndex + 1, 11);
        return [...arrBeforeStartCellIndex, ...arrAfterStartCellIndex];
      }
      return arraySortKeys.slice(0, 10);
    },
    checkRowAndColumn: (
      currentCellIndex: number,
      verifiableCellIndex: number,
      location: Location,
    ) => {
      const currentCellRow = 16 - Math.ceil((cellsCount - currentCellIndex) / 16) + 1;
      const currentCellColumn = 16 - ((cellsCount - currentCellIndex - 1) % 16);

      const verifiableCellRow = 16 - Math.ceil((cellsCount - verifiableCellIndex) / 16) + 1;
      const verifiableCellColumn = 16 - ((cellsCount - verifiableCellIndex - 1) % 16);

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
            currentCellRow - verifiableCellRow === 1 && currentCellColumn === verifiableCellColumn
          );
        case 'top-right':
          return (
            currentCellRow - verifiableCellRow === 1 &&
            currentCellColumn - verifiableCellColumn === -1
          );
        case 'left':
          return (
            currentCellRow === verifiableCellRow && currentCellColumn - verifiableCellColumn === 1
          );
        case 'right':
          return (
            currentCellRow === verifiableCellRow && currentCellColumn - verifiableCellColumn === -1
          );
        case 'bottom-left':
          return (
            currentCellRow - verifiableCellRow === -1 &&
            currentCellColumn - verifiableCellColumn === 1
          );
        case 'bottom-middle':
          return (
            currentCellRow - verifiableCellRow === -1 && currentCellColumn === verifiableCellColumn
          );
        default:
          return (
            currentCellRow - verifiableCellRow === -1 &&
            currentCellColumn - verifiableCellColumn === -1
          );
      }
    },
    generateCell: (elem: 'bomb' | null, cellIndex: number, arr: PlaygroundWithOnlyBombs) => {
      if (elem === 'bomb') {
        return elem;
      }

      let nearBombs = 0;

      const adjacentCells = new Map([
        [
          'topLeftCell',
          helpers.checkRowAndColumn(cellIndex, cellIndex - 17, 'top-left')
            ? arr[cellIndex - 17]
            : null,
        ],
        [
          'topMiddleCell',
          helpers.checkRowAndColumn(cellIndex, cellIndex - 16, 'top-middle')
            ? arr[cellIndex - 16]
            : null,
        ],
        [
          'topRightCell',
          helpers.checkRowAndColumn(cellIndex, cellIndex - 15, 'top-right')
            ? arr[cellIndex - 15]
            : null,
        ],
        [
          'leftCell',
          helpers.checkRowAndColumn(cellIndex, cellIndex - 1, 'left') ? arr[cellIndex - 1] : null,
        ],
        [
          'rightCell',
          helpers.checkRowAndColumn(cellIndex, cellIndex + 1, 'right') ? arr[cellIndex + 1] : null,
        ],
        [
          'bottomLeftCell',
          helpers.checkRowAndColumn(cellIndex, cellIndex + 15, 'bottom-left')
            ? arr[cellIndex + 15]
            : null,
        ],
        [
          'bottomMiddleCell',
          helpers.checkRowAndColumn(cellIndex, cellIndex + 16, 'bottom-middle')
            ? arr[cellIndex + 16]
            : null,
        ],
        [
          'bottomRightCell',
          helpers.checkRowAndColumn(cellIndex, cellIndex + 17, 'bottom-right')
            ? arr[cellIndex + 17]
            : null,
        ],
      ]);

      for (const value of adjacentCells.values()) {
        if (value === 'bomb') {
          nearBombs += 1;
        }
      }

      // console.log(`adjacentCells index ${cellIndex}`, adjacentCells, `nearBombs ${nearBombs}`);

      return nearBombs === 0 ? ('empty' as const) : (nearBombs as CellNumber);
    },
    generatePlayground: (startCellIndex: number): Playground => {
      const arrBombIndexes = helpers.generateBombs(startCellIndex);

      const arrPlaygroundWithOnlyBombs: PlaygroundWithOnlyBombs = Array(cellsCount)
        .fill(null)
        .map((elem, i) => {
          if (arrBombIndexes.includes(i)) {
            return 'bomb';
          }
          return elem;
        });

      // return playground with bombs, numbers and empty cells
      return arrPlaygroundWithOnlyBombs.map((elem, i, arr) => {
        return helpers.generateCell(elem, i, arr);
      });
    },
  };

  const handlers = {
    clickCell: (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (target.role === 'cell') {
        if (!startGame) {
          setStartGame(true);
          const id = setInterval(() => {
            setTime((prevState) => prevState + 1);
          }, 1000);
          setIntervalId(id);

          // get cell index to avoid hitting the bomb in the first click
          const startCellIndex = target.dataset.index;
          if (startCellIndex) {
            setPlayground(helpers.generatePlayground(+startCellIndex));
          }
        }
      }
    },
    gameOver: () => {
      setStartGame(false);
      if (intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      setTime(0);
      setPlayground([]);
    },
  };

  const renders = {
    playground: () => {
      return playground.length === 0
        ? Array(cellsCount)
            .fill(0)
            .map((_, i) => (
              // children are static, so can safely use the index here
              <Cell key={i} cell="hide" data-index={i} />
            ))
        : playground.map((cell, i) => <Cell key={i} cell={cell} data-index={i} />);
    },
  };

  return (
    <div className={styles.app}>
      <Container>
        <div className={styles.sapper}>
          <Wrapper>
            <div className={styles.top}>
              <Dial value={flagCount} />
              <Smile smile="happy" onClick={handlers.gameOver} />
              <Dial value={time} />
            </div>

            <div className={styles.playground} onClick={handlers.clickCell}>
              {renders.playground()}
            </div>
          </Wrapper>
        </div>
      </Container>
    </div>
  );
}

export default App;
