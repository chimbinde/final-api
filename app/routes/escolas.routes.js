module.exports = app => {
    const escolas = require("../controllers/escolas.controller.js");
  
    // Create a new Escolas
    app.post("/escolas", escolas.create);
  
    // Retrieve all Escolass
    app.get("/escolas", escolas.findAll);
  
    // Retrieve a single Escolas with escolasId
    app.get("/escolas/:escolasId", escolas.findOne);
    app.get("/escolas/provincia/:escolasId", escolas.findOneProv);
  
    // Update a Escolas with escolasId
    app.put("/escolas/:escolasId", escolas.update);
  
    // Delete a Escolas with escolasId
    app.delete("/escolas/:escolasId", escolas.delete);
  
    // Create a new Escolas
    app.delete("/escolas", escolas.deleteAll);
  };
  //https://github.com/bezkoder/nodejs-express-mysql/blob/master/README.md
  