alert("Bem-vindo à aula de JavaScript!")
confirm("Você deseja continuar?")
let nome = prompt("Qual seu nome?")
let sobrenome = prompt("e qual seu sobrenome?")
let idade = parseInt(prompt("Digite sua idade:"));
alert("Seu nome completo é " + nome  + ' ' + sobrenome)
// Obtém o ano atual //
        let anoAtual = new Date().getFullYear();
        
        // Calcula o ano de nascimento
        let anoNascimento = anoAtual - idade;
        
        // Exibe a mensagem com document.write
        document.write(`Você nasceu em ${anoNascimento}`);
console.log(nome.toUpperCase())
console.log(nome.toLowerCase())
console.log(sobrenome.toUpperCase())
console.log(sobrenome.toLowerCase())
console.log(nome.length())
console.log(sobrenome.length())
