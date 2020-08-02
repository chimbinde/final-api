const Provincia = require("../models/provincia.model.js");

// Create and Save a new Provincia
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Provincia
  const provincia = new Provincia({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Provincia in the database
  Provincia.create(provincia, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Provincia."
      });
    else res.send(data);
  });
};

// Retrieve all Provincia from the database.
exports.findAll = (req, res) => {
  Provincia.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving provincia."
      });
    else res.send(data);
  });
};

exports.findPorPais = (req, res) => {
    Provincia.findByIdPais(req.params.provinciaId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Provincia with id ${req.params.provinciaId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Provincia with id " + req.params.provinciaId
          });
        }
      } else res.send(data);
    });
  };
// Find a single Provincia with a provinciaId
exports.findOne = (req, res) => {
  Provincia.findById(req.params.provinciaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Provincia with id ${req.params.provinciaId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Provincia with id " + req.params.provinciaId
        });
      }
    } else res.send(data);
  });
};

// Update a Provincia identified by the provinciaId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Provincia.updateById(
    req.params.provinciaId,
    new Provincia(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Provincia with id ${req.params.provinciaId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Provincia with id " + req.params.provinciaId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Provincia with the specified provinciaId in the request
exports.delete = (req, res) => {
  Provincia.remove(req.params.provinciaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Provincia with id ${req.params.provinciaId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Provincia with id " + req.params.provinciaId
        });
      }
    } else res.send({ message: `Provincia was deleted successfully!` });
  });
};

// Delete all Provincia from the database.
exports.deleteAll = (req, res) => {
  Provincia.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all provincia."
      });
    else res.send({ message: `All Provincia were deleted successfully!` });
  });
};
