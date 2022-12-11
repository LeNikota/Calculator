const digits = document.querySelectorAll('.digit');
const operator = document.querySelectorAll('.operator');
const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');
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
    if(previousOperand !== null){
        currentOperand.textContent = +currentOperand.textContent + +previousOperand.textContent;
    }
    previousOperand.textContent = currentOperand.textContent;
    displayOperator.textContent = '+';
};

const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function updateDisplay(digit) {
    if (clearable) {
        currentOperand.textContent = digit;
        clearable = false;
    }
    else {
        currentOperand.textContent += digit;
    }
}

function clearAllDisplay() {
    currentOperand.textContent = '0';
    previousOperand.textContent = '';
    displayOperator.textContent = '';
    clearable = true;
}

function deleteTheLastDigit() {
    if (currentOperand.textContent.length === 1 || currentOperand.textContent === '0.') {
        currentOperand.textContent = '0';
        clearable = true;
    }
    else {
        currentOperand.textContent = currentOperand.textContent.slice(0, -1);
    }
}

function addDot(){
    if(currentOperand.textContent.includes('.')){
        return;
    }
    currentOperand.textContent += '.';
    clearable = false;
}