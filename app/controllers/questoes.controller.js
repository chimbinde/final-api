const Questoes = require("../models/questoes.model.js");

// Create and Save a new Questoes
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Questoes
  const questoes = new Questoes({
    avaliacao_id: req.body.avaliacao_id,
    id: req.body.id,
    pergunta: req.body.pergunta,
    resposta: req.body.resposta,
    cotacao: req.body.cotacao,
    idordem: req.body.idordem,
    alternativa1: req.body.alternativa1,
    alternativa2: req.body.alternativa2,
    alternativa3: req.body.alternativa3,
    idareatematica: req.body.idareatematica
  });

  // Save Questoes in the database
  Questoes.create(questoes, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Questoes."
      });
    else res.send(data);
  });
};

// Retrieve all Questoess from the database.
exports.findAll = (req, res) => {
  Questoes.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving questoess."
      });
    else res.send(data);
  });
};

// Find a single Questoes with a questoesId
exports.findOneAval = (req, res) => {
  Questoes.findByIdAval(req.params.questoesId,req.params.idpessoa,req.params.iddisciplinas, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Questoes with id ${req.params.questoesId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Questoes with id " + req.params.questoesId
        });
      }
    } else res.send(data);
  });
};

// Find a single Questoes with a questoesId
exports.findOne = (req, res) => {
  Questoes.findById(req.params.questoesId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Questoes with id ${req.params.questoesId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Questoes with id " + req.params.questoesId
        });
      }
    } else res.send(data);
  });
};

// Update a Questoes identified by the questoesId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Questoes.updateById(
    req.params.questoesId,
    new Questoes(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Questoes with id ${req.params.questoesId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Questoes with id " + req.params.questoesId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Questoes with the specified questoesId in the request
exports.delete = (req, res) => {
  Questoes.remove(req.params.questoesId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Questoes with id ${req.params.questoesId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Questoes with id " + req.params.questoesId
        });
      }
    } else res.send({ message: `Questoes was deleted successfully!` });
  });
};

// Delete all Questoess from the database.
exports.deleteAll = (req, res) => {
  Questoes.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all questoess."
      });
    else res.send({ message: `All Questoess were deleted successfully!` });
  });
};
