module.exports = app => {
    const provincia = require("../controllers/provincia.controller.js");
  
    // Create a new Provincia
    app.post("/provincia", provincia.create);
  
    // Retrieve all Provincia
    app.get("/provincia", provincia.findAll);
  
    // Retrieve a single Provincia with provinciaId
    app.get("/provincia/:provinciaId", provincia.findOne);
    //findPorPais 
    app.get("/provincia/pais/:provinciaId", provincia.findPorPais );
    // Update a Provincia with provinciaId
    app.put("/provincia/:provinciaId", provincia.update);
  
    // Delete a Provincia with provinciaId
    app.delete("/provincia/:provinciaId", provincia.delete);
  
    // Create a new Provincia
    app.delete("/provincia", provincia.deleteAll);
  };
  //https://github.com/bezkoder/nodejs-express-mysql/blob/master/README.md
  