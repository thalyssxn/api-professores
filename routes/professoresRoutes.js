// ===============================================================
// ROTAS - definem QUAL URL + QUAL MÉTODO HTTP chama QUAL função.
// A rota não tem lógica nenhuma: ela só "encaminha" a requisição
// para a função certa do controller.
// ===============================================================

const express = require("express");
const router = express.Router();

// Importa as funções do controller
const controller = require("../controllers/professoresController");

// Como no index.js usamos app.use("/professores", ...),
// aqui "/" significa "/professores".

// GET /professores -> lista todos
router.get("/", controller.listarProfessores);

// GET /professores/departamento/Tecnologia -> lista por departamento
// (fica ANTES das rotas com :id para não haver confusão de caminho)
router.get("/departamento/:departamento", controller.listarPorDepartamento);

// GET /professores/1 -> busca um professor pelo id
router.get("/:id", controller.buscarPorId);

// GET /professores/1/turmas -> lista as turmas do professor 1
router.get("/:id/turmas", controller.listarTurmas);

// PUT /professores/1 -> atualiza os dados do professor 1
router.put("/:id", controller.atualizarProfessor);

// POST /professores/1/turmas -> adiciona uma turma ao professor 1
router.post("/:id/turmas", controller.adicionarTurma);

// DELETE /professores/1 -> remove o professor 1
router.delete("/:id", controller.removerProfessor);

// Exporta as rotas para o index.js usar
module.exports = router;
