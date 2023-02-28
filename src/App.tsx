import './App.scss';
import { Container } from './components';

function App() {
  return (
    <div className="App">
      <Container>
        <div className="box">
          <div className="sapper">
            <div className="row">
              <div className="icon icon__number icon__number_one" />
              <div className="icon icon__number icon__number_two" />
              <div className="icon icon__number icon__number_three" />
              <div className="icon icon__number icon__number_four" />
              <div className="icon icon__number icon__number_five" />
              <div className="icon icon__number icon__number_six" />
              <div className="icon icon__number icon__number_seven" />
              <div className="icon icon__number icon__number_eight" />
              <div className="icon icon__number icon__number_nine" />
              <div className="icon icon__number icon__number_zero" />
            </div>

            <div className="row">
              <div className="icon icon__smile icon__smile_happy" />
              <div className="icon icon__smile icon__smile_happy-clicked" />
              <div className="icon icon__smile icon__smile_surprised" />
              <div className="icon icon__smile icon__smile_with-glasses" />
              <div className="icon icon__smile icon__smile_sad" />
            </div>

            <div className="row cells">
              <div className="sub-row">
                <div className="icon icon__cell icon__cell_empty" />
                <div className="icon icon__cell icon__cell_empty-clicked" />
                <div className="icon icon__cell icon__cell_flag" />
                <div className="icon icon__cell icon__cell_question" />
                <div className="icon icon__cell icon__cell_question-clicked" />
                <div className="icon icon__cell icon__cell_bomb" />
                <div className="icon icon__cell icon__cell_bomb_red" />
                <div className="icon icon__cell icon__cell_bomb_error" />
              </div>
              <div className="sub-row">
                <div className="icon icon__cell icon__cell_one" />
                <div className="icon icon__cell icon__cell_two" />
                <div className="icon icon__cell icon__cell_three" />
                <div className="icon icon__cell icon__cell_four" />
                <div className="icon icon__cell icon__cell_five" />
                <div className="icon icon__cell icon__cell_six" />
                <div className="icon icon__cell icon__cell_seven" />
                <div className="icon icon__cell icon__cell_eight" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
