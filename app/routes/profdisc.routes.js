module.exports = app => {
    const profdisc = require("../controllers/profdisc.controller.js");
  
    // Create a new profdisc
    app.post("/profdisc", profdisc.create);
  
    // Retrieve all profdisc
    app.get("/profdisc", profdisc.findAll);
  
    // Retrieve adisciplinas de um professor
    app.get("/profdisc/professor/:profId", profdisc.findOne);
  
    // Update a profdisc with profdiscId
    app.put("/profdisc/:profdiscId", profdisc.update);
  
    // Delete a profdisc with profdiscId
    app.delete("/profdisc/:profId/:discId", profdisc.delete);
  
    // Create a new profdisc
    app.delete("/profdisc", profdisc.deleteAll);
  };
  //https://github.com/bezkoder/nodejs-express-mysql/blob/master/README.md
  