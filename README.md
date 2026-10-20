# API de Gerenciamento de Professores

API REST feita com **Node.js** e **Express** para gerenciar professores de uma escola, suas turmas e disciplinas.
Os dados ficam **em memória** (array de objetos JavaScript), sem banco de dados. As alterações valem enquanto o servidor estiver rodando.

## Estrutura do projeto

```
api-professores/
├── index.js                          # Liga o servidor e registra as rotas
├── routes/
│   └── professoresRoutes.js          # Define URL + método HTTP de cada endpoint
├── controllers/
│   └── professoresController.js      # Lógica de cada endpoint
├── data/
│   └── professores.js                # Dados em memória (array de professores)
├── prints/                           # Prints dos testes no Postman / Thunder Client
├── api-professores.postman_collection.json
└── package.json
```

## Como executar

Pré-requisito: Node.js instalado.

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor
npm start
```

O servidor sobe em `http://localhost:3000`.

## Endpoints

| Método | Endpoint | O que faz |
|---|---|---|
| GET | `/professores` | Lista todos os professores |
| GET | `/professores/:id` | Busca um professor pelo id |
| GET | `/professores/:id/turmas` | Lista as turmas de um professor |
| PUT | `/professores/:id` | Atualiza os dados de um professor |
| POST | `/professores/:id/turmas` | Adiciona uma turma a um professor |
| GET | `/professores/departamento/:departamento` | Lista professores de um departamento |
| DELETE | `/professores/:id` | Remove um professor |

Quando o id não existe, a API responde com status `404` e:

```json
{ "mensagem": "Id não existente" }
```

### Exemplos de corpo (JSON)

**PUT** `/professores/1`
```json
{
  "nome": "Nome Atualizado",
  "idade": 26,
  "departamento": "Exatas"
}
```

**POST** `/professores/1/turmas`
```json
{
  "codigo": "WEB-301",
  "disciplina": "Desenvolvimento de APIs",
  "alunos": ["Lucas", "Marina"]
}
```

## Testes

O arquivo `api-professores.postman_collection.json` pode ser importado no Postman ou no Thunder Client com todas as requisições prontas.
Os prints dos testes estão na pasta `prints/`.
