const API_URL = "http://localhost:8080/api/enderecos";

// 1. Busca o CEP na API Pública Externa (ViaCEP)
function buscarCepExterno() {
    const cep = document.getElementById("cep").value.replace(/\D/g, "");
    
    if (cep.length !== 8) {
        alert("Por favor, digite um CEP válido com 8 números.");
        return;
    }

    // CORREÇÃO: Sintaxe corrigida de forma segura para evitar erros de leitura da URL
        fetch("https://viacep.com.br" + cep + "/json/")
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado!");
                limparFormulario();
                return;
            }
            // Preenche os inputs da tela com os dados retornados
            document.getElementById("logradouro").value = data.logradouro || "";
            document.getElementById("bairro").value = data.bairro || "";
            document.getElementById("localidade").value = data.localidade || "";
            document.getElementById("uf").value = data.uf || "";
        })
        .catch(error => {
            console.error("Erro ao buscar CEP externo:", error);
            alert("Erro ao consultar o serviço do ViaCEP.");
        });
}

// 2. Envia os dados para a sua API Java (POST)
function salvarNoBanco() {
    const endereco = {
        cep: document.getElementById("cep").value,
        logradouro: document.getElementById("logradouro").value,
        bairro: document.getElementById("bairro").value,
        localidade: document.getElementById("localidade").value,
        uf: document.getElementById("uf").value
    };

    if (!endereco.cep || !endereco.logradouro) {
        alert("Busque um CEP válido antes de salvar!");
        return;
    }

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(endereco)
    })
    .then(response => response.json())
    .then(() => {
        alert("🎉 Endereço salvo com sucesso no MySQL!");
        limparFormulario();
        listarTodos(); // Atualiza a tabela na tela
    })
    .catch(error => {
        console.error("Erro ao salvar:", error);
        alert("Não foi possível salvar. Verifique se o seu Backend Java está rodando no IntelliJ!");
    });
}

// 3. Lista os endereços do seu banco de dados na tabela (GET)
function listarTodos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(enderecos => {
            const tbody = document.querySelector("#tabelaEnderecos tbody");
            tbody.innerHTML = ""; // Limpa a tabela antes de renderizar

            enderecos.forEach(end => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${end.cep}</td>
                    <td>${end.logradouro}</td>
                    <td>${end.localidade}/${end.uf}</td>
                    <td>
                        <button class="btn-delete" onclick="deletarNoBanco(${end.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error("Erro ao listar:", error));
}

// 4. Deleta um endereço por ID (DELETE)
function deletarNoBanco(id) {
    if (!confirm("Tem certeza que deseja excluir este endereço?")) return;

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => {
            alert("Endereço excluído com sucesso!");
            listarTodos(); // Atualiza a lista
        })
        .catch(error => console.error("Erro ao deletar:", error));
}

// Auxiliar: Limpa a tela
function limparFormulario() {
    document.getElementById("cep").value = "";
    document.getElementById("logradouro").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("localidade").value = "";
    document.getElementById("uf").value = "";
}

// Carrega os dados da tabela assim que a página abre
window.onload = listarTodos;
