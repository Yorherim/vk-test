import styles from './App.module.scss';
import { Cell, Container, Number, Smile, Wrapper } from './components';

const cellsCount = 256;
function App() {
  return (
    <div className={styles.app}>
      <Container>
        <div className={styles.sapper}>
          <Wrapper>
            <div className={styles.top}>
              <div className={styles.points}>
                <Number number={4} />
                <Number number={5} />
                <Number number={6} />
              </div>

              <Smile smile="happy" />

              <div className={styles.timer}>
                <Number number={1} />
                <Number number={2} />
                <Number number={3} />
              </div>
            </div>

            <div className={styles.playground}>
              {Array(cellsCount)
                .fill(0)
                .map((_, i) => (
                  // children are static, so can safely use the index here
                  <Cell key={i} cell="empty" />
                ))}
            </div>
          </Wrapper>
        </div>
      </Container>
    </div>
  );
}

export default App;
