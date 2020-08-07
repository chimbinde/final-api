const sql = require("./db.js");

// constructor
const Alunoavaliacao = function(alunoavaliacao) {
  this.iddisciplinas = alunoavaliacao.iddisciplinas;
  this.idpessoa = alunoavaliacao.idpessoa;
  this.avaliacao_id = alunoavaliacao.avaliacao_id;
  this.nota = alunoavaliacao.nota;
  this.vezes = alunoavaliacao.vezes;

};

Alunoavaliacao.create = (newAlunoavaliacao, result) => {
  sql.query("INSERT INTO aluno_avaliacao SET ?", newAlunoavaliacao, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created alunoavaliacao: ", { id: res.insertId, ...newAlunoavaliacao });
    result(null, { id: res.insertId, ...newAlunoavaliacao });
  });
};

Alunoavaliacao.findById = (alunoavaliacaoId, result) => {
  sql.query(`SELECT * FROM aluno_avaliacao WHERE idpessoa = ${alunoavaliacaoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found alunoavaliacao: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Alunoavaliacao with the id
    result({ kind: "not_found" }, null);
  });
};
Alunoavaliacao.findById_pessoa = (alunoavaliacaoId, result) => {
  sql.query(`SELECT * FROM aluno_avaliacao WHERE idpessoa = ${alunoavaliacaoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("alunoavaliacao: ", res);
    result(null, res);
  });
};

Alunoavaliacao.findByIdAval = (idpessoa,iddisc, result) => {
    sql.query(`SELECT * FROM aluno_avaliacao WHERE idpessoa = ${idpessoa} and iddisciplinas = ${iddisc}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("alunoavaliacao: ", res);
      result(null, res);
    });
  };


Alunoavaliacao.getAll = result => {
  sql.query("SELECT * FROM aluno_avaliacao", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("alunoavaliacao: ", res);
    result(null, res);
  });
};
//req.params.iddisc,req.params.idpessoa,req.params.avaliacao_id,req.params.vezes,
Alunoavaliacao.updateById = (iddisc, idpessoa, avaliacao_id,vezes,nota,alunoavaliacao,result) => {
  sql.query(
    "UPDATE aluno_avaliacao SET nota = ? WHERE iddisciplinas = ? and idpessoa=? and avaliacao_id=? and vezes=?",
    [alunoavaliacao.nota, iddisc, idpessoa, avaliacao_id,vezes],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Alunoavaliacao with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated aluno_avaliacao: ", { id: iddisc, ...alunoavaliacao });
      result(null, { id: iddisc, ...alunoavaliacao });
    }
  );
};

Alunoavaliacao.removeAval = (idpessoa, result) => {
  sql.query(`UPDATE aluno_avaliacao SET fechada = 1  WHERE  idpessoa = ${idpessoa} ; `,  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} alunoavaliacao`);
    result(null, res);
  });
};


Alunoavaliacao.remove = (iddisc, idpessoa, avaliacao_id,vezes, result) => {
  sql.query("DELETE FROM aluno_avaliacao WHERE iddisciplinas = ? and idpessoa=? and avaliacao_id=? and vezes=? ", [iddisc, idpessoa, avaliacao_id,vezes], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Alunoavaliacao with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted aluno_avaliacao with id: ", idpessoa);
    result(null, res);
  });
};

Alunoavaliacao.removeAll = result => {
  sql.query("DELETE FROM aluno_avaliacao", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} alunoavaliacao`);
    result(null, res);
  });
};

module.exports = Alunoavaliacao;
