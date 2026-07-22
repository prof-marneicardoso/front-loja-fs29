const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", (evento) => {
    // Impede o comportamento padrão do formulário (que recarrega a página)
    evento.preventDefault();

    cadastrarProduto();
});

async function cadastrarProduto() {
    // Monta o objeto do produto com os dados do formulário
    const novoProduto = {
        // nome: document.getElementById("nome").value,
        nome: form.nome.value,

        // descricao: document.getElementById("descricao").value,
        descricao: form.descricao.value,

        // A API espera "fotos" como um array, então colocamos a URL dentro de []
        // fotos: [document.getElementById("fotos").value],
        fotos: [form.fotos.value],

        // O input retorna texto; convertemos para número com Number()
        // preco: Number(document.getElementById("preco").value),
        preco: Number(form.preco.value),

        // categoria: document.getElementById("categoria").value
        categoria: form.categoria.value
    };

    try {
        const resposta = await fetch(`${API_URL}/produtos/registro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoProduto)
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            mensagem.className = "mensagem sucesso";
            mensagem.textContent = "Produto cadastrado com sucesso!";
            form.reset();  // Limpa o formulário
        
        } else {
            // Mostra o erro que a API retornou
            mensagem.className = "mensagem erro";
            mensagem.textContent = dados.erro || "Erro ao cadastrar produto.";
        }

    } catch (erro) {
        console.error(erro);
        mensagem.className = "mensagem erro";
        mensagem.textContent = "Erro de conexão com a API.";
    }
}
