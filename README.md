# Teste Prático - Programa de Formação Mosten

## Simulador de Votação de Filmes/Séries

Este projeto consiste em um simulador interativo de votação de filmes e séries, um desenvolvimento web full-stack.

### Objetivo

O objetivo principal é desenvolver um sistema que permita aos usuários votarem em uma lista de filmes ou séries, registrando votos positivos e negativos. O sistema também deve possibilitar o cadastro de novos filmes ou séries, armazenar os dados de forma persistente (para o qual utilizei um back-end simplificado) e exibir os totais de votos por item e no geral.

### Funcionalidades

- **Exibição de Filmes/Séries:** Lista de itens pré-definidos e recém-adicionados, contendo título, gênero, descrição, imagem e contadores de votos.
- **Sistema de Votação:** Botões "Gostei" e "Não Gostei" que atualizam os contadores de voto em tempo real por item e os totais globais na página.
- **Cadastro de Novos Itens:** Formulário intuitivo para adicionar novos filmes ou séries, que são imediatamente integrados à lista e disponíveis para votação.
- **Persistência de Dados:** Todos os dados (filmes, séries e votos) são armazenados de forma persistente através de uma API simples, garantindo que as informações não se percam ao recarregar a aplicação.
- **Navegação Suave:** Barra de navegação que permite rolagem suave e direta para as diferentes seções da página.

### Tecnologias Utilizadas

- **Front-end:**
  - HTML5
  - CSS3
  - JavaScript (Vanilla JS)
- **Back-end (API Simples):**
  - Node.js
  - Express.js (para o servidor HTTP e rotas de API)
  - JSON (como armazenamento de dados)

### Como Rodar o Projeto

Para executar este projeto em sua máquina local, siga os passos abaixo:

#### Pré-requisitos

Certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em seu sistema. Você pode baixá-los em [nodejs.org](https://nodejs.org/).

#### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone git@github.com:EduBarros101/simulador_de_votacao.git
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd simulador_de_votacao
    ```
3.  **Instale as dependências do back-end:**
    ```bash
    npm install
    ```

#### Execução

1.  **Inicie o servidor back-end:**
    No terminal, no diretório raiz do projeto, execute:

    ```bash
    npm start
    ```

    O servidor será iniciado na porta 3000.

2.  **Acesse a aplicação:**
    Abra seu navegador e acesse:
    ```
    http://localhost:3000
    ```
    A aplicação front-end será carregada, e você poderá interagir com o simulador de votação.

---
