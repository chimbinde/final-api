const Alunodisc = require("../models/alunodisc.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Alunodisc
  const alunodisc = new Alunodisc({
    iddisciplinas: req.body.iddisciplinas,
    idpessoa: req.body.idpessoa,
    anocadastro: req.body.anocadastro
  });

  // Save Alunodisc in the database
  Alunodisc.create(alunodisc, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Alunodisc from the database.
exports.findAll = (req, res) => {
    Alunodisc.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Alunodiscs."
      });
    else res.send(data);
  });
};

// Find a single Alunodisc with a customerId
exports.findOne = (req, res) => {
    Alunodisc.findById(req.params.alunoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Alunodisc with id ${req.params.alunoId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Alunodisc with id " + req.params.alunoId
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the AlunodiscId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Alunodisc.updateById(
    req.params.alunodiscId,
    new Alunodisc(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Alunodisc with id ${req.params.alunodiscId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Alunodisc with id " + req.params.alunodiscId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Alunodisc with the specified AlunodiscId in the request
exports.delete = (req, res) => {
    Alunodisc.remove(req.params.alunoId,req.params.discId,req.params.ano , (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.alunodiscId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.alunodiscId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Alunodisc.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Alunodisc."
      });
    else res.send({ message: `All Alunodisc were deleted successfully!` });
  });
};
