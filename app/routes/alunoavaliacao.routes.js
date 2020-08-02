module.exports = app => {
    const alunoavaliacao = require("../controllers/alunoavaliacao.controller.js");
  
    // Create a new Alunoavaliacao
    app.post("/alunoavaliacao", alunoavaliacao.create);
  
    // Retrieve all Alunoavaliacao
    app.get("/alunoavaliacao", alunoavaliacao.findAll);

      // Retrieve a single Alunoavaliacao with alunoavaliacaoId
      app.get("/alunoavaliacao/aluno/:idpessoa/:iddisc", alunoavaliacao.findOneAval);
  
    // Retrieve a single Alunoavaliacao with alunoavaliacaoId
    app.get("/alunoavaliacao/:alunoavaliacaoId", alunoavaliacao.findOne);
  
    // Update a Alunoavaliacao with alunoavaliacaoId
    app.put("/alunoavaliacao/:iddisc/:idpessoa/:avaliacao_id/:vezes", alunoavaliacao.update);
  
    // Delete a Alunoavaliacao with alunoavaliacaoId
    app.delete("/alunoavaliacao/:iddisc/:idpessoa/:avaliacao_id/:vezes", alunoavaliacao.delete);
  
    // Create a new Alunoavaliacao
    app.delete("/alunoavaliacao", alunoavaliacao.deleteAll);
  };
  //https://github.com/bezkoder/nodejs-express-mysql/blob/master/README.md
  