module.exports = app => {
    const pessoa = require("../controllers/pessoa.controller.js");
  
    // Create a new pessoa
    app.post("/pessoa", pessoa.create);

    app.get("/pessoa/tipo/:tipoId", pessoa.findOneTipo);
  
    // Retrieve all pessoa
    app.get("/pessoa", pessoa.findAll);
  
    // Retrieve a single pessoa with pessoaId
    app.get("/pessoa/:pessoaId", pessoa.findOne);
  
    // Update a pessoa with pessoaId
    app.put("/pessoa/:pessoaId", pessoa.update);
  
    // Delete a pessoa with pessoaId
    app.delete("/pessoa/:pessoaId", pessoa.delete);
  
    // Create a new pessoa
    app.delete("/pessoa", pessoa.deleteAll);
  };
  //https://github.com/bezkoder/nodejs-express-mysql/blob/master/README.md
  