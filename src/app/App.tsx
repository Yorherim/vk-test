import { MouseEvent, useEffect, useState } from 'react';

import styles from './App.module.scss';
import { Cell, Container, Dial, Smile, Wrapper } from '../components';
import { generatePlayground, openCells } from '../helpers';
import { CONSTANTS, Playground, ResultGame } from './types';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [resultGame, setResultGame] = useState<ResultGame>(null);
  const [time, setTime] = useState(CONSTANTS.TIME);
  const [clock, setClock] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [playground, setPlayground] = useState<Playground>([] as unknown as Playground);
  const [loseBombIndex, setLoseBombIndex] = useState<number | null>(null);
  const [cellClicked, setCellClicked] = useState<boolean>(false);

  useEffect(() => {
    const minutesPassed = CONSTANTS.TIME - Math.floor(clock / 60);
    if (minutesPassed < time) {
      setTime((prevState) => prevState - 1);

      if (minutesPassed === 0) {
        setResultGame('lose');
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    }
  }, [clock, time, intervalId]);

  const handlers = {
    clickCell: (e: MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      if (target.role === 'cell') {
        const clickedCellIndex = target.dataset.index;
        let newPlayground = [] as Playground;

        if (!startGame) {
          setStartGame(true);
          const id = setInterval(() => {
            setClock((prevState) => prevState + 1);
          }, 1000);
          setIntervalId(id);

          if (clickedCellIndex) {
            newPlayground = generatePlayground(+clickedCellIndex);
          }
        }

        if (clickedCellIndex) {
          const copyPlayground = playground.length ? [...playground] : [...newPlayground];

          if (copyPlayground[+clickedCellIndex].rightClickType === 'flag') {
            return;
          }

          const result = openCells(+clickedCellIndex, copyPlayground, 'initial');
          setPlayground(copyPlayground);

          if (result === 'lose') {
            setResultGame('lose');
            setLoseBombIndex(+clickedCellIndex);
            if (intervalId) {
              clearInterval(intervalId);
            }
          }
          if (result === 'win') {
            setResultGame('win');
            if (intervalId) {
              clearInterval(intervalId);
            }
          }
        }
      }
    },

    gameOver: () => {
      setStartGame(false);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      setClock(0);
      setTime(CONSTANTS.TIME);
      setPlayground([]);
      setResultGame(null);
    },

    downMouseCell: () => {
      setCellClicked(true);
    },
    upMouseCell: () => {
      setCellClicked(false);
    },
    leaveMouseFromCell: () => {
      setCellClicked(false);
    },

    setFlagOrQuestion: (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const target = e.target as HTMLDivElement;
      const cellIndex = target.dataset.index;
      let newPlayground = [] as Playground;

      if (cellIndex) {
        if (!startGame) {
          setStartGame(true);
          newPlayground = generatePlayground(+cellIndex);
        }

        const copyPlayground = playground.length ? [...playground] : [...newPlayground];

        if (copyPlayground[+cellIndex].rightClickType === 'flag') {
          copyPlayground[+cellIndex].rightClickType = 'question';
          setPlayground(copyPlayground);
          return;
        }
        if (copyPlayground[+cellIndex].rightClickType === 'question') {
          copyPlayground[+cellIndex].rightClickType = null;
          setPlayground(copyPlayground);
          return;
        }

        copyPlayground[+cellIndex].rightClickType = 'flag';
        setPlayground(copyPlayground);
      }
    },
  };

  const renders = {
    playground: () => {
      return playground.length === 0
        ? Array(CONSTANTS.CELLS_COUNT)
            .fill(0)
            .map((_, i) => (
              // children are static, so can safely use the index here
              <Cell key={i} cell="empty" hide data-index={i} aria-disabled />
            ))
        : playground.map((cell) => {
            return (
              <Cell
                key={cell.index}
                cell={cell.value}
                // hide={cell.value === 'bomb' ? false : cell.hide}
                hide={cell.hide}
                loseBombIndex={loseBombIndex}
                resultGame={resultGame}
                cellIndex={cell.index}
                rightClickType={cell.rightClickType}
                data-index={cell.index}
              />
            );
          });
    },
  };

  return (
    <div className={styles.app}>
      <Container>
        <div className={styles.sapper}>
          <Wrapper>
            <div className={styles.top}>
              <Dial value={time} />
              <Smile
                smile="happy"
                onClick={handlers.gameOver}
                resultGame={resultGame}
                cellClicked={cellClicked}
              />
              <Dial value={clock} />
            </div>

            <div
              className={`${styles.playground} ${
                resultGame === 'win' || resultGame === 'lose' ? styles.playground_disabled : ''
              }`}
              onClick={handlers.clickCell}
              onMouseDown={handlers.downMouseCell}
              onMouseUp={handlers.upMouseCell}
              onMouseLeave={handlers.leaveMouseFromCell}
              onContextMenu={handlers.setFlagOrQuestion}
            >
              {renders.playground()}
            </div>
          </Wrapper>
        </div>
      </Container>
    </div>
  );
}

export default App;
