module.exports = app => {
    const areatematica = require("../controllers/areatematica.controller.js");
  
    // Create a new Areatematica
    app.post("/areatematica", areatematica.create);
  
    // Retrieve all Areatematicas
    app.get("/areatematica", areatematica.findAll);
  
    // Retrieve a single Areatematica with areatematicaId
    app.get("/areatematica/:iddisciplinas", areatematica.findOne);
  
    // Update a Areatematica with areatematicaId
    app.put("/areatematica/:areatematicaId", areatematica.update);
  
    // Delete a Areatematica with areatematicaId
    app.delete("/areatematica/:areatematicaId", areatematica.delete);
  
    // Create a new Areatematica
    app.delete("/areatematica", areatematica.deleteAll);
  };
  //https://github.com/bezkoder/nodejs-express-mysql/blob/master/README.md
  