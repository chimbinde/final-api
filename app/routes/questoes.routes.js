module.exports = app => {
    const questoes = require("../controllers/questoes.controller.js");
  
    // Create a new questoes
    app.post("/questoes", questoes.create);
  
    // Retrieve all questoes
    app.get("/questoes", questoes.findAll);
  
    // Retrieve a single questoes with questoesId
    app.get("/questoes/:questoesId", questoes.findOne);

    //app.get("/questoes/pesquisa/:questoesId", questoes.findOnePesquisa);

    // Retrieve a single questoes with questoesId
    app.get("/questoes/avaliacao/:questoesId/:idpessoa/:iddisciplinas", questoes.findOneAval);
  
    // Update a questoes with questoesId
    app.put("/questoes/:questoesId/:idpessoa/:iddisciplina/:avaliacao_id", questoes.update);
  
    // Delete a questoes with questoesId
    app.delete("/questoes/:questoesId", questoes.delete);
  
    // Create a new questoes
    app.delete("/questoes", questoes.deleteAll);
  };
  //https://github.com/bezkoder/nodejs-express-mysql/blob/master/README.md
  