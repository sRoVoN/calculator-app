export const comaClick = (setCalc, calc) => {
  if (!String(calc.num).includes(".")) {
    setCalc({ ...calc, num: calc.num + "." });
  }
};
export const resetClick = (setCalc) => {
  setCalc({
    sign: "",
    num: 0,
    res: 0,
  });
};
export const signClick = (calc, setActiveOperator, setCalc, value) => {
  const isNumEmpty =
    calc.num === 0 || calc.num === "0" || calc.num === null || calc.num === "";

  if (isNumEmpty) {
    setCalc(prev => ({
      ...prev,
      sign: value
    }));
  } else {
    setCalc({
      sign: value,
      res: calc.num,
      num: 0,
    });
  }

  if (setActiveOperator) setActiveOperator(value);
};
export const handleClickButton = (value, setCalc, calc) => {
  const numberString = value.toString();
  let numberValue;
  if (numberString === "0" && Number(calc.num) === 0) {
    numberValue = "0";
  } else {
    numberValue = Number(String(calc.num) + numberString);
  }
  setCalc({ ...calc, num: numberValue });
};
export const equalsClick = (calc, setCalc, setActiveOperator) => {
  if (!calc.sign || calc.num === null || calc.res === null) return;
  if (calc.sign === "/" && Number(calc.num) === 0) return;

  const math = (a, b, sign) => {
    const result = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      X: (a, b) => a * b,
      "/": (a, b) => a / b,
    };
    return result[sign] ? result[sign](a, b) : 0;
  };

  const result = math(Number(calc.res), Number(calc.num), calc.sign);
  const roundedResult = parseFloat(result.toFixed(2));

  setCalc({
    res: roundedResult,
    sign: "",
    num: 0,
  });

  if (setActiveOperator) setActiveOperator(false);
};
export const percentClick = (setCalc, calc) => {
  setCalc({
    num: calc.num ? calc.num / 100 : 0,
    res: calc.res ? calc.res / 100 : 0,
    sign: "",
  });
};
export const invertClick = (setCalc, calc) => {
  setCalc({
    num: calc.num ? calc.num * -1 : 0,
    res: calc.res ? calc.res * -1 : 0,
    sign: "",
  });
};
