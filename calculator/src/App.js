import './App.css';
import Calculator from './Components/Calculator/Calculator'

function App() {

  return (
    <div className='App'>
      <h1 id='title'>VidMob Calculator</h1>
      <p id='description'>This is a calculator designed for VidMob.  It takes in an equation in the form of a string and delivers an answer.  There is no need to separate for a negative number, the calculator will recognize a negative in front of a number as negative if it follows another operator.  If the equation is not written properly, it will give a syntax error.  It also will not accept any letters within the equation.  A set of two nested equations with no operator between them will be treated as being multiplied.<br></br><br></br>Examples of a syntax error: <br></br>(4+2)((5+3)<br></br>4+-+-5</p>
      <Calculator />
    </div>
  );
}

export default App;
