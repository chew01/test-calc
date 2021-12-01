function add(num1, num2) {
  return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "add":
      return add(num1, num2);

    case "subtract":
      return subtract(num1, num2);

    case "multiply":
      return multiply(num1, num2);

    case "divide":
      return divide(num1, num2);
  }
}

const display = document.querySelector("p");
const digitButtonContainer = document.querySelector(".digits");
const digitButtons = digitButtonContainer.querySelectorAll("button");
const functionButtonContainer = document.querySelector(".functions");
const functionButtons = functionButtonContainer.querySelectorAll("button");
const equalButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");

let displayValue = "";
let savedValue = "";
let operator = "";

function changeDisplay() {
    if (savedValue !== "" && operator === "") {
        return;
    }
    
    if (displayValue.includes(".") && this.textContent === ".") {
        return;
    }
  displayValue += this.textContent;
  recalibrate();
}

function activateOperator() {
  if (displayValue !== "") {
    forceOperate();
  }
  operator = this.textContent;
  if (savedValue === "") {
    savedValue = displayValue;
  }
  displayValue = "";
  recalibrate();
}

function forceOperate() {
  let operation = "";
  switch (operator) {
    case "+":
      operation = "add";
      break;

    case "-":
      operation = "subtract";
      break;

    case "*":
      operation = "multiply";
      break;

    case "/":
      operation = "divide";
      break;

    default:
      return "ERROR!";
  }

  if (operation === "divide" && displayValue === "0") {
      alert("ERROR! Cannot divide by 0");
      clear();
      return;
  }

  const result = operate(operation, savedValue, displayValue);
  operator = "";
  displayValue = "";
  savedValue = Math.round(result * 10000) / 10000;
  recalibrate();
}

function clear() {
  displayValue = "0";
  savedValue = "";
  operator = "";
  recalibrate();
}

function recalibrate() {
  display.textContent = `${savedValue} ${operator} ${displayValue}`;
}

digitButtons.forEach((button) =>
  button.addEventListener("click", changeDisplay)
);
functionButtons.forEach((button) =>
  button.addEventListener("click", activateOperator)
);
equalButton.addEventListener("click", forceOperate);
clearButton.addEventListener("click", clear);
