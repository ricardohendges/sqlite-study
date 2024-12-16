# Golden Raspberry Awards

Este é um projeto básico criado em Node.js para servir como ponto de partida para aplicações simples ou estudos.

## Funcionalidades

* Trabalhar com uma base em memória, utilizado SQLite
* Ao iniciar o app, deve ser automaticamente alimentada a base em memória com um CSV.
* Crud simples de filmes
* Consulta dos produtores com maior e menor tempo entre premiações.

## Tecnologias Utilizadas

* Node.js - Ambiente de execução JavaScript
* Express - Framework minimalista para aplicações web
* Sqlite3 - Como sendo o banco de dados em memória
* Swagger - Para documentar a API
* Jest    - Responsável pelo teste de integração do app

## Requisitos

> Certifique-se de ter as seguintes ferramentas instaladas:

* Node.js (v18 ou superior)
* NPM

## Instalação

> Clone o repositório:

```git clone https://github.com/ricardohendges/sqlite-study```

> Acesse o diretório do projeto:

```cd nome-do-repositorio```

> Instale as dependências:

```npm install```

# Uso

## Ambiente de Desenvolvimento

> 1. Crie um arquivo .env na raiz do projeto baseado no exemplo .env.example:
```
  HOST_PORT=9000                                         # Porta do APP 
  NODE_ENV=dev                                           # Para controle em ambientes diferentes (desenvolvimento, teste, homologação, produção)
  PATH_FILE_CSV='./src/db/db-csv-file/Movielist.csv'     # Caminho do CSV inicial do app
  DELIMITER=';'                                          # Delimitador do CSV, default ';'
  TRY_DOC='true'                                         # Habilitar testes no swagger
```

> 2. Inicie o servidor de desenvolvimento:
```
npm run dev
```

> 3. Acesse a documentação do APP em:
```
http://localhost:9000/docs/
```

> 4. Consulta rápida do desafio proposto: _Obter o produtor com maior intervalo entre dois prêmios consecutivos, e o que
obteve dois prêmios mais rápido_
```
http://localhost:9000/award

```

# Estrutura do Projeto

```
sqlite-study/
├── src/
│   ├── controllers/       # Arquivos que controlam requisições e responses do app
│   ├── db/                # Arquivos para criação da database
│   │   └── sqlite.js      # Arquivo de inicialização da base de dados em memoria do sqlite
│   ├── docs/              # Local onde a documentação do swagger é armazenada após auto-gen
│   ├── routes/            # Arquivos que determinam endpoints existentes e documentação do swagger
│   │   └── index.js       # Roteamento principal
│   ├── services/          # Arquivos responsáveis por executar a comunicação do APP com a base de dados
│   ├── utils/             # Arquivos utilitários genericos para o funcionamento do APP
│   │   └── csv-reader.js  # Arquivo com leitura de CSV e tratamento para o case de filmes
│   │   └── swagger.js     # Arquivo de configuração da documentação do swagger
│   ├── views/             # Arquivos necessários para a visualização do swagger ui
│   └── index.js           # Inicialização do servidor
├── .env.example           # Exemplo de arquivo de variáveis de ambiente
├── jest.config.js         # Configurações do jest para testes
├── package.json           # Configurações do projeto e dependências
└── README.md              # Documentação do projeto
```

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais detalhes.

# Tempo gasto...

Sexta: 12/12/2024 = TOTAL: 1:50

* 21:10 - 22:20  Compreensão da estrutura e biblioteca para uso de SQLite em nodejs.
* 22:20 - 23:00  Compreensão da estrutura e biblioteca para leitura de CSV já a vinculando a funcionalidade do SQLite.

Sábado: 13/12/2024 = TOTAL: 1:40

* 22:00 - 23:40  Definição das camadas: Routes, controllers e services, criação do "CRUD" da aplicação.

Domingo: 14/12/2024 = TOTAL: 2:00

* 17:40 - 18:10  Criação de teste da importação de CSV
* 19:00 - 20:00  Criação da rota de consulta de premios conforme solicitado. (min, max e afins).
* 20:40 - 21:10  Criação da documentação do README