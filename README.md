# 🔴 Pokédex API

Uma aplicação/API desenvolvida para consultar, listar e exibir informações detalhadas sobre Pokémon, consumindo dados da [PokéAPI](https://pokeapi.co/) (ou fornecendo endpoints próprios).

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Exemplos de Uso / Endpoints](#-exemplos-de-uso--endpoints)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Contribuição](#-contribuição)
- [Licença](#-licença)
- [Autor](#-autor)

---

## 📖 Sobre o Projeto

Este projeto foi criado com o objetivo de praticar o consumo e manipulação de APIs RESTful, tratamento de dados assíncronos e estruturação de código limpo. Através dele, é possível buscar Pokémon por nome ou ID, visualizar seus tipos, estatísticas base, habilidades e sprites.

---

## ✨ Funcionalidades

- [x] Listagem paginada de Pokémon
- [x] Busca de Pokémon por **Nome** ou **Número (ID)**
- [x] Exibição de detalhes completos:
  - Tipos (Fogo, Água, Planta, etc.)
  - Estatísticas base (HP, Ataque, Defesa, Velocidade, etc.)
  - Habilidades e altura/peso
  - Imagens/Sprites oficiais
- [ ] Filtro por tipo ou geração *(opcional/em desenvolvimento)*

---

## 🛠 Tecnologias Utilizadas

> *Ajuste abaixo conforme as ferramentas que você usou no seu código:*

- **Linguagem:** JavaScript / TypeScript / Python *(escolha a sua)*
- **Framework / Biblioteca:** Node.js / Express / React / FastAPI *(ajuste conforme o projeto)*
- **Estilização (se houver front-end):** HTML5, CSS3, TailwindCSS
- **Fonte de Dados:** [PokéAPI v2](https://pokeapi.co/docs/v2)

---

## ⚙️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) *(ou Python, dependendo da sua stack)*

---

## 🚀 Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Bubuu0/Pokedex-API.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd Pokedex-API
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   # ou: pip install -r requirements.txt (caso seja Python)
   ```

4. **Execute a aplicação:**
   ```bash
   npm start
   # ou: npm run dev
   ```

5. Acesse no navegador ou via cliente HTTP (Insomnia/Postman):
   ```
   http://localhost:3000
   ```

---

## 🔌 Exemplos de Uso / Endpoints

*(Caso seja uma API back-end, mantenha esta seção; se for front-end, você pode substituí-la por capturas de tela/screenshots)*

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/pokemon` | Lista os Pokémon disponíveis |
| `GET` | `/pokemon/:nameOrId` | Retorna os dados de um Pokémon específico |

**Exemplo de resposta (`GET /pokemon/pikachu`):**
```json
{
  "id": 25,
  "name": "pikachu",
  "types": ["electric"],
  "height": 4,
  "weight": 60,
  "stats": {
    "hp": 35,
    "attack": 55,
    "defense": 40,
    "speed": 90
  }
}
```

---

## 📂 Estrutura de Pastas

```text
Pokedex-API/
├── src/
│   ├── controllers/   # Lógica das requisições
│   ├── routes/        # Definição das rotas
│   ├── services/      # Integração com a PokéAPI
│   └── index.js       # Arquivo principal
├── .gitignore
├── package.json
└── README.md
```

---

## 🤝 Contribuição

Contribuições são sempre bem-vindas!

1. Faça um **Fork** do projeto
2. Crie uma **Branch** para sua funcionalidade (`git checkout -b feature/NovaFuncionalidade`)
3. Faça o **Commit** das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça o **Push** para a Branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um **Pull Request**

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido por **Bubuu0** — [GitHub](https://github.com/Bubuu0)
