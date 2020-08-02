const Respostas = require("../models/respostas.model.js");

// Create and Save a new Respostas
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Respostas
  const respostas = new Respostas({
    alternativa: req.body.alternativa,
    questoes_id: req.body.questoes_id,
    vezes: req.body.vezes,
    idpessoa: req.body.idpessoa,
    iddisciplinas: req.body.iddisciplinas,
    avaliacao_id: req.body.avaliacao_id
  });

  // Save Respostas in the database
  Respostas.create(respostas, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Respostas."
      });
    else res.send(data);
  });
};

// Retrieve all Respostas from the database.
exports.findAll = (req, res) => {
  Respostas.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving respostas."
      });
    else res.send(data);
  });
};

// Find a single Respostas with a respostasId
exports.findOne = (req, res) => {
  Respostas.findById(req.params.respostasId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Respostas with id ${req.params.respostasId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Respostas with id " + req.params.respostasId
        });
      }
    } else res.send(data);
  });
};

exports.findOneAval = (req, res) => {
  Respostas.findByIdAval(req.params.iddisc,req.params.idpessoa,req.params.idavaliacao, req.params.vezes, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Respostas with id ${req.params.iddisc}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Respostas with id " + req.params.iddisc
        });
      }
    } else res.send(data);
  });
};

// Update a Respostas identified by the respostasId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Respostas.updateById(
    req.params.iddisc, req.params.questoes_id,  req.params.idpessoa, req.params.idavaliacao, req.params.vezes, 
    new Respostas(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Respostas with id ${req.params.iddisc}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Respostas with id " + req.params.iddisc
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Respostas with the specified respostasId in the request
exports.delete = (req, res) => {
  Respostas.remove( 
    req.params.iddisc, req.params.questoes_id,  req.params.idpessoa, req.params.idavaliacao, req.params.vezes,
    (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Respostas with id ${req.params.iddisc}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Respostas with id " + req.params.iddisc
        });
      }
    } else res.send({ message: `Respostas was deleted successfully!` });
  });
};

// Delete all Respostas from the database.
exports.deleteAll = (req, res) => {
  Respostas.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all respostas."
      });
    else res.send({ message: `All Respostas were deleted successfully!` });
  });
};
