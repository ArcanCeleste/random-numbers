import { ChangeEvent, useState } from 'react'
import './App.css'
import { fbConfig } from './firebase/firebase';

function App() {
  fbConfig;
  const [resultNumber, setResultNumber] = useState(0);
  const [calculated, setCalculated] = useState(false);
  const [errorCalc, setErrorCalc] = useState(false);
  const [errorCalcMsg, setErrorCalcMsg] = useState('');
  const [mode, setMode] = useState('normal');
  const [minNumber, setMinNumber] = useState('');
  const [maxNumber, setMaxNumber] = useState('');
  
  const showError = (msg:string) => {
    setCalculated(false);
    setErrorCalc(true);
    setErrorCalcMsg(msg);
    setTimeout(()=>{
      setErrorCalc(false);
      setErrorCalcMsg("");
    }, 3000);
  }
  const changeMode = (e:ChangeEvent<HTMLSelectElement>) => {
    let elementValue = e.target.value;
    setMode(elementValue);
    return;
  } 
  const changeMinNumber = (e:ChangeEvent<HTMLInputElement>) => {
    let elementValue = e.target.value;
    setMinNumber(elementValue);
    return;
  } 
  const changeMaxNumber = (e:ChangeEvent<HTMLInputElement>) => {
    let elementValue = e.target.value;
    setMaxNumber(elementValue);
    return;
  } 
  const generateEvenNumber = (min: number, max: number)=> {
    if (max > 1000000000000 || min < -1000000000000 ) {
      showError("Enter a number betwen 1 trilion and -1 trilion");
    } else {
    let number = Math.floor(Math.random() * (max - min + 1)) + min;
    if (number % 2 == 0) {
      setResultNumber(number);
    } else {
      generateEvenNumber(min, max);
    }
    }
  }
  const generateOddNumber = (min: number, max: number)=> {
    if (max > 1000000000000 || min < -1000000000000 ) {
        showError("Enter a number betwen 1 trilion and -1 trilion");
    } else {
        let number = Math.floor(Math.random() * (max - min + 1)) + min;
        if (number % 2 != 0) {
          setResultNumber(number)
        } else {
          generateOddNumber(min, max)
        }
      }
  }
  const generateRandomNumber = () => {
    setErrorCalc(false);
    if (minNumber == '' || maxNumber == '' ) {
        showError("Enter the min and max number!");
    } else if (parseFloat(maxNumber) > 1000000000000 || parseFloat(minNumber) < -1000000000000 ) {
        showError("Enter a number betwen 1 trilion and -1 trilion");
    } else if (parseInt(minNumber) > parseInt(maxNumber)){
        showError("Min number can't be greater than max number!")
    } else if (parseInt(minNumber) === parseInt(maxNumber)) {
        setCalculated(true);
        setResultNumber(parseInt(minNumber));
    } else if (isNaN(parseInt(minNumber)) || isNaN(parseInt(maxNumber))) {
        showError("Enter a valid min and max number!");
    } else {
        let max = parseInt(maxNumber);
        let min = parseInt(minNumber);
        setCalculated(true)
        switch(mode) {
          case 'normal':
            setResultNumber(Math.floor(Math.random() * (max - min + 1)) + min)
          break;
          case 'even':
            generateEvenNumber(min, max)
          break;
          case 'odd':
            generateOddNumber(min, max)
          break
        }
    }
  }
  const resetRandomNumber = () => {
    setResultNumber(0);
    setCalculated(false);
    setErrorCalc(false);
    setErrorCalcMsg("");
    setMode('normal');
    setMinNumber('');
    setMaxNumber('');
  }
  return (
    <div className='container'>
      <header className='headerSite'>
        <h1 className='titleSite'><a href="/">Random Numbers</a></h1>
      </header>
      <main className='mainContent'>
        {calculated && 
          <div style={{
            color: (resultNumber > 0) ? 'green' : (resultNumber < 0) ? 'red' : 'black'
          }} className='resultArea'>
            {resultNumber}
          </div>
        }
        {errorCalc &&
          <div className='errorArea'>{errorCalcMsg}</div>
        }
        <div className='inputsArea'>
          <label className='inputLabel'>
            Min: 
            <input type="number" className='inputNumber' value={minNumber} onChange={changeMinNumber} placeholder='E.g.: 0'/>
          </label>
          <label className='inputLabel'>
            Max:
            <input type="number" className='inputNumber' value={maxNumber} onChange={changeMaxNumber} placeholder='E.g.: 100'/>
          </label>
        </div>
        <div className='buttonsArea'>
          <label className='labelSelectMode'>
            Mode: <select className='mode' value={mode} onChange={changeMode}>
              <option value="normal">Normal</option>
              <option value="odd">Odd</option>
              <option value="even">Even</option>
            </select>
          </label>
          <div className='buttonsGenerateReset'>
          <button className='optionButton' onClick={generateRandomNumber}>Generate</button>
          <button className='optionButton' onClick={resetRandomNumber}>Reset</button>
          </div>
        </div>
      </main>
      <footer className='footerSite'>
        <small>Created By Guilherme de Paula da Silva</small>
      </footer>
    </div>
  )
}

export default App
