const digits = document.querySelectorAll('.digit');
const operator = document.querySelectorAll('.operator');
const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');
const displayOperator = document.querySelector('.display-operator');


digits.forEach(e => {
    e.addEventListener('click', e => appendDigit(e.target.textContent));
})
operator.forEach(e => {
    e.addEventListener('click', e => operate(e.target.textContent));
});
document.addEventListener('keydown', e => {
    let pressedKey = e.key;
    if(pressedKey.match(/\d/)){
        applyEffect(pressedKey);
        appendDigit(pressedKey);
    }
    if(pressedKey.match(/[-+/x*=.]|Backspace|Enter/)){
        applyEffect(operatorTable[pressedKey]);
        operate(operatorTable[pressedKey]);
    }
});

let clearable = true; // Makes the value removable if the user pushes any digit
const operatorTable = {
    '+': '+',
    '-': '-',
    '*': 'x',
    'x': 'x',
    '/': '÷',
    '=': '=',
    '.': '.',
    'Enter': '=',
    'Backspace': 'C'
}

function operate(operator, checkOperatorChange = true) {
    if(checkOperatorChange){
        changeOperator(operator)
        return;
    };
    if(currentOperand.textContent.includes('ERROR')){
        clearDisplay();
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
            clearDisplay();
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
            clearDisplay(true);
            return;
        }
        previousOperand.textContent = previousOperand.textContent / currentOperand.textContent;
    }else {
        previousOperand.textContent = currentOperand.textContent;
        displayOperator.textContent = '÷';
    }
    currentOperand.textContent = 0;
}

function appendDigit(digit) {
    if(currentOperand.textContent.length > 15){
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

function clearDisplay(error) {
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
        clearDisplay(true);
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
        if(currentOperand.textContent.includes('ERROR')){
            return;
        }
        displayOperator.textContent = operator;
    }else{
        operate(operator, false);
    }
}

function applyEffect(pressedBtn){ 
    const btn = [...digits, ...operator].find(e => e.textContent === pressedBtn);
    if(btn.classList.contains('btn-clicked')){
        btn.classList.remove('btn-clicked');
        return;
    }
    btn.classList.add('btn-clicked');
    btn.addEventListener('transitionend', e => e.target.classList.remove('btn-clicked'));
}