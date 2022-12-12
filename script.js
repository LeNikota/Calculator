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


function operate(operator, checkOperatorChange = true) {
    if(checkOperatorChange){
        changeOperator(operator)
        return;
    };
    if(currentOperand.textContent.match(/\D+/)){
        clearAllDisplay();
        return;
    }
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
            equal();
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
    if(previousOperand.textContent !== ''){
        previousOperand.textContent = +currentOperand.textContent + +previousOperand.textContent;
    }else {
        previousOperand.textContent = currentOperand.textContent;
        displayOperator.textContent = '+';
    }
    currentOperand.textContent = 0;
}

const subtract = () => {
    if(previousOperand.textContent !== ''){
        previousOperand.textContent = previousOperand.textContent - currentOperand.textContent;
    }else {
        previousOperand.textContent = currentOperand.textContent;
        displayOperator.textContent = '-';
    }
    currentOperand.textContent = 0;
}

const multiply = () => {
    if(previousOperand.textContent !== ''){
        previousOperand.textContent = previousOperand.textContent * currentOperand.textContent;
    }else {
        previousOperand.textContent = currentOperand.textContent;
        displayOperator.textContent = 'x';
    }
    currentOperand.textContent = 0;
}

const divide = () => {
    if(previousOperand.textContent !== ''){
        if(currentOperand.textContent === '0'){
            clearAllDisplay(true);
            return;
        }
        previousOperand.textContent = previousOperand.textContent / currentOperand.textContent;
    }else {
        previousOperand.textContent = currentOperand.textContent;
        displayOperator.textContent = '÷';
    }
    currentOperand.textContent = 0;
}

function updateDisplay(digit) {
    if(currentOperand.textContent.length > 16){
        return;
    }
    if (clearable || currentOperand.textContent[0] === '0' && currentOperand.textContent.length === 1) {
        currentOperand.textContent = digit;
        clearable = false;
    }
    else {
        currentOperand.textContent += digit;
    }
}

function clearAllDisplay(error) {
    currentOperand.textContent = '0';
    previousOperand.textContent = '';
    displayOperator.textContent = '';
    if(error){
        currentOperand.textContent = 'ERROR';
        clearable = true;
    }
}

function deleteTheLastDigit() {
    if (currentOperand.textContent.length === 1 || currentOperand.textContent === '0.') {
        currentOperand.textContent = '0';
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

function equal(){
    if(previousOperand.textContent === ''){
        return;
    }
    if(displayOperator.textContent === '÷' && currentOperand.textContent === '0'){
        clearAllDisplay(true);
        return;
    }
    operate(displayOperator.textContent);
    currentOperand.textContent = previousOperand.textContent;
    previousOperand.textContent = '';
    displayOperator.textContent = '';
}

function changeOperator(operator){
    if(operator !== displayOperator.textContent && operator.match(/[-+x÷]/) && displayOperator.textContent !== ''){
        operate(displayOperator.textContent, false);
        if(currentOperand.textContent.match(/\D+/)){
            return;
        }
        displayOperator.textContent = operator;
    }else{
        operate(operator, false);
    }
}