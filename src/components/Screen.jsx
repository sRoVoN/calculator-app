import React, { useContext } from 'react'
import { CalcContext } from '../context/CalcContext'

function Screen() {
    const {calc} = useContext(CalcContext);
  return (
    <div className="responsive-text">{calc.num ? calc.num : calc.res}</div>
  )
}

export default Screen;