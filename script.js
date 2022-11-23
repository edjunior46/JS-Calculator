const numBtns = document.querySelectorAll('.numBtn')
const display = document.querySelector('#display')
const delBtn = document.querySelector('#delBtn')
const opBtns = document.querySelectorAll('.opBtn')
const eqBtn = document.querySelector("#equalBtn")
const currentOperation = document.querySelector("#current-operation")
const cccBtn = document.querySelector('#cccBtn')
const clrBtn = document.querySelector('#clrBtn')
let op = []
let displayCount = 0

//adicionando as funçoes de inserir números ao display
numBtns.forEach((numB) => {
    numB.addEventListener("click", function(){
        //condiçao para verificar se há números em operaçao
        if (op[0] && op[1] == undefined && currentOperation.innerText !== ''){
            currentOperation.innerText = ''
            op.splice(0, 1)
            displayCount++
            console.log(displayCount)
            display.innerText += numB.value
            //verificar até onde os digitos vao
        } else if(displayCount < 22){
            displayCount++
            console.log(displayCount)
            display.innerText += numB.value
        } else {
            alert('Limite máximo de caracteres!')
        }
    })
})

//botao delete para excluir digitos no display
delBtn.addEventListener("click", function(){
    let delString = display.innerText.slice(0, -1)
    displayCount--
    console.log(displayCount)
    display.innerText = delString
})

//botao c para excluir toda a operaçao
cccBtn.addEventListener('click', function(){
    displayCount = 0
    console.log(displayCount)
    display.innerText = ''
    currentOperation.innerText = ''
    op.splice(0, 3)
    console.log(op)
})

//botao clear para excluir todo o display
clrBtn.addEventListener('click', function(){
    displayCount = 0
    console.log(displayCount)
    display.innerText = ''
})

//adicionando as funçoes de operaçoes numéricas
opBtns.forEach((opB) => {
    opB.addEventListener("click", function(){
        //completando com 0 se o botao de operaçao for ativado sem um número declarado antes
        if (op[0] == null){
            op[0] = parseFloat(display.innerText) || 0
            op[1] = opB.value
            currentOperation.innerText = op[0] + ' ' + op[1]
            displayCount = 0
            console.log(displayCount)
            display.innerText = ""
            //funcionalidade caso o usuário desejar continuar com a operaçao com os números do current-operation
        } else if(display.innerText == ""){
            op[1] = opB.value
            currentOperation.innerText = op[0] + ' ' + op[1]
            //caso nao se encaixe nos casos acima, realizar operaçoes normalmente
        } else {
            switch(op[1]){
                case '+':
                    op[0] += parseFloat(display.innerText) || 0
                break
                case '-':
                    op[0] -= parseFloat(display.innerText) || 0
                break
                case '*':
                    op[0] *= parseFloat(display.innerText) || 0
                break
                case '/':
                    op[0] /= parseFloat(display.innerText) || 0
                break
            }
            op[1] = opB.value
            currentOperation.innerText = op[0] + ' ' + op[1]
            displayCount = 0
            console.log(displayCount)
            display.innerText = ""
            console.log(op)
        }
    })
})

//botao igual
eqBtn.addEventListener("click", function () {
    switch(op[1]){
        case '+':
            currentOperation.innerText = op[0] + (parseFloat(display.innerText)|| 0)
            op[0] += parseFloat(display.innerText) || 0
            displayCount = 0
            console.log(displayCount)
            display.innerText = ""
            op.splice(1, 1)
            console.log(op)
        break
        case '-':
            currentOperation.innerText = op[0] - (parseFloat(display.innerText)|| 0)
            op[0] -= parseFloat(display.innerText) || 0
            displayCount = 0
            console.log(displayCount)
            display.innerText = ""
            op.splice(1, 1)
            console.log(op)

        break
        case '*':
            currentOperation.innerText = op[0] * (parseFloat(display.innerText)|| 0)
            op[0] *= parseFloat(display.innerText) || 0
            displayCount = 0
            console.log(displayCount)
            display.innerText = ""
            op.splice(1, 1)
            console.log(op)


        break
        case '/':
            currentOperation.innerText = op[0] / (parseFloat(display.innerText)|| 0)
            op[0] /= parseFloat(display.innerText) || 0
            console.log(op)
            displayCount = 0
            console.log(displayCount)
            display.innerText = ""
            op.splice(1, 1)
        break
    }
})