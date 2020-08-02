const Escolas = require("../models/escolas.model.js");

// Create and Save a new Escolas
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Escolas
  const escolas = new Escolas({
    idescola: req.body.idescola,
    nomeescola: req.body.nomeescola,
    idprovincia: req.body.idprovincia
  });

  // Save Escolas in the database
  Escolas.create(escolas, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Escolas."
      });
    else res.send(data);
  });
};

// Retrieve all Escolass from the database.
exports.findAll = (req, res) => {
  Escolas.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving escolas."
      });
    else res.send(data);
  });
};
// Find a single Escolas with a escolasId
exports.findOneProv = (req, res) => {
  Escolas.findByIdProv(req.params.escolasId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Escolas with id ${req.params.escolasId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Escolas with id " + req.params.escolasId
        });
      }
    } else res.send(data);
  });
};

// Find a single Escolas with a escolasId
exports.findOne = (req, res) => {
  Escolas.findById(req.params.escolasId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Escolas with id ${req.params.escolasId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Escolas with id " + req.params.escolasId
        });
      }
    } else res.send(data);
  });
};

// Update a Escolas identified by the escolasId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Escolas.updateById(
    req.params.escolasId,
    new Escolas(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Escolas with id ${req.params.escolasId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Escolas with id " + req.params.escolasId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Escolas with the specified escolasId in the request
exports.delete = (req, res) => {
  Escolas.remove(req.params.escolasId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Escolas with id ${req.params.escolasId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Escolas with id " + req.params.escolasId
        });
      }
    } else res.send({ message: `Escolas was deleted successfully!` });
  });
};

// Delete all Escolass from the database.
exports.deleteAll = (req, res) => {
  Escolas.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all escolas."
      });
    else res.send({ message: `All Escolass were deleted successfully!` });
  });
};
