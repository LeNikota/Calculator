const digits = document.querySelectorAll('.digit');
const operator = document.querySelectorAll('.operator');


digits.forEach(e => {
    e.addEventListener('click', e => updateDisplay(e.target.textContent));
})
operator.forEach(e => {
    e.addEventListener('click', e => operate(e.target.textContent));
});


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let currentOperand = 0;
let previousOperand = null;


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

            break;
        case 'AC':

            break;
    }
}

function updateDisplay(digit){

}