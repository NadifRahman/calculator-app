let display = document.querySelector('#display');
let clearBtn = document.querySelector('#clear');
let plusminusBtn= document.querySelector('#plusminus');
let decimalBtn = document.querySelector('#decimal');
let equalBtn = document.querySelector(`#equal`);
let numberButtons = document.querySelectorAll(`.button.number`);
let operationButtons = document.querySelectorAll(`.button.operation`);
console.log(numberButtons);
console.log(operationButtons);

function add(a, b) {return a + b;} //elementary functions
function subtract(a, b) {return a - b;}
function multiply(a,b ) { return a * b;}
function divide(a, b) { return a / b; }

function clearDisplay() { display.textContent = '';}