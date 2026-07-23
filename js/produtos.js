// Assim que a página carregar, busca os produtos
carregarProdutos();

async function carregarProdutos() {
    const container = document.getElementById("listaProdutos");

    try {
        // Faz a requisição GET para a API
        const resposta = await fetch(`${API_URL}/produtos`);
        const resultado = await resposta.json();
        const produtos = resultado.dados;

        // Se não houver produtos
        if (produtos.length === 0) {
            container.innerHTML = "<p>Nenhum produto cadastrado ainda.</p>";
            return;
        }

        // Monta um card para cada produto
        container.innerHTML = produtos.map(produto => `
            <div class="card">
                <img src="${produto.fotos[0]}" alt="${produto.nome}">
                <div class="card-conteudo">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <span class="preco">R$ ${produto.preco}</span>
                    <a href="detalhes.html?id=${produto.id}" class="btn btn-verde">
                        Ver Detalhes
                    </a>
                </div>
            </div>
        `).join("");

    } catch (erro) {
        console.error(erro);
        container.innerHTML = "<p>Erro ao carregar os produtos.</p>";
    }
}
