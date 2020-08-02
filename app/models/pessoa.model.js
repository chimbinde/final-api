const sql = require("./db.js");

// constructor
const Pessoa = function(pessoa) {
  this.nome = pessoa.nome;
  this.ativo = pessoa.ativo;
  this.apelido = pessoa.apelido;
  this.homem = pessoa.homem;
  this.email = pessoa.email;
  this.password = pessoa.password;
  this.isestudante = pessoa.isestudante;
  this.datanasc = pessoa.datanasc;
  this.datacriada = pessoa.datacriada;
  this.dataeditado = pessoa.dataeditado;
  this.idcriador = pessoa.idcriador;
  this.idpais= pessoa.idpais;
  this.idescola = pessoa.idescola;
  this.email = pessoa.email;
  this.idprovincia= pessoa.idprovincia;
};

Pessoa.create = (newPessoa, result) => {
  sql.query("INSERT INTO pessoa SET ?", newPessoa, (err, res) => {
    
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created pessoa: ", { id: res.insertId, ...newPessoa });
    result(null, { id: res.insertId, ...newPessoa });
  });
};

Pessoa.findById = (pessoaId, result) => {
  sql.query(`SELECT * FROM pessoa p, pais pa, escola es where pa.idpais=p.idpais and es.idescola=p.idescola and idpessoa  = ${pessoaId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pessoa: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found pessoa with the id
    result({ kind: "not_found" }, null);
  });
};

Pessoa.getAll = result => {
  sql.query("SELECT * FROM pessoa p, pais pa, escola es where pa.idpais=p.idpais and es.idescola=p.idescola", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pessoa: ", res);
    result(null, res);
  });
};

Pessoa.updateById = (id, pessoa, result) => {


  sql.query(
    "UPDATE pessoa SET email = ?, nome = ?, idescola=?, idpais=?, dataeditado = now(), datanasc=?,isestudante=?,apelido=?, homem=? WHERE idpessoa = ?",
    [pessoa.email, pessoa.nome,pessoa.idescola,pessoa.idpais,pessoa.datanasc,pessoa.isestudante,pessoa.apelido,pessoa.homem, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found pessoa with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated pessoa: ", { id: id, ...pessoa });
      result(null, { id: id, ...pessoa });
    }
  );
};

Pessoa.findByIdTipo = (tipoId, result) => {
  sql.query(`SELECT * FROM pessoa p, pais pa, escola es where pa.idpais=p.idpais and es.idescola=p.idescola and isestudante  = ${tipoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("disciplinas: ", res);
    result(null, res);
  });
};

Pessoa.remove = (id, result) => {
  sql.query("DELETE FROM pessoa WHERE idpessoa= ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found pessoa with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pessoa with id: ", id);
    result(null, res);
  });
};

Pessoa.removeAll = result => {
  sql.query("DELETE FROM pessoa", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} pessoa`);
    result(null, res);
  });
};

module.exports = Pessoa;
