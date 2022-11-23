# JS-Calculator
Calculadora desenvolvida com Javascript, HTML e CSS

## Pré-requisitos
Navegador web

## Metodos utilizados
* HTML básico (<div>, <button>);
* CSS básico (Grid Layout, Flex Layout);
* Javascript (NodeList, Arrays, Functions, Arrow Functions, Loops ForEach, Condicionais If, Eventos DOM);

## Etapas do Desenvolvimento
Saudações! Este é o meu primeiro projeto que publico aqui na plataforma. É um projeto pessoal, para fins de estudo, então qualquer sugestão é bem vinda.
<br><br>
O objetivo era replicar uma calculadora de bolso simples, tendo um visor, botões númericos, botões para as operações básicas e botões para a edição da operação no visor.<br>
Primeiramente, criei toda a estrutura HTML, colocando na parte superior a operação atual, o visor da calculadora, e então o teclado para as operações.<br>
~~~html
<div id="main">
        <div id="content">
            <h1>Calculator</h1>
            <div id="current-operation"></div>
            <div id="display"></div>
            <div id="buttons">
                <button class='modBtn' id="clrBtn">CE</button>
                <button class='modBtn' id="cccBtn">C</button>
                <button class='modBtn' id="delBtn">DEL</button>
                <button class="opBtn" value="+">+</button>
                <button class="numBtn" value="1">1</button>
                <button class="numBtn" value="2">2</button>
                <button class="numBtn" value="3">3</button>
                <button class="opBtn" value="-">-</button>
                <button class="numBtn" value="4">4</button>
                <button class="numBtn" value="5">5</button>
                <button class="numBtn" value="6">6</button>
                <button class="opBtn" value="*">*</button>
                <button class="numBtn" value="7">7</button>
                <button class="numBtn" value="8">8</button>
                <button class="numBtn" value="9">9</button>
                <button class="opBtn" value="/">/</button>
                <button class="numBtn" value="0">0</button>
                <button class="numBtn" value=".">.</button>
                <button id="equalBtn">=</button>
            </div>
        </div>
    </div>
~~~
E logo de cara também já dei aquela estilizada marota para termos uma tela mais agradável.<br>
~~~css
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    background-color: #2e2e2e;
    user-select: none;
}

#main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

#content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #666666;
    color: white;
    border-radius: 10px;
    height: 80vh;
    width: 40vw;
    padding: 20px;
}

#content h1 {
    text-align: center;
}

#current-operation {
    display: flex;
    align-self: flex-end;
    font-weight: bolder;
    font-size: 30px;
    margin: 20px 0;
    min-height: 45px;
    overflow-wrap: break-word;
}

#display {
    width: 100%;
    min-height: 90px;
    font-size: 30px;
    text-align: end;
    border: none;
    margin-bottom: 20px;
    padding-right: 8px;
    padding-top: 20px;
    border-radius: 10px;
    background-color: white;
    color: black;
    word-wrap: break-word;
}

#buttons{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 5px;
    width: 100%;
    height: 100%;
    text-align: center;
    overflow: hidden;
}

#buttons button {
    border: none;
    cursor: pointer;
    font-size: larger;
    border-radius: 5px;
    transition: all 0.2s;
}

#equalBtn {
    grid-column: span 2;
    background-color: rgb(172, 255, 49);
}

#buttons button:hover{
    box-shadow: inset 4px 0 rgb(56, 56, 56), inset 0px 4px rgb(56, 56, 56),
    inset -4px 0 rgb(56, 56, 56), inset 0 -4px rgb(56, 56, 56);
}

.modBtn {
    background-color: rgb(255, 49, 49);
}

.opBtn{
    background-color: rgb(49, 214, 255);
}
~~~

Agora começa a parte complicada.<br>
No Javascript, primeiro eu referenciei todos os elementos que necessitariam de uma funcionalidade
~~~javascript
const numBtns = document.querySelectorAll('.numBtn') //para os botões numéricos
const display = document.querySelector('#display') //para o visor
const delBtn = document.querySelector('#delBtn') //botão DEL para apagar dígitos do visor
const opBtns = document.querySelectorAll('.opBtn') //botões das operações
const eqBtn = document.querySelector("#equalBtn") //botão Resultado
const currentOperation = document.querySelector("#current-operation") //para a div que irá exibir a operação atual
const cccBtn = document.querySelector('#cccBtn') //botão que limpa a operação atual
const clrBtn = document.querySelector('#clrBtn') //botão que limpa o visor
~~~

Para que as operações fossem realizadas, os valores precisariam ser armazenados, então optei por utilizar um array para armazenar esses valores.
~~~javascript
let op = []
~~~

Optei também por definir um limite máximo de caracteres no visor. Para cada dígito no visor, é adicionado +1 nessa variável, e para cada dígito excluído, seria subtraído -1 
até um valor mínimo de 0.
~~~javascript
let displayCount = 0
~~~

Para que os valores numéricos aparececem no visor, desenvolvi a seguinte solução.
~~~javascript
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
~~~

Para retirar 1 dígito do visor (botão DEL).
~~~javascript
delBtn.addEventListener("click", function(){
    let delString = display.innerText.slice(0, -1)
    if (displayCount > 0){
        displayCount--
    }
    console.log(displayCount)
    display.innerText = delString
})
~~~
Para retirar todos os dígitos do visor (botão CE)
~~~javascript
clrBtn.addEventListener('click', function(){
    displayCount = 0
    console.log(displayCount)
    display.innerText = ''
})
~~~

Para excluir toda a operação atual (botão C)
~~~javascript
cccBtn.addEventListener('click', function(){
    displayCount = 0
    console.log(displayCount)
    display.innerText = ''
    currentOperation.innerText = ''
    op.splice(0, 3)
    console.log(op)
})
~~~

Para que as operações fossem realizadas, minha ideia foi utilizar até no máximo 2 posições do array
~~~javascript
op[1, +]
//a primeira posição armazenará o primeiro valor numérico, valor este digitado no visor (este valor será armazenado somente quando o usuário clicar em um botão
de operação)
//a segunda posição armazenará a operação a ser realizada
~~~

No caso acima, caso o usuário pressione um valor numérico, a operação seria realizada se o botão '=' fosse ativado ou se outra operação fosse ativada. Em ambos os 
casos, a operação seria realizada utilizando o primeiro valor do array e o valor do display, passando por um 'switch' para verificar qual seria a operação realizada.<br>
Então eu adicionei a seguinte função à todos os botões operacionais.
~~~javascript
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
~~~
E por fim, só falta o botão '='
~~~javascript
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
~~~

