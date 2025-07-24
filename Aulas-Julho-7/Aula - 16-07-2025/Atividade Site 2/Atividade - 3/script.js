// Solicita dois números ao usuário
let num1 = Number(prompt("Digite o primeiro número:"));
let num2 = Number(prompt("Digite o segundo número:"));

// Realiza as operações
let soma = num1 + num2;
let subtracao = num1 - num2;
let multiplicacao = num1 * num2;
let divisao = num1 / num2;

// Exibe os resultados em um alert
alert(
  "Soma: " + soma +
  "\nSubtração: " + subtracao +
  "\nMultiplicação: " + multiplicacao +
  "\nDivisão: " + divisao
);