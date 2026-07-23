// Hoisting (chama a function mesmo antes de sua criação)
carregarTabela();

async function carregarTabela() {
    const corpo = document.getElementById("corpoTabela");

    try {
        // const resposta = await fetch(`${API_URL}/produtos`);
        const resposta = await fetch(`${API_URL}`);
        const resultado = await resposta.json();
        const produtos = resultado.dados;

        if (produtos.length === 0) {
            corpo.innerHTML = `<tr><td colspan="4">Nenhum produto cadastrado.</td></tr>`;
            return;
        }

        corpo.innerHTML = produtos.map(produto => `
            <tr>
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco}</td>
                <td>
                    <div class="acoes">
                        <a href="editar.html?id=${produto.id}" class="btn-icone btn-editar" title="Editar">✏️</a>
                        <button class="btn-icone btn-excluir" title="Excluir"
                                onclick="excluirProduto(${produto.id}, '${produto.nome}')">🗑️</button>
                    </div>
                </td>
            </tr>
        `).join("");

    } catch (erro) {
        console.error(erro);
        corpo.innerHTML = `<tr><td colspan="4">Erro ao carregar os produtos.</td></tr>`;
    }
}

// 3c. Excluir com confirmação
async function excluirProduto(id, nome) {
    // Mostra a mensagem de confirmação
    const confirmar = confirm(`Tem certeza que deseja excluir "${nome}"?`);

    if (!confirmar) return;  // Se cancelar, não faz nada

    try {
        const resposta = await fetch(`${API_URL}/produtos/${id}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            alert("Produto excluído com sucesso!");
            carregarTabela();  // Recarrega a tabela para refletir a exclusão
        } else {
            alert("Erro ao excluir o produto.");
        }

    } catch (erro) {
        console.error(erro);
        alert("Erro de conexão ao excluir.");
    }
}
