import React, { useContext } from 'react'
import { CalcContext } from '../context/CalcContext';

const getStyleName = value => {
  const className = {
    "=" : "equals",
    "X" : "opt",
    "+" : "opt",
    "-" : "opt",
    "/" : "opt",
    "0" : "zero",
    "C" : "keys",
    "%" : "keys",
    "+-" : "keys"
  }      
  return className[value] || 'button'
};

function Button({value, setActiveOperator, activeOperator}) {
    const {calc, setCalc} = useContext(CalcContext);
    

    
    const comaClick = () => {
        setCalc({...calc, num: !calc.num.toString().includes(".") ? calc.num + value : calc.num})
    }
    const resetClick = () => {
        setCalc({sign: "", num: "0", res: "0"});
        setActiveOperator(false)
    }
    // user click number
    const handleClickButton = () => {
        const numberString = value.toString();
        let numberValue;
        if(numberString === "0" && calc.num === 0){
            numberValue = "0";
        } else {
            numberValue = Number(calc.num + numberString)
        }
        setCalc({...calc, num: numberValue})
    }
//  User Click Operation
    const signClick = () => {
      if (calc.num === 0 && calc.res !== "0") {
        setCalc({
          sign: value,
          res: calc.res,
          num: 0, 
        });
      } else {
        setActiveOperator(value); 
        setCalc({
          sign: value,
          res: calc.num,
          num: 0, 
      }
    }
    const equalsClick = () => {
        const math = (a, b, sign) => {
          const result = {
            "+": (a,b) => a + b,
            "-": (a,b) => (a - b) * -1,
            "X": (a,b) => a * b,
            "/": (a,b) => a / b,
          }
          return result[sign](a,b)
        }          
        const result = math(calc.num, calc.res, calc.sign);
        const roundedResult = result.toFixed(2); 
      setCalc( () => {
       return {
        res: parseFloat(roundedResult), 
            sign: "",    
            num: 0       
        };
      });

    }
    const percentClick = () => {
      setCalc({
        num: (calc.num / 100),
        res: (calc.res / 100),
        sign: ""
      })
    }
    const invertClick = () => {
      setCalc({
        num: calc.num ? calc.num * -1 : 0,
        res: calc.res ? calc.res * -1 : 0,
        sign: ""
      })
    }
    
    const handleClick = (value) => {
        const results = {
            "." : comaClick,
            "C" : resetClick,
            "+": signClick,
            "-": signClick,
            "X": signClick,
            "/": signClick,
            "=": equalsClick,
            "%": percentClick,
            "+-": invertClick
        }
        const action = results[value];
        if(action){
            return action()
        } else {
            return handleClickButton();
        }
    }

      
  return (
    <button 
    className={`${getStyleName(value)} button ${activeOperator === value ? "active-btn" : ""} `}
    onClick={() => handleClick(value)}
    >{value}</button>
  )
}

export default Button