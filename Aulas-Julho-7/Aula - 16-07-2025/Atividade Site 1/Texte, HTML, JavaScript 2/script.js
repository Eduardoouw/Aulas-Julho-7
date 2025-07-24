let nome = prompt("Digite seu nome:");
let sobrenome = prompt("Digite seu sobrenome:");
let idade = parseInt(prompt("Digite sua idade:"));

let anoAtual = new Date().getFullYear();
let anoNascimento = anoAtual - idade;

document.getElementById("mensagem").textContent = `Olá, ${nome} ${sobrenome}! Você nasceu em ${anoNascimento}`;
// ...existing code...