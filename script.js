let display = document.querySelector('#display');
let clearBtn = document.querySelector('#clear');
let plusminusBtn= document.querySelector('#plusminus');
let decimalBtn = document.querySelector('#decimal');
let equalBtn = document.querySelector(`#equal`);
let numberButtons = document.querySelectorAll(`.button.number`);
let operationButtons = document.querySelectorAll(`.button.operation`);
let currentOperation = null;
let doneTyping = false; //true means next button stroke starts to display a new number
let decimalUsed = false;
let firstNumber = null; //null by default
let secondNumber = null;
let input = 
    {array : [], 
    clear : function() {this.array = [];},
    numberValue : function() {
        if(this.array.length === 0) return 0; //default value is 0
        else return Number(this.array.join(''))},
    push : function(char) { if(this.array.length < 11)this.array.push(char)} //only pushes if less than 11
    } //^only one character strings at a time

console.log(numberButtons);
console.log(operationButtons);

function add(a, b) {return a + b;} //elementary functions
function subtract(a, b) {return a - b;}
function multiply(a,b ) { return a * b;}
function divide(a, b) { return a / b; }

function clearDisplay() { display.textContent = '';}
function addToDisplay(char) { 
    if(input.array.length < 11) display.textContent += char;}
function setDisplay(toDisplay) {display.textContent = toDisplay;}

//aNumber is a numeric string of a single digit number
//for event listener of numeric buttons
function numberButtonAction(aNumber) {
    if(doneTyping === true) {
        clearDisplay();
        input.push(aNumber)
        addToDisplay(aNumber)
    }
    else {
        input.push(aNumber)
        addToDisplay(aNumber)
    }
}


//adds event listener to each number button
numberButtons.forEach(button => 
    button.addEventListener('click', (e) => numberButtonAction(e.target.textContent)));





/*input.push('-');
input.push('3');
input.push('4');
input.push('6');
input.push('6');
input.push('6');
input.push('.');
input.push('6');
input.push('6');
input.push('6');
console.log(input.numberValue());
addToDisplay(input.numberValue()); */