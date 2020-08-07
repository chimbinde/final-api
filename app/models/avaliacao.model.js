const sql = require("./db.js");

// constructor
const Avaliacao = function(avaliacao) {
  this.idpessoa = avaliacao.idpessoa;
  this.iddisciplinas = avaliacao.iddisciplinas;
  this.id = avaliacao.id;
  this.descricao = avaliacao.descricao;
};

Avaliacao.create = (newAvaliacao, result) => {
  sql.query("INSERT INTO avaliacao SET ?", newAvaliacao, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created avaliacao: ", { id: res.insertId, ...newAvaliacao });
    result(null, { id: res.insertId, ...newAvaliacao });
  });
};

Avaliacao.findById = (avaliacaoId, result) => {
  sql.query(`SELECT * FROM avaliacao WHERE id = ${avaliacaoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found avaliacao: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Avaliacao.findByIdAval = (idpessoa, iddisc, result) => {
    sql.query(`SELECT * FROM avaliacao WHERE idpessoa = ${idpessoa} and iddisciplinas=${iddisc}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
    console.log("Avaliacao ", res);
    result(null, res);
    });
  };

Avaliacao.getAll = result => {
  sql.query("SELECT * FROM avaliacao", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Avaliacao ", res);
    result(null, res);
  });
};

Avaliacao.updateById = (id, avaliacao, result) => {
  sql.query(
    "UPDATE avaliacao SET descricao = ? WHERE id = ?",
    [avaliacao.descricao, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Avaliacao with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Avaliacao: ", { id: id, ...avaliacao });
      result(null, { id: id, ...avaliacao });
    }
  );
};
Avaliacao.remove = (id, result) => {
  sql.query("DELETE FROM avaliacao WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Avaliacao with id: ", id);
    result(null, res);
  });
};

Avaliacao.removeAll = result => {
  sql.query("DELETE FROM avaliacao", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Avaliacao`);
    result(null, res);
  });
};

module.exports = Avaliacao;
