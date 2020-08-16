const Avaliacao = require("../models/avaliacao.model.js");

// Create and Save a new Avaliacao
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Avaliacao
  const avaliacao = new Avaliacao({
    idpessoa: req.body.idpessoa,
    iddisciplinas: req.body.iddisciplinas,
    id: req.body.id,
    descricao: req.body.descricao
  });

  // Save Customer in the database
  Avaliacao.create(avaliacao, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Avaliacao."
      });
    else res.send(data);
  });
};

// Retrieve all Avaliacao from the database.
exports.findAll = (req, res) => {
    Avaliacao.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Avaliacao."
      });
    else res.send(data);
  });
};

// Find a single Avaliacao with a customerId
exports.findOne = (req, res) => {
    Avaliacao.findById(req.params.avaliacaoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Avaliacao with id ${req.params.avaliacaoId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Avaliacao with id " + req.params.avaliacaoId
        });
      }
    } else res.send(data);
  });
};
//bglsdkfngldnfhlvfg
exports.findOneAvalPessoa = (req, res) => {
  Avaliacao.findByIdAvalPessoa(req.params.idpessoa, (err, data) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Avaliacao with id ${req.params.idpessoa}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Avaliacao with id " + req.params.idpessoa
      });
    }
  } else res.send(data);
});
};
//bglsdkfngldnfhlvfg
exports.findOneAval = (req, res) => {
    Avaliacao.findByIdAval(req.params.idpessoa,req.params.iddisc, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Avaliacao with id ${req.params.idpessoa}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Avaliacao with id " + req.params.idpessoa
        });
      }
    } else res.send(data);
  });
};
exports.findOneAvalDisc = (req, res) => {
  Avaliacao.findByIdAvalDisc(req.params.iddisc, (err, data) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found Avaliacao with id ${req.params.iddisc}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving Avaliacao with id " + req.params.iddisc
      });
    }
  } else res.send(data);
});
};


// Update a Avaliacao identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Avaliacao.updateById(req.params.avaliacaoId,req.params.idpessoa,req.params.iddisciplina,
    new Avaliacao(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Avaliacao with id ${req.params.avaliacaoId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Avaliacao with id " + req.params.avaliacaoId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Avaliacao.remove(req.params.avaliacaoId,req.params.iddisciplinas,req.params.idpessoa, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Avaliacao with id ${req.params.avaliacaoId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Avaliacao with id " + req.params.avaliacaoId
        });
      }
    } else res.send({ message: `Avaliacao was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Avaliacao.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Avaliacao."
      });
    else res.send({ message: `All Avaliacao were deleted successfully!` });
  });
};
