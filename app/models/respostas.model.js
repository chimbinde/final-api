const sql = require("./db.js");

// constructor
const Respostas = function(respostas) {

  this.alternativa=respostas.alternativa;
  this.questoes_id=respostas.questoes_id;
  this.vezes=respostas.vezes;
  this.idpessoa=respostas.idpessoa;
  this.iddisciplinas=respostas.iddisciplinas;
  this.avaliacao_id=respostas.avaliacao_id;

};

Respostas.create = (newRespostas, result) => {
  sql.query("INSERT INTO respostas SET ?", newRespostas, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created respostas: ", { id: res.insertId, ...newRespostas });
    result(null, { id: res.insertId, ...newRespostas });
  });
};

Respostas.findByIdAval = (iddisc,idpessoa,idavaliacao, vezes, result) => {
    sql.query(`SELECT * FROM respostas WHERE vezes = ${vezes} and iddisciplinas = ${iddisc} and idpessoa = ${idpessoa} and avaliacao_id = ${idavaliacao}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found respostas: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Respostas with the id
      result({ kind: "not_found" }, null);
    });
  };

Respostas.findById = (respostasId, result) => {
  sql.query(`SELECT * FROM respostas WHERE id = ${respostasId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found respostas: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Respostas with the id
    result({ kind: "not_found" }, null);
  });
};

Respostas.getAll = result => {
  sql.query("SELECT * FROM respostas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("respostas: ", res);
    result(null, res);
  });
};

Respostas.updateById = (iddisc,questoes_id, idpessoa, idavaliacao,vezes
    , respostas, result) => {
  sql.query(
    "UPDATE respostas SET alternativa = ? WHERE iddisciplinas = ? and questoes_id =? and idpessoa=? and avaliacao_id=? and vezes =? ",
    [respostas.alternativa,iddisc,questoes_id, idpessoa, idavaliacao,vezes],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Respostas with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated respostas: ", { id: iddisc, ...respostas });
      result(null, { id: iddisc, ...respostas });
    }
  );
};

Respostas.remove = (iddisc,questoes_id, idpessoa, idavaliacao,vezes, result) => {
  sql.query("DELETE FROM respostas WHERE iddisciplinas = ? and questoes_id =? and idpessoa=? and avaliacao_id=? and vezes =?", [iddisc,questoes_id, idpessoa, idavaliacao,vezes], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Respostas with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted respostas with id: ", iddisc);
    result(null, res);
  });
};

Respostas.removeAll = result => {
  sql.query("DELETE FROM respostas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} respostas`);
    result(null, res);
  });
};

module.exports = Respostas;
