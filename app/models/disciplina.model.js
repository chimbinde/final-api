const sql = require("./db.js");

// constructor
const Disciplina = function(disciplina) {
  this.nomedisc = disciplina.nomedisc;
  this.iddisciplinas= disciplina.iddisciplinas;
  this.idcategoriadisc = disciplina.idcategoriadisc;
};

Disciplina.create = (newDisciplina, result) => {
  sql.query("INSERT INTO disciplinas SET ?", newDisciplina, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created disciplina: ", { id: res.insertId, ...newDisciplina });
    result(null, { id: res.insertId, ...newDisciplina });
  });
};

Disciplina.findByIdArea = (areaId, result) => {
  sql.query(`SELECT * FROM disciplinas WHERE idcategoriadisc = ${areaId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("disciplinas: ", res);
    result(null, res);
  });
};


Disciplina.findById = (disciplinaId, result) => {
  sql.query(`SELECT * FROM disciplinas WHERE iddisciplinas = ${disciplinaId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found disciplina: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Disciplina.getAll = result => {
  sql.query("SELECT * FROM disciplinas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("disciplinas: ", res);
    result(null, res);
  });
};

Disciplina.updateById = (id, disciplina, result) => {
  sql.query(
    "UPDATE disciplinas SET nomedisc = ?, idcategoriadisc = ? WHERE iddisciplinas = ?",
    [disciplina.nomedisc,disciplina.idcategoriadisc,  id],
    (err, res) => {
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

      console.log("updated disciplinas: ", { id: id, ...disciplina });
      result(null, { id: id, ...disciplina });
    }
  );
};

Disciplina.remove = (id, result) => {
  sql.query("DELETE FROM disciplinas WHERE iddisciplinas = ?", id, (err, res) => {
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

    console.log("deleted disciplinas with iddisciplinas: ", id);
    result(null, res);
  });
};

Disciplina.removeAll = result => {
  sql.query("DELETE FROM disciplinas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} disciplinas`);
    result(null, res);
  });
};

module.exports = Disciplina;
