module.exports = app => {
    const respostas = require("../controllers/respostas.controller.js");
  
    // Create a new Respostas
    app.post("/respostas", respostas.create);
  
    // Retrieve all Respostas
    app.get("/respostas", respostas.findAll);
  
    // Retrieve a single Respostas with respostasId
    app.get("/respostas/:respostasId", respostas.findOne);


    //    url = urlBase + 'respostas/avaliacao/' + exame.avaliacao_id + '/' + exame.avaliacao_idpessoa + '/' + exame.avaliacao_iddisciplinas + '/'+exame.vezes + '/'+idestudante;
    app.get("/respostas/avaliacao/:avaliacao_id/:idpessoa/:iddisciplinas/:vezes/:idestudante", respostas.findOneAval);

    app.get("/respostas/findquestao/:iddisciplinas/:idpessoa/:avaliacao_id/:vezes/:questoes_id", respostas.findOneQuestao);
  
    // Update a Respostas with respostasId
    app.put("/respostas/:iddisc/:idpessoa/:idavaliacao/:vezes/:questoes_id", respostas.update);
  
    // Delete a Respostas with respostasId
    // iddisciplinas + '/' + iddocente + '/' + questoes_id + '/' + vezes + '/' + idpessoa;
    app.delete("/respostas/:iddisciplinas/:iddocente/:idavaliacao/:questoes_id/:vezes/:idpessoa", respostas.delete);
  
    // Create a new Respostas
    app.delete("/respostas", respostas.deleteAll);
  };
  //https://github.com/bezkoder/nodejs-express-mysql/blob/master/README.md
  