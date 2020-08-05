module.exports = app => {
    const categoriadisc = require("../controllers/categoriadisc.controller.js");
  
    // Create a new Categoriadisc
    app.post("/categoriadisc", categoriadisc.create);
  
    // Retrieve all Categoriadisc
    app.get("/categoriadisc", categoriadisc.findAll);
  
    // Retrieve a single Categoriadisc with categoriadiscId
    app.get("/categoriadisc/:categoriadiscId", categoriadisc.findOne);
  
    // Update a Categoriadisc with categoriadiscId
    app.put("/categoriadisc/:categoriadiscId", categoriadisc.update);
  
    // Delete a Categoriadisc with categoriadiscId
    app.delete("/categoriadisc/:categoriadiscId", categoriadisc.delete);
  
    // Create a new Categoriadisc
    app.delete("/categoriadisc", categoriadisc.deleteAll);
  };
  //https://github.com/bezkoder/nodejs-express-mysql/blob/master/README.md
  