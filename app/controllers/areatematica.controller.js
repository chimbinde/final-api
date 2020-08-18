const Areatematica = require("../models/areatematica.model.js");

// Create and Save a new Areatematica
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Areatematica
  const areatematica = new Areatematica({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Areatematica in the database
  Areatematica.create(areatematica, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Areatematica."
      });
    else res.send(data);
  });
};

// Retrieve all Areatematicas from the database.
exports.findAll = (req, res) => {
  Areatematica.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving areatematica."
      });
    else res.send(data);
  });
};

// Find a single Areatematica with a areatematicaId
exports.findOne = (req, res) => {
  Areatematica.findById(req.params.iddisciplinas, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Areatematica with id ${req.params.iddisciplinas}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Areatematica with id " + req.params.iddisciplinas
        });
      }
    } else res.send(data);
  });
};

// Update a Areatematica identified by the areatematicaId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Areatematica.updateById(
    req.params.areatematicaId,
    new Areatematica(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Areatematica with id ${req.params.areatematicaId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Areatematica with id " + req.params.areatematicaId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Areatematica with the specified areatematicaId in the request
exports.delete = (req, res) => {
  Areatematica.remove(req.params.areatematicaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Areatematica with id ${req.params.areatematicaId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Areatematica with id " + req.params.areatematicaId
        });
      }
    } else res.send({ message: `Areatematica was deleted successfully!` });
  });
};

// Delete all Areatematicas from the database.
exports.deleteAll = (req, res) => {
  Areatematica.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all areatematica."
      });
    else res.send({ message: `All Areatematicas were deleted successfully!` });
  });
};
