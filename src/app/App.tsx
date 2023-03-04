import { MouseEvent, useEffect, useState } from 'react';

import { useStore } from '../store';
import styles from './App.module.scss';
import { Cell, Container, Dial, Smile, Wrapper } from '../components';
import { CONSTANTS } from './types';

function App() {
  const statusGame = useStore((state) => state.statusGame);
  const time = useStore((state) => state.time);
  const clock = useStore((state) => state.clock);
  const loseBombIndex = useStore((state) => state.loseBombIndex);
  const resultGame = useStore((state) => state.resultGame);
  const playground = useStore((state) => state.playground);

  const setStartGame = useStore((state) => state.setStartGame);
  const changeTime = useStore((state) => state.changeTime);
  const incrementClock = useStore((state) => state.incrementClock);
  const setGameOver = useStore((state) => state.setGameOver);
  const setOpenCells = useStore((state) => state.setOpenCells);
  const changeCellOnFlagOrQuestion = useStore((state) => state.changeCellOnFlagOrQuestion);

  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [cellClicked, setCellClicked] = useState<boolean>(false);

  useEffect(() => {
    changeTime();
  }, [changeTime, clock]);

  useEffect(() => {
    if (resultGame && intervalId) {
      clearInterval(intervalId);
    }
  }, [resultGame, intervalId]);

  const handlers = {
    clickCell: (e: MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      if (target.role === 'cell') {
        const clickedCellIndex = target.dataset.index;

        if (clickedCellIndex) {
          if (statusGame !== 'work') {
            setStartGame(+clickedCellIndex);
            const id = setInterval(() => {
              incrementClock();
            }, 1000);
            setIntervalId(id);
          }
          setOpenCells(+clickedCellIndex);
        }
      }
    },

    gameOver: () => {
      setGameOver();
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
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

      if (cellIndex) {
        if (statusGame !== 'work') {
          setStartGame(+cellIndex);
        }
        changeCellOnFlagOrQuestion(+cellIndex);
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
                // hide={cell.value === 'bomb' ? false : cell.hide} open mines (for testing win)
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
              <Dial value={clock >= 999 ? 999 : clock} />
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
