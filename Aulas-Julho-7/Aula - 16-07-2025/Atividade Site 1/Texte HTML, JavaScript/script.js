let nome = prompt("Digite seu nome:");
let idade = parseInt(prompt("Digite sua idade:"));

let anoAtual = new Date().getFullYear();
let anoNascimento = anoAtual - idade;

// Exibe a mensagem em um elemento da página
document.getElementById("mensagem").textContent = `Olá, ${nome}! Você nasceu em ${anoNascimento}`;