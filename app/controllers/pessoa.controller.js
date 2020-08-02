const Pessoa = require("../models/pessoa.model.js");

// Create and Save a new pessoa
exports.create = (req, res) => {

//console.log(req.body);  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a pessoa
  const pessoa = new Pessoa({
    nome : req.body.nome,
    ativo : req.body.ativo,
    apelido : req.body.apelido,
    homem : req.body.homem,
    email : req.body.email,
    password : req.body.password,
    isestudante : req.body.isestudante,
    datanasc : req.body.datanasc,
    datacriada : req.body.datacriada,
    dataeditado : req.body.dataeditado,
    idcriador : req.body.idcriador,
    idpais: req.body.idpais,
    idescola : req.body.idescola,
    email : req.body.email,
    idprovincia: req.body.idprovincia

  });

  // Save pessoa in the database
  Pessoa.create(pessoa, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pessoa."
      });
    else res.send(data);
  });
};

// Retrieve all pessoas from the database.
exports.findAll = (req, res) => {
  Pessoa.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pessoas."
      });
    else res.send(data);
  });
};



// Find a single pessoa with a pessoaId
exports.findOne = (req, res) => {
  Pessoa.findById(req.params.pessoaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found pessoa with id ${req.params.pessoaId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving pessoa with id " + req.params.pessoaId
        });
      }
    } else res.send(data);
  });
};
// Find a single Customer with a customerId
exports.findOneTipo = (req, res) => {
  Pessoa.findByIdTipo(req.params.tipoId, (err, data) => {
     if (err) {
       if (err.kind === "not_found") {
         res.status(404).send({
           message: `Not found pessoa with id tipo ${req.params.tipoId}.`
         });
       } else {
         res.status(500).send({
           message: "Error retrieving pessoa with id tipo" + req.params.tipoId
         });
       }
     } else res.send(data);
   });
 };
// Update a pessoa identified by the pessoaId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Pessoa.updateById(
    req.params.pessoaId,
    new Pessoa(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found pessoa with id ${req.params.pessoaId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating pessoa with id " + req.params.pessoaId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a pessoa with the specified pessoaId in the request
exports.delete = (req, res) => {
  Pessoa.remove(req.params.pessoaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found pessoa with id ${req.params.pessoaId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete pessoa with id " + req.params.pessoaId
        });
      }
    } else res.send({ message: `pessoa was deleted successfully!` });
  });
};

// Delete all pessoas from the database.
exports.deleteAll = (req, res) => {
  Pessoa.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all pessoas."
      });
    else res.send({ message: `All pessoas were deleted successfully!` });
  });
};
