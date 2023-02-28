import './App.scss';
import { Cell, Container, Number, Smile } from './components';

function App() {
  return (
    <div className="App">
      <Container>
        <div className="box">
          <div className="sapper">
            <div className="row">
              <Number number={1} />
              <Number number={2} />
              <Number number={3} />
              <Number number={4} />
              <Number number={5} />
              <Number number={6} />
              <Number number={7} />
              <Number number={8} />
              <Number number={9} />
              <Number number={0} />
            </div>

            <div className="row">
              <Smile smile="happy" />
              <Smile smile="happy-clicked" />
              <Smile smile="surprised" />
              <Smile smile="with-glasses" />
              <Smile smile="sad" />
            </div>

            <div className="row cells">
              <div className="sub-row">
                <Cell cell="empty" />
                <Cell cell="empty-clicked" />
                <Cell cell="flag" />
                <Cell cell="question" />
                <Cell cell="question-clicked" />
                <Cell cell="bomb" />
                <Cell cell="bomb-red" />
                <Cell cell="bomb-error" />
              </div>
              <div className="sub-row">
                <Cell cell={1} />
                <Cell cell={2} />
                <Cell cell={3} />
                <Cell cell={4} />
                <Cell cell={5} />
                <Cell cell={6} />
                <Cell cell={7} />
                <Cell cell={8} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
