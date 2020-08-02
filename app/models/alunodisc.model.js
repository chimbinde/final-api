const sql = require("./db.js");

// constructor
const Alunodisc = function (alunodisc) {
  this.iddisciplinas = alunodisc.iddisciplinas;
  this.idpessoa = alunodisc.idpessoa;
  this.anocadastro = alunodisc.anocadastro;
};

Alunodisc.create = (newAlunodisc, result) => {
  sql.query("INSERT INTO aluno_disc SET ?", newAlunodisc, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created aluno_disc: ", { id: res.insertId, ...newAlunodisc });
    result(null, { id: res.insertId, ...newAlunodisc });
  });
};

Alunodisc.findById = (alunoId, result) => {
  sql.query(`SELECT * FROM aluno_disc ad, disciplinas d, categoriadisc c WHERE c.idcategoriadisc=d.idcategoriadisc and d.iddisciplinas = ad.iddisciplinas AND idpessoa = ${alunoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    /*
        if (res.length) {
        console.log("found alunoId ", res[0]);
        result(null, res[0]);
        return;
        }
    */
    // not found Alunodisc with the id
    // result({ kind: "not_found" }, null);
    console.log("Alunodisc: ", res);
    result(null, res);
  });
};

Alunodisc.getAll = result => {
  sql.query("SELECT * FROM aluno_disc ad, disciplina d where d.iddisciplina = ad.iddisciplina ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Alunodisc: ", res);
    result(null, res);
  });
};

Alunodisc.updateById = (id, alunodisc, result) => {
  sql.query(
    "UPDATE aluno_disc SET email = ?, name = ?, active = ? WHERE id = ?",
    [alunodisc.email, alunodisc.name, alunodisc.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Alunodisc with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Alunodisc: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};
//req.params.alunoId,req.params.discId,req.params.ano 
Alunodisc.remove = (id, discId, ano, result) => {
  sql.query("DELETE FROM aluno_disc WHERE idpessoa =? and iddisciplinas = ? and anocadastro=? ", [id, discId, ano], (err, res) => {
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

    console.log("deleted Alunodisc with id: ", id);
    result(null, res);
  });
};

Alunodisc.removeAll = result => {
  sql.query("DELETE FROM aluno_disc", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} alunodisc`);
    result(null, res);
  });
};

module.exports = Alunodisc;
