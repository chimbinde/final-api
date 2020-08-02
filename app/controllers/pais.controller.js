const Pais = require("../models/pais.model.js");

// Create and Save a new Pais
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Pais
  const pais = new Pais({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Pais in the database
  Pais.create(pais, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pais."
      });
    else res.send(data);
  });
};

// Retrieve all Pais from the database.
exports.findAll = (req, res) => {
  Pais.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pais."
      });
    else res.send(data);
  });
};

// Find a single Pais with a paisId
exports.findOne = (req, res) => {
  Pais.findById(req.params.paisId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pais with id ${req.params.paisId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Pais with id " + req.params.paisId
        });
      }
    } else res.send(data);
  });
};

// Update a Pais identified by the paisId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Pais.updateById(
    req.params.paisId,
    new Pais(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pais with id ${req.params.paisId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Pais with id " + req.params.paisId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Pais with the specified paisId in the request
exports.delete = (req, res) => {
  Pais.remove(req.params.paisId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pais with id ${req.params.paisId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Pais with id " + req.params.paisId
        });
      }
    } else res.send({ message: `Pais was deleted successfully!` });
  });
};

// Delete all Pais from the database.
exports.deleteAll = (req, res) => {
  Pais.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all pais."
      });
    else res.send({ message: `All Pais were deleted successfully!` });
  });
};
