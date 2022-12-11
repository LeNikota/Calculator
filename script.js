const digits = document.querySelectorAll('.digit');
const operator = document.querySelectorAll('.operator');
const currentOperandDisplay = document.querySelector('.current-operand');
const previousOperandDisplay = document.querySelector('.previous-operand');


digits.forEach(e => {
    e.addEventListener('click', e => updateDisplay(e.target.textContent));
})
operator.forEach(e => {
    e.addEventListener('click', e => operate(e.target.textContent));
});

let currentOperand = 0;
let previousOperand = null;
let clearable = true; // Makes the value removable if the user pushes any digit


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
            break;

        case 'C':
            deleteTheLastDigit();
            break;
        case 'AC':
            clearAllDisplay();
            break;
    }
}

const add = (a, b) => a + b;
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
    currentOperand = 0;
    previousOperand = null;
    currentOperandDisplay.textContent = '0';
    previousOperandDisplay.textContent = '';
    clearable = true;
}

function deleteTheLastDigit() {
    if (currentOperandDisplay.textContent.length === 1) {
        currentOperandDisplay.textContent = '0';
        clearable = true;
    }
    else {
        currentOperandDisplay.textContent = currentOperandDisplay.textContent.slice(0, -1);
    }
}