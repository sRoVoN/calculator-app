
import './App.css'
import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';
import React, { useState } from 'react';
import buttonValues from './buttonValues';
import Button from './components/Button';
import CalcProvider from './context/CalcContext';

function App() {
  const [activeOperator, setActiveOperator] = useState(false);

  return (
    <>
    <CalcProvider >
    <Wrapper>
      <Screen />
      <ButtonBox>
        {
          buttonValues.flat().map((btn, index) => (
            <Button
            value={btn}
            key={index}
            activeOperator={activeOperator}
            setActiveOperator={setActiveOperator}
            />
          ))
        }
      </ButtonBox>
    </Wrapper>
    </CalcProvider>
    </>
  )
}

export default App
