//const Customer = require("../models/disciplina.model.js");
const Disciplina = require("../models/disciplina.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const disciplina = new Disciplina({
    iddisciplina: req.body.iddisciplina,
    nomedisc: req.body.nomedisc,
    idcategoriadisc: req.body.idcategoriadisc
  });

  // Save Customer in the database
 Disciplina.create(disciplina, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Disciplina.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving disciplinas."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
 Disciplina.findById(req.params.disciplinaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found disciplina with id ${req.params.disciplinaId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving disciplina with id " + req.params.disciplinaId
        });
      }
    } else res.send(data);
  });
};


// Find a single Customer with a customerId
exports.findOneArea = (req, res) => {
  Disciplina.findByIdArea(req.params.areaId, (err, data) => {
     if (err) {
       if (err.kind === "not_found") {
         res.status(404).send({
           message: `Not found disciplina with id area ${req.params.areaId}.`
         });
       } else {
         res.status(500).send({
           message: "Error retrieving disciplina with id area" + req.params.areaId
         });
       }
     } else res.send(data);
   });
 };
 



// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Disciplina.updateById(
    req.params.disciplinaId,
    new Disciplina(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.disciplinaId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.disciplinaId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Disciplina.remove(req.params.disciplinaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Disciplina with id ${req.params.disciplinaId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Disciplina with id " + req.params.disciplinaId
        });
      }
    } else res.send({ message: `Disciplina was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Disciplina.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all disciplina."
      });
    else res.send({ message: `All Disciplina were deleted successfully!` });
  });
};
