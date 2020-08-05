const Categoriadisc = require("../models/categoriadisc.model.js");

// Create and Save a new Categoriadisc
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Categoriadisc
  const categoriadisc = new Categoriadisc({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Categoriadisc in the database
  Categoriadisc.create(categoriadisc, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Categoriadisc."
      });
    else res.send(data);
  });
};

// Retrieve all Categoriadisc from the database.
exports.findAll = (req, res) => {
  Categoriadisc.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categoriadisc."
      });
    else res.send(data);
  });
};

// Find a single Categoriadisc with a categoriadiscId
exports.findOne = (req, res) => {
  Categoriadisc.findById(req.params.categoriadiscId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Categoriadisc with id ${req.params.categoriadiscId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Categoriadisc with id " + req.params.categoriadiscId
        });
      }
    } else res.send(data);
  });
};

// Update a Categoriadisc identified by the categoriadiscId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Categoriadisc.updateById(
    req.params.categoriadiscId,
    new Categoriadisc(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Categoriadisc with id ${req.params.categoriadiscId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Categoriadisc with id " + req.params.categoriadiscId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Categoriadisc with the specified categoriadiscId in the request
exports.delete = (req, res) => {
  Categoriadisc.remove(req.params.categoriadiscId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Categoriadisc with id ${req.params.categoriadiscId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Categoriadisc with id " + req.params.categoriadiscId
        });
      }
    } else res.send({ message: `Categoriadisc was deleted successfully!` });
  });
};

// Delete all Categoriadisc from the database.
exports.deleteAll = (req, res) => {
  Categoriadisc.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categoriadisc."
      });
    else res.send({ message: `All Categoriadisc were deleted successfully!` });
  });
};
