import { useState } from 'react';

import styles from './App.module.scss';
import { Cell, Container, Smile, Dial, Wrapper } from './components';

const cellsCount = 256;

function App() {
  const [startGame, setStartGame] = useState(false);
  const [resultGame, setResultGame] = useState<'win' | 'lose' | null>(null);
  const [flagCount, setFlagCount] = useState(10);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const handlers = {
    clickCell: () => {
      if (!startGame) {
        setStartGame(true);
        const id = setInterval(() => {
          setTime((prevState) => prevState + 1);
        }, 1000);
        setIntervalId(id);
      }
    },
    gameOver: () => {
      setStartGame(false);
      if (intervalId !== null) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      setTime(0);
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

            <div className={styles.playground}>
              {Array(cellsCount)
                .fill(0)
                .map((_, i) => (
                  // children are static, so can safely use the index here
                  <Cell key={i} cell="empty" onClick={handlers.clickCell} />
                ))}
            </div>
          </Wrapper>
        </div>
      </Container>
    </div>
  );
}

export default App;
