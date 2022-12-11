const digits = document.querySelectorAll('.digit');
const operator = document.querySelectorAll('.operator');
const currentOperandDisplay = document.querySelector('.current-operand');
const previousOperandDisplay = document.querySelector('.previous-operand');
const displayOperator = document.querySelector('.display-operator');


digits.forEach(e => {
    e.addEventListener('click', e => updateDisplay(e.target.textContent));
})
operator.forEach(e => {
    e.addEventListener('click', e => operate(e.target.textContent));
});

let clearable = true; // Makes the value removable if the user pushes any digit
//let clearable = true;


function operate(operator) {
    switch (operator) {
        case '+':
            add();
            break;
        case '-':
            subtract();
            break;
        case 'x':
            multiply();
            break;
        case '÷':
            divide();
            break;
        case '=':

            break;
        case '.':
            addDot(); // decimalify :)
            break;
        case 'C':
            deleteTheLastDigit();
            break;
        case 'AC':
            clearAllDisplay();
            break;
    }
}

const add = () => {
    if(previousOperandDisplay !== null){
        currentOperandDisplay.textContent = +currentOperandDisplay.textContent + +previousOperandDisplay.textContent;
    }
    previousOperandDisplay.textContent = currentOperandDisplay.textContent;
    displayOperator.textContent = '+';
};

const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function updateDisplay(digit) {
    if (clearable) {
        currentOperandDisplay.textContent = digit;
        clearable = false;
    }
    else {
        currentOperandDisplay.textContent += digit;
    }
}

function clearAllDisplay() {
    currentOperandDisplay.textContent = '0';
    previousOperandDisplay.textContent = '';
    displayOperator.textContent = '';
    clearable = true;
}

function deleteTheLastDigit() {
    if (currentOperandDisplay.textContent.length === 1 || currentOperandDisplay.textContent === '0.') {
        currentOperandDisplay.textContent = '0';
        clearable = true;
    }
    else {
        currentOperandDisplay.textContent = currentOperandDisplay.textContent.slice(0, -1);
    }
}

function addDot(){
    if(currentOperandDisplay.textContent.includes('.')){
        return;
    }
    currentOperandDisplay.textContent += '.';
    clearable = false;
}