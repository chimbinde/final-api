const Profdisc = require("../models/profdisc.model.js");

// Create and Save a new Profdisc
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const profdisc = new Profdisc({
    idpessoa: req.body.idpessoa,
    iddisciplinas: req.body.iddisciplinas,
    anocadastro: req.body.anocadastro
  });

  // Save Profdisc in the database
  Profdisc.create(profdisc, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Profdisc from the database.
exports.findAll = (req, res) => {
    Profdisc.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single Profdisc with a ProfdiscId
exports.findOne = (req, res) => {
    Profdisc.findById(req.params.profId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Profdisc with id ${req.params.profId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Profdisc with id " + req.params.profId
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

  Profdisc.updateById(
    req.params.profdiscId,
    new Profdisc(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Profdisc with id ${req.params.profdiscId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Profdisc with id " + req.params.profdiscId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified ProfdiscId in the request
exports.delete = (req, res) => {
    Profdisc.remove(req.params.profId,req.params.discId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Profdisc with id ${req.params.profId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Profdisc with id " + req.params.profId
        });
      }
    } else res.send({ message: `Profdisc was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Profdisc.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Profdisc."
      });
    else res.send({ message: `All Profdisc were deleted successfully!` });
  });
};
