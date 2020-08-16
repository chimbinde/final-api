const Alunoavaliacao = require("../models/alunoavaliacao.model.js");

// Create and Save a new Alunoavaliacao
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Alunoavaliacao
  const alunoavaliacao = new Alunoavaliacao({
    iddisciplinas: req.body.iddisciplinas,
    idpessoa: req.body.idpessoa,
    nota: req.body.nota,
    avaliacao_id: req.body.avaliacao_id,
    avaliacao_idpessoa:req.body.avaliacao_idpessoa,
    avaliacao_iddisciplinas:req.body.avaliacao_iddisciplinas,
    vezes: req.body.vezes
  });
  // Save Alunoavaliacao in the database
  Alunoavaliacao.create(alunoavaliacao, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Alunoavaliacao."
      });
    else res.send(data);
  });
};

// Retrieve all Alunoavaliacao from the database.
exports.findAll = (req, res) => {
  Alunoavaliacao.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving alunoavaliacao."
      });
    else res.send(data);
  });
};
//"/alunoavaliacao/tempo/:ava_iddisciplinas/:ava_iddocente/:ava_id/:vezes/:idpessoa"
exports.findOneAvalTempo = (req, res) => {
  Alunoavaliacao.findByIdAvalTempo(req.params.ava_iddisciplinas,req.params.ava_iddocente,req.params.ava_id,req.params.vezes,req.params.idpessoa, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Alunoavaliacao with id ${req.params.idpessoa}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Alunoavaliacao with id " + req.params.idpessoa
        });
      }
    } else res.send(data);
  });
};
// Find a single Alunoavaliacao with a alunoavaliacaoId
exports.findOneAval = (req, res) => {
    Alunoavaliacao.findByIdAval(req.params.idpessoa,req.params.iddisc, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Alunoavaliacao with id ${req.params.idpessoa}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Alunoavaliacao with id " + req.params.idpessoa
          });
        }
      } else res.send(data);
    });
  };
// Find a single Alunoavaliacao with a alunoavaliacaoId
exports.findOnePessoa = (req, res) => {
  Alunoavaliacao.findById_pessoa(req.params.alunoavaliacaoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Alunoavaliacao with id ${req.params.alunoavaliacaoId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Alunoavaliacao with id " + req.params.alunoavaliacaoId
        });
      }
    } else res.send(data);
  });
};


// Find a single Alunoavaliacao with a alunoavaliacaoId
exports.findOne = (req, res) => {
  Alunoavaliacao.findById(req.params.alunoavaliacaoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Alunoavaliacao with id ${req.params.alunoavaliacaoId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Alunoavaliacao with id " + req.params.alunoavaliacaoId
        });
      }
    } else res.send(data);
  });
};

// Update a Alunoavaliacao identified by the alunoavaliacaoId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
//:iddisc/:idpessoa/:avaliacao_id/:vezes
  Alunoavaliacao.updateById(
    req.params.iddisc,req.params.idpessoa,req.params.avaliacao_id,req.params.vezes,req.params.nota,
    new Alunoavaliacao(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Alunoavaliacao with id ${req.params.alunoavaliacaoId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Alunoavaliacao with id " + req.params.alunoavaliacaoId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Alunoavaliacao with the specified alunoavaliacaoId in the request
exports.delete = (req, res) => {
  Alunoavaliacao.remove(req.params.iddisc,req.params.idpessoa,req.params.avaliacao_id,req.params.vezes, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Alunoavaliacao with id ${req.params.alunoavaliacaoId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Alunoavaliacao with id " + req.params.alunoavaliacaoId
        });
      }
    } else res.send({ message: `Alunoavaliacao was deleted successfully!` });
  });
};

// fechar avaliacoes de um aluno
exports.deleteAval = (req, res) => {
  Alunoavaliacao.removeAval(req.params.idpessoa, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Alunoavaliacao with id ${req.params.alunoavaliacaoId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Alunoavaliacao with id " + req.params.alunoavaliacaoId
        });
      }
    } else res.send({ message: `Alunoavaliacao was deleted successfully!` });
  });
};

// Delete all Alunoavaliacao from the database.
exports.deleteAll = (req, res) => {
  Alunoavaliacao.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all alunoavaliacao."
      });
    else res.send({ message: `All Alunoavaliacao were deleted successfully!` });
  });
};
