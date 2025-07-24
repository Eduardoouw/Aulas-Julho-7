function calcularOrcamento() {
            const quantidade = parseFloat(document.getElementById('quantidade').value);
            const preco = parseFloat(document.getElementById('preco').value);
            const resultadoDiv = document.getElementById('resultado');

            if (isNaN(quantidade) || isNaN(preco) || quantidade < 0 || preco < 0) {
                resultadoDiv.innerHTML = 'Por favor, insira valores válidos.';
                return;
            }

            const total = quantidade * preco;
            resultadoDiv.innerHTML = `Orçamento Total: R$ ${total.toFixed(2).replace('.', ',')}`;
        }