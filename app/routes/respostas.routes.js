module.exports = app => {
    const respostas = require("../controllers/respostas.controller.js");
  
    // Create a new Respostas
    app.post("/respostas", respostas.create);
  
    // Retrieve all Respostas
    app.get("/respostas", respostas.findAll);
  
    // Retrieve a single Respostas with respostasId
    app.get("/respostas/:respostasId", respostas.findOne);

    app.get("/respostas/avaliacao/:iddisc/:idpessoa/:idavaliacao/:vezes", respostas.findOneAval);
  
    // Update a Respostas with respostasId
    app.put("/respostas/:iddisc/:idpessoa/:idavaliacao/:vezes/:questoes_id", respostas.update);
  
    // Delete a Respostas with respostasId
    app.delete("/respostas/:iddisc/:idpessoa/:idavaliacao/:vezes/:questoes_id", respostas.delete);
  
    // Create a new Respostas
    app.delete("/respostas", respostas.deleteAll);
  };
  //https://github.com/bezkoder/nodejs-express-mysql/blob/master/README.md
  