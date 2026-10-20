// ===============================================================
// CONTROLLER - aqui fica a LÓGICA de cada rota.
// Toda função recebe:
//   req (requisição) -> o que o cliente mandou (params, body...)
//   res (resposta)   -> o que a API devolve (res.json)
//
// req.params -> valores que vêm NA URL       ex: /professores/2  -> req.params.id = "2"
// req.body   -> dados que vêm NO CORPO (JSON) ex: { "nome": "Ana" }
// res.json() -> devolve a resposta em formato JSON
// res.status(404) -> define o código HTTP da resposta
// ===============================================================

// Importa o array de professores (os dados em memória)
const professores = require("../data/professores");

// ---------------------------------------------------------------
// GET /professores
// Lista todos os professores
// ---------------------------------------------------------------
function listarProfessores(req, res) {
  // Só devolve o array inteiro em JSON
  res.json(professores);
}

// ---------------------------------------------------------------
// GET /professores/:id
// Busca UM professor pelo id
// ---------------------------------------------------------------
function buscarPorId(req, res) {
  // O id da URL chega como TEXTO ("2"). Number() transforma em número (2),
  // porque no array o id está guardado como número.
  const id = Number(req.params.id);

  // find() percorre o array e devolve o PRIMEIRO professor com esse id.
  // Se não achar ninguém, devolve undefined.
  const professor = professores.find((professor) => professor.id === id);

  // Se não encontrou, responde 404 com a mensagem
  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  res.json(professor);
}

// ---------------------------------------------------------------
// GET /professores/:id/turmas
// Lista só as turmas de um professor
// ---------------------------------------------------------------
function listarTurmas(req, res) {
  const id = Number(req.params.id);
  const professor = professores.find((professor) => professor.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  // Devolve apenas a lista de turmas daquele professor
  res.json(professor.turmas);
}

// ---------------------------------------------------------------
// PUT /professores/:id
// Atualiza nome, idade e/ou departamento de um professor
// Corpo de exemplo: { "nome": "Novo Nome", "idade": 30, "departamento": "Exatas" }
// ---------------------------------------------------------------
function atualizarProfessor(req, res) {
  const id = Number(req.params.id);
  const professor = professores.find((professor) => professor.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  // Pega os dados enviados no corpo da requisição.
  // O "|| {}" evita erro caso a requisição chegue sem corpo.
  const { nome, idade, departamento } = req.body || {};

  // Só altera o campo que foi enviado.
  // Como "professor" aponta para o MESMO objeto que está dentro do array,
  // mudar aqui já muda no array (a alteração fica salva na memória).
  if (nome !== undefined) professor.nome = nome;
  if (idade !== undefined) professor.idade = idade;
  if (departamento !== undefined) professor.departamento = departamento;

  res.json({ mensagem: "Professor atualizado com sucesso", professor });
}

// ---------------------------------------------------------------
// POST /professores/:id/turmas
// Adiciona uma turma nova a um professor
// Corpo de exemplo: { "codigo": "WEB-301", "disciplina": "APIs", "alunos": ["Ana", "Leo"] }
// ---------------------------------------------------------------
function adicionarTurma(req, res) {
  const id = Number(req.params.id);
  const professor = professores.find((professor) => professor.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  // O "|| {}" evita erro caso a requisição chegue sem corpo
  const { codigo, disciplina, alunos } = req.body || {};

  // Código e disciplina são obrigatórios
  if (!codigo || !disciplina) {
    return res.status(400).json({ mensagem: "Informe o codigo e a disciplina da turma" });
  }

  // Monta o objeto da nova turma
  // (se não mandarem alunos, começa com uma lista vazia)
  const novaTurma = {
    codigo: codigo,
    disciplina: disciplina,
    alunos: alunos || []
  };

  // push() adiciona a turma no FINAL do array de turmas do professor
  professor.turmas.push(novaTurma);

  // 201 = "Created" (algo novo foi criado)
  res.status(201).json({ mensagem: "Turma adicionada com sucesso", professor });
}

// ---------------------------------------------------------------
// GET /professores/departamento/:departamento
// Lista todos os professores de um departamento
// ---------------------------------------------------------------
function listarPorDepartamento(req, res) {
  const departamento = req.params.departamento;

  // filter() devolve um NOVO array só com quem passa no teste.
  // toLowerCase() deixa tudo minúsculo para "tecnologia" e "Tecnologia" darem certo.
  const resultado = professores.filter(
    (professor) => professor.departamento.toLowerCase() === departamento.toLowerCase()
  );

  res.json(resultado);
}

// ---------------------------------------------------------------
// DELETE /professores/:id
// Remove um professor
// ---------------------------------------------------------------
function removerProfessor(req, res) {
  const id = Number(req.params.id);

  // findIndex() devolve a POSIÇÃO do professor no array (0, 1, 2...).
  // Se não achar, devolve -1.
  const posicao = professores.findIndex((professor) => professor.id === id);

  if (posicao === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  // splice(posicao, 1) remove 1 item a partir daquela posição.
  // Ele devolve um array com o que foi removido, por isso o [0].
  const removido = professores.splice(posicao, 1)[0];

  res.json({ mensagem: "Professor removido com sucesso", professor: removido });
}

// Exporta todas as funções para o arquivo de rotas usar
module.exports = {
  listarProfessores,
  buscarPorId,
  listarTurmas,
  atualizarProfessor,
  adicionarTurma,
  listarPorDepartamento,
  removerProfessor
};
