module.exports = app => {
    const avaliacao = require("../controllers/avaliacao.controller.js");
  
    // Create a new avaliacao
    app.post("/avaliacao", avaliacao.create);
  
    // Retrieve all avaliacao
    app.get("/avaliacao", avaliacao.findAll);
  
    // Retrieve a single avaliacao with avaliacaoId
    app.get("/avaliacao/:avaliacaoId", avaliacao.findOne);

    // Retrieve a single avaliacao with avaliacaoId
    app.get("/avaliacao/disciplina/:idpessoa/:iddisc", avaliacao.findOneAval);
  
    // Update a avaliacao with avaliacaoId
    app.put("/avaliacao/:avaliacaoId", avaliacao.update);
  
    // Delete a avaliacao with avaliacaoId
    app.delete("/avaliacao/:avaliacaoId", avaliacao.delete);
  
    // Create a new avaliacao
    app.delete("/avaliacao", avaliacao.deleteAll);
  };
  //https://github.com/bezkoder/nodejs-express-mysql/blob/master/README.md
  