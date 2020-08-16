module.exports = app => {
    const avaliacao = require("../controllers/avaliacao.controller.js");
  
    // Create a new avaliacao
    app.post("/avaliacao", avaliacao.create);
  
    // Retrieve all avaliacao
    app.get("/avaliacao", avaliacao.findAll);
  
    // Retrieve a single avaliacao with avaliacaoId
    app.get("/avaliacao/:avaliacaoId", avaliacao.findOne);

        // Retrieve a single avaliacao with avaliacaoId
        app.get("/avaliacao/disciplina_professor/:idpessoa", avaliacao.findOneAvalPessoa);

    // Retrieve a single avaliacao with avaliacaoId
    app.get("/avaliacao/disciplina/:idpessoa/:iddisc", avaliacao.findOneAval);

        // avaliacoes de uma disciplina
        app.get("/avaliacao/disc/:iddisc", avaliacao.findOneAvalDisc);
  
    // Update a avaliacao with avaliacaoId
    app.put("/avaliacao/:avaliacaoId/:iddisciplina/:idpessoa", avaliacao.update);
  
    // Delete a avaliacao with avaliacaoId
    app.delete("/avaliacao/:avaliacaoId/:iddisciplinas/:idpessoa", avaliacao.delete);
  
    // Create a new avaliacao
    app.delete("/avaliacao", avaliacao.deleteAll);
  };
  //https://github.com/bezkoder/nodejs-express-mysql/blob/master/README.md
  