Projeto_Final_JAVA-Front-End

Gerenciador de Endereços - Frontend

Descrição do Projeto

Esta é a interface web do Projeto Final do curso de Desenvolvedor Back-End do SENAI. A aplicação foi desenvolvida utilizando HTML5, CSS3 e JavaScript nativo com o objetivo de consumir dados de uma API pública, permitir a manipulação dessas informações pelo usuário e integrá-las a uma API Spring Boot própria.

Objetivo da Interface

A interface permite que o usuário informe um CEP para buscar automaticamente os dados de endereço. Após a busca, o usuário pode salvar esse endereço em um banco de dados relacional, além de listar, atualizar e deletar os registros diretamente pela tela, completando todas as operações de um CRUD.

API Pública Consumida

Nome: ViaCEP
URL de Integração: `https://viacep.com.br{cep}/json/`
Função: Buscar dados de endereço (Logradouro, Bairro, Localidade, UF) a partir do CEP informado.

Como Executar o Projeto Localmente

1. Certifique-se de que o repositório do Backend está rodando na porta `8080`.
2. Faça o clone deste repositório:
```bash
git clone https://github.com
```
3. Navegue até a pasta do projeto.
4. Abra o arquivo `index.html` diretamente em qualquer navegador web.
