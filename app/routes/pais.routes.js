module.exports = app => {
    const pais = require("../controllers/pais.controller.js");
  
    // Create a new Pais
    app.post("/pais", pais.create);
  
    // Retrieve all Pais
    app.get("/pais", pais.findAll);
  
    // Retrieve a single Pais with paisId
    app.get("/pais/:paisId", pais.findOne);
  
    // Update a Pais with paisId
    app.put("/pais/:paisId", pais.update);
  
    // Delete a Pais with paisId
    app.delete("/pais/:paisId", pais.delete);
  
    // Create a new Pais
    app.delete("/pais", pais.deleteAll);
  };
  //https://github.com/bezkoder/nodejs-express-mysql/blob/master/README.md
  