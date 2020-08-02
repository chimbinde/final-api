module.exports = app => {
    const alunodisc = require("../controllers/alunodisc.controller.js");
  
    // Create a new alunodiscf
    app.post("/alunodisc", alunodisc.create);
  
    // Retrieve all alunodisc
    app.get("/alunodisc", alunodisc.findAll);
  
    // Retrieve a single alunodisc with alunodiscId
    app.get("/alunodisc/disciplinas/:alunoId", alunodisc.findOne);
  
    // Update a alunodisc with alunodiscId
    app.put("/alunodisc/:alunodiscId", alunodisc.update);
  
    // Delete a alunodisc with alunodiscId
    app.delete("/alunodisc/:alunoId/:discId/:ano", alunodisc.delete);
  
    // Create a new alunodisc
    app.delete("/alunodisc", alunodisc.deleteAll);
  };
  //https://github.com/bezkoder/nodejs-express-mysql/blob/master/README.md
  