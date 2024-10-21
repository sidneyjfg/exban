# Fullstack Exban

Este é um projeto Fullstack chamado **Fullstack Exban**, que inclui um backend em Node.js utilizando TypeScript e um frontend em React. O sistema é projetado para gerenciar clientes, propriedades e negócios.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Executando o Projeto](#executando-o-projeto)
- [Documentação das Rotas](#documentação-das-rotas)
- [Testes](#testes)

## Pré-requisitos

Antes de iniciar, verifique se você tem as seguintes ferramentas instaladas:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

## Configuração do Ambiente

1. Clone o repositório:

   ```bash
   git clone https://github.com/SeuUsuario/fullstackexban.git
   cd fullstackexban

``` bash
fullstackexban/
│
├── services/
│   ├── ClientService.ts
│   ├── DealService.ts
│   └── PropertyService.ts
│
├── shared/
│   └── infra/
│       ├── database/
│       │   ├── data-source.ts
│       │   └── validator/
│
├── tests/
│
├── utils/
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .gitignore
├── Dockerfile
├── exban.yml
├── ormconfig.json
├── package.json
├── package-lock.json
├── tsconfig.build.json
├── tsconfig.json
├── README.md
│
├── models/
│   ├── Client.ts
│   ├── Deal.ts
│   └── Property.ts
│
├── repositories/
│   ├── ClientRepository.ts
│   ├── DealRepository.ts
│   ├── IClientRepository.ts
│   ├── IDealRepository.ts
│   ├── IPropertyRepository.ts
│   └── PropertyRepository.ts
│
├── controllers/
│   ├── ClientController.ts
│   ├── DealController.ts
│   └── PropertyController.ts
│
├── dtos/
│   └── ICreateClient.ts
│
├── routes/
│   ├── ClientRoutes.ts
│   ├── PropertyRoutes.ts
│   └── index.ts
│
frontend/
│
├── public/
│   ├── favicon.ico
│   └── index.html
│
├── src/
│   └── component/
│       ├── style/
│       │   ├── ClientForm.css
│       │   ├── ClientList.css
│       │   ├── Clients.css
│       │   ├── ConfirmModal.css
│       │   ├── NavBar.css
│       │   ├── Properties.css
│       │   ├── Property.css
│       │   ├── PropertyCard.css
│       │   └── PropertyList.css
│       ├── ClientForm.jsx
│       ├── ClientList.jsx
│       ├── ConfirmModal.jsx
│       ├── NavBar.jsx
│       ├── Properties.jsx
│       ├── PropertyCard.jsx
│       ├── PropertyForm.jsx
│       └── PropertyList.jsx
│
├── pages/
│   └── index.js
│
├── services/
│   ├── clientService.js
│   └── propertyService.js
│
├── App.css
├── App.js
├── index.css
└── index.js
```

## Como Executar o Projeto Localmente

### Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **PostgreSQL** (versão 12 ou superior)

### Passos

1. **Clonar o Repositório**
   ```bash
   git clone https://github.com/seu-usuario/fullstack-exban.git
   ```

2. **Instalar Dependências**
   Acesse o diretório do projeto e instale as dependências utilizando o npm:
   ```bash
   cd exban
   npm install
   ```

3. **Configurar Banco de Dados**
   Ajuste as variáveis de ambiente no arquivo `.env` ou diretamente no docker:
   ```bash
   DB_HOST=postgres
   DB_PORT=5432
   DB_USERNAME=seu-usuario || postgres
   DB_PASSWORD=sua-senha
   DB_NAME=imoveis_financiamentos_db
   ```

5. **Iniciar o Servidor**
   Inicie o servidor:
   ```bash
   docker-compose -f exban.yml up --build
   ```

Caso queira testar pelo frontend em uma outra aba/terminal execute
```bash
cd frontend/
npm start
```

- Clientes

POST /clients: Cria um novo cliente.
GET /clients: Retorna todos os clientes.
GET /clients/:id Retorna um cliente específico pelo ID.
PUT /clients/:id Atualiza um cliente específico pelo ID.
DELETE /clients/:id Remove um cliente específico pelo ID.

- Propriedades

POST /properties: Cria uma nova propriedade.

GET /properties: Retorna todas as propriedades.

GET /properties/:id Retorna uma propriedade específica pelo ID.

PUT /properties/:id Atualiza uma propriedade específica pelo ID.

DELETE /properties/:id Remove uma propriedade específica pelo ID.


- Negócios

POST /deals: Cria um novo negócio.

GET /deals: Retorna todos os negócios.

GET /deals/:id Retorna um negócio específico pelo ID.

PUT /deals/:id Atualiza um negócio específico pelo ID.

DELETE /deals/:id Remove um negócio específico pelo ID.


## Funcionalidades

- **Clientes:**
  - Criação, listagem, atualização e remoção de clientes.
  - Validação de CPF e verificação de duplicidade de clientes.
  
- **Imóveis:**
  - Criação, listagem, atualização e remoção de imóveis.
  - Associação de imóveis a clientes.

- **Financiamentos:**
  - Criação de financiamentos habitacionais para clientes.
