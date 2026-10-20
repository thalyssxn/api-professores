// ===============================================================
// ARQUIVO PRINCIPAL - é ele que liga o servidor
// ===============================================================

// 1) Importa o Express (biblioteca que cria o servidor e as rotas)
const express = require("express");

// 2) Importa o arquivo de rotas dos professores
const professoresRoutes = require("./routes/professoresRoutes");

// 3) Cria a aplicação
const app = express();
const PORTA = 3000;

// 4) Permite que a API entenda JSON enviado no corpo da requisição.
//    Sem essa linha, o req.body chega vazio (undefined) no PUT e no POST.
app.use(express.json());

// 5) Diz que toda URL que começar com /professores
//    vai ser tratada pelo arquivo professoresRoutes
app.use("/professores", professoresRoutes);

// 6) Liga o servidor na porta 3000
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
