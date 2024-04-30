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
    push : function(char) { if(this.array.length < 10) this.array.push(char)} //only pushes if less than 10
    } //^only one character strings at a time

function add(a, b) {return a + b;} //elementary functions
function subtract(a, b) {return a - b;}
function multiply(a,b ) { return a * b;}
function divide(a, b) { return a / b; }

function clearDisplay() { display.textContent = '';}
function addToDisplay(char) { 
    if(display.textContent.length < 10) display.textContent += char;}

    //toDisplay should be a number
function setDisplay(toDisplay) {
    if (toDisplay <= 9999999999 && toDisplay >= -9999999999) display.textContent = Number(toDisplay.toFixed(5).substring(0,11));
    else {
        clearCalculator(); //reset the calculator
        display.textContent = "ERROR"
   }
}

function setOperation(operationChar) { //sets the current operation based on an op. character
    switch (operationChar) {
        case '+': currentOperation = add; break;
        case '-': currentOperation = subtract; break;
        case '*': currentOperation = multiply; break;
        case '/': currentOperation = divide; break;
    }
}

//aNumber is a numeric string of a single digit number
//for event listener of numeric buttons
function numberButtonAction(aNumber) {
    if(doneTyping === true) {
        clearDisplay();
        input.push(aNumber)
        addToDisplay(aNumber)
        doneTyping = false;
    }
    else {
        input.push(aNumber)
        addToDisplay(aNumber)
    }
}

//adds event listener to each number button
numberButtons.forEach(button =>                         //e.target.textcontent is a number button
button.addEventListener('click', (e) => numberButtonAction(e.target.textContent)));

function operationButtonAction(operationChar) {
    if(firstNumber === null) {
        firstNumber = input.numberValue();
        input.clear();
        doneTyping = true;
        decimalUsed = false;
        setOperation(operationChar);
    }
    else if (secondNumber == null && currentOperation !== null) {
        secondNumber = input.numberValue();
        input.clear(); //
        doneTyping = true;
        decimalUsed = false;
        firstNumber = currentOperation(firstNumber, secondNumber);
        setDisplay(firstNumber); //max 5 decimal points, displays up to 10 digits only
        setOperation(operationChar)
        secondNumber = null;
    }
    else if (secondNumber == null && currentOperation === null) {

        setOperation(operationChar);
    }
}

//adds event listener to each operation button
operationButtons.forEach(button =>                         //e.target.id is a operation button
button.addEventListener('click', (e) => operationButtonAction(e.target.id)));

function equalBtnAction() {
    if(firstNumber === null) {
        return;
    }
    else if(secondNumber === null && setOperation !== null) {
        if(input.array.length === 0) secondNumber = firstNumber; //user didnt type something else
        else secondNumber = input.numberValue();
        input.clear();
        doneTyping = true;
        decimalUsed = false;
        firstNumber = currentOperation(firstNumber, secondNumber);
        setDisplay(firstNumber);
        input.array = [...(firstNumber.toString())]; //put the firstNumber into array
        firstNumber = null;
        secondNumber = null;
        
    }
    else if (secondNumber === null && setOperation === null) {
        return firstNumber;
    }
}

equalBtn.addEventListener('click', equalBtnAction); //add the function to listener

plusminusBtn.addEventListener('click', (e) => {
    if(input.array.length === 0 || (input.array.length === 1 && decimalUsed === true)) return;
    else if (input.array[0] === '-') {
        input.array.shift(); //remove the minus sign from array
        display.textContent = display.textContent.slice(1); //cut off - from display
    } 
    else {
        input.array.unshift('-'); //otherwise add the minus sign
        display.textContent = '-' +  display.textContent;
    }
});



decimalBtn.addEventListener('click', () => {
        if(decimalUsed === false) {
        decimalUsed =true;
        input.push('.');
        addToDisplay('.');
        }   
})

function clearCalculator() { //resets the calculator to initial conditions
    clearDisplay();
    input.clear();
    decimalUsed = false;
    doneTyping = false;
    firstNumber = null;
    secondNumber = null;
    currentOperation = null;
}

clearBtn.addEventListener('click', clearCalculator);

