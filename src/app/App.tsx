import { MouseEvent, useState } from 'react';

import styles from './App.module.scss';
import { Cell, Container, Dial, Smile, Wrapper } from '../components';
import { generatePlayground } from '../helpers/generate-playground';
import { CONSTANTS, Playground } from './types';
import { openCells } from '../helpers/open-cells';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [resultGame, setResultGame] = useState<'win' | 'lose' | null>(null);
  const [flagCount, setFlagCount] = useState(10);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [bombIndexes, setBombIndexes] = useState<number[]>([]);
  const [playground, setPlayground] = useState<Playground>(
    [] as unknown as Playground,
  );
  // console.log('playground ', playground);

  const handlers = {
    clickCell: (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (target.role === 'cell') {
        const clickedCellIndex = target.dataset.index;

        if (!startGame) {
          setStartGame(true);
          const id = setInterval(() => {
            setTime((prevState) => prevState + 1);
          }, 1000);
          setIntervalId(id);

          // get cell index to avoid hitting the bomb in the first click
          if (clickedCellIndex) {
            setPlayground(generatePlayground(+clickedCellIndex));
          }
        }

        if (clickedCellIndex) {
          openCells(+clickedCellIndex, playground);
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
        ? Array(CONSTANTS.CELLS_COUNT)
            .fill(0)
            .map((_, i) => (
              // children are static, so can safely use the index here
              <Cell key={i} cell="empty" hide data-index={i} />
            ))
        : playground.map((cell, i) => {
            return (
              <Cell key={i} cell={cell.value} hide={false} data-index={i} />
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
