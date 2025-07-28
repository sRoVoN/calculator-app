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
      const isNumEmpty = calc.num === 0 || calc.num === "0" || calc.num === null || calc.num === "";
  if (isNumEmpty && calc.res && calc.sign) {
    
    setCalc(prev => ({
      ...prev,
      sign: value
    }));
     setActiveOperator(value);
  } else {
       setCalc({
      sign: value,
      res: calc.num || calc.res, 
      num: 0,
    });
    setActiveOperator(value);
  }
}

    const equalsClick = () => {
  // اگر هیچ عملگری انتخاب نشده یا عدد اول یا دوم وجود نداره، عملیات رو انجام نده
  if (!calc.sign || calc.num === null || calc.res === null) return;

  // اگر کاربر تقسیم بر صفر کرده
  if (calc.sign === "/" && Number(calc.num) === 0) {
    alert("تقسیم بر صفر مجاز نیست");
    return;
  }

  const math = (a, b, sign) => {
    const result = {
      "+": (a, b) => a + b,
      "-": (a, b) => (a - b),
      "X": (a, b) => a * b,
      "/": (a, b) => a / b,
    };

    // فقط اگر sign معتبره، ادامه بده
    if (!result[sign]) {
      return 0;
    }

    return result[sign](a, b);
  };

  const result = math(Number(calc.res), Number(calc.num), calc.sign);
  const roundedResult = result.toFixed(2);

  setCalc({
  res: parseFloat(roundedResult),
  sign: "",
  num: 0,
   });
  setActiveOperator(false);
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