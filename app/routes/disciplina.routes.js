module.exports = app => {
    const disciplinas = require("../controllers/disciplina.controller.js");
  
    // Create a new Customer
    app.post("/disciplinas", disciplinas.create);
  
    // Retrieve all disciplinas
    app.get("/disciplinas", disciplinas.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/disciplinas/:disciplinaId", disciplinas.findOne);

    // Retrieve a single discinas de uma area
    app.get("/disciplinas/area/:areaId", disciplinas.findOneArea);
  
    // Update a Customer with customerId
    app.put("/disciplinas/:disciplinaId", disciplinas.update);
  
    // Delete a Customer with customerId
    app.delete("/disciplinas/:disciplinaId", disciplinas.delete);
  
    // Create a new Customer
    app.delete("/disciplinas", disciplinas.deleteAll);
  };
  //https://github.com/bezkoder/nodejs-express-mysql/blob/master/README.md
  